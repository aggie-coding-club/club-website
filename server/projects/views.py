import datetime

from django import forms, shortcuts
from django import urls as django_urls
from django import views
from django.contrib.auth import mixins as auth_mixins
from django.contrib.auth import models as auth_models
from django.http import response

from projects import managers as project_managers
from projects import models as project_models

human_readable_semesters = {
    'FA': 'Fall',
    'SP': 'Spring',
    'SU': 'Summer',
    'WI': 'Winter'
}


def is_owner(self):
    obj = self.get_object()
    return self.request.user == obj.user


def current_application_exists(user: auth_models.User):
    """Checks to see if a user has current application.

    Args:
        user: An instance of auth_models.User.
    Returns:
        A boolean indicating whether "user" has a current application.
    """
    semester, year = project_managers.calculate_current_term()
    return project_models.ProjectApplication.objects.filter(user=user, semester=semester, year=year).exists()

def get_current_application(user: auth_models.User):
    """Retrieves a user's current ProjectApplication.

    Args:
        user: An instance of auth_models.User.
    Returns:
        The user's current application.
    """
    if not current_application_exists(user):
        return None
    semester, year = project_managers.calculate_current_term()
    return project_models.ProjectApplication.objects.get(user=user, semester=semester, year=year)

class ProjectApplicationCreate(auth_mixins.LoginRequiredMixin, views.generic.edit.CreateView):
    model = project_models.ProjectApplication
    fields = ('first_choice', 'second_choice',
              'third_choice', 'created_project')
    template_name = 'applications/create_form.html'
    success_url = '/accounts/profile'

    def get_context_data(self, **kwargs):
        context = super(ProjectApplicationCreate,
                        self).get_context_data(**kwargs)
        short_semester = project_managers.calculate_semester()
        semester = human_readable_semesters[short_semester]
        context['semester'] = semester
        context['year'] = datetime.date.today().year
        return context

    def form_valid(self, form):
        form.instance.user = self.request.user
        if current_application_exists(self.request.user):
            form.add_error(None, forms.ValidationError(
                "You've already created an application for this semester. Update that instead."))
            return super(ProjectApplicationCreate, self).form_invalid(form)
        return super().form_valid(form)


class ProjectApplicationUpdate(auth_mixins.UserPassesTestMixin, auth_mixins.LoginRequiredMixin, views.generic.edit.UpdateView):
    model = project_models.ProjectApplication
    fields = ('first_choice', 'second_choice',
              'third_choice', 'created_project')
    template_name = 'applications/update_form.html'
    success_url = '/accounts/profile'
    test_func = is_owner

    def get_context_data(self, **kwargs):
        context = super(ProjectApplicationUpdate,
                        self).get_context_data(**kwargs)
        short_semester = project_managers.calculate_semester()
        semester = human_readable_semesters[short_semester]
        context['semester'] = semester
        context['year'] = datetime.date.today().year
        return context


class ProjectApplicationRedirect(auth_mixins.LoginRequiredMixin, views.generic.RedirectView):
    def get_redirect_url(self, *args, **kwargs):
        user = self.request.user
        if current_application_exists(user):
            current = get_current_application(user)
            return django_urls.reverse('projects:app-update', args=[current.pk])
        return django_urls.reverse('projects:app-create')


class ProjectCreate(auth_mixins.LoginRequiredMixin, views.generic.edit.CreateView):
    model = project_models.Project
    fields = ('name', 'description', 'project_lead', 'ideal_capacity')
    template_name = 'projects/create_form.html'


class ProjectDetail(auth_mixins.LoginRequiredMixin, views.generic.DetailView):
    model = project_models.Project
    fields = ('name', 'description', 'project_lead', 'ideal_capacity')
    template_name = 'projects/detail.html'
