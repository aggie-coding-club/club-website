import datetime

from django import shortcuts, views
from django.contrib.auth import mixins as auth_mixins

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


class ProjectApplicationCreate(auth_mixins.LoginRequiredMixin, views.generic.edit.CreateView):
    model = project_models.ProjectApplication
    fields = ('first_choice', 'second_choice',
              'third_choice', 'created_project')
    template_name = 'applications/create_form.html'

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
        return super().form_valid(form)


class ProjectApplicationUpdate(auth_mixins.UserPassesTestMixin, auth_mixins.LoginRequiredMixin, views.generic.edit.UpdateView):
    model = project_models.ProjectApplication
    fields = ('first_choice', 'second_choice',
              'third_choice', 'created_project')
    template_name = 'applications/update_form.html'
    test_func = is_owner

    def get_context_data(self, **kwargs):
        context = super(ProjectApplicationUpdate,
                        self).get_context_data(**kwargs)
        short_semester = project_managers.calculate_semester()
        semester = human_readable_semesters[short_semester]
        context['semester'] = semester
        context['year'] = datetime.date.today().year
        return context


class ProjectCreate(auth_mixins.LoginRequiredMixin, views.generic.edit.CreateView):
    model = project_models.Project
    fields = ('name', 'description', 'project_lead', 'ideal_capacity')
    template_name = 'projects/create_form.html'


class ProjectDetail(auth_mixins.LoginRequiredMixin, views.generic.DetailView):
    model = project_models.Project
    fields = ('name', 'description', 'project_lead', 'ideal_capacity')
    template_name = 'projects/detail.html'
