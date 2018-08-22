from django import shortcuts, views
import datetime
from projects import models as project_models
from projects import managers as project_managers

human_readable_semesters = {
    'FA': 'Fall',
    'SP': 'Spring',
    'SU': 'Summer',
    'WI': 'Winter'
}


class ProjectApplicationCreate(views.generic.edit.CreateView):
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


class ProjectApplicationUpdate(views.generic.edit.UpdateView):
    model = project_models.ProjectApplication
    fields = ('first_choice', 'second_choice',
              'third_choice', 'created_project')
    template_name = 'applications/update_form.html'

    def get_context_data(self, **kwargs):
        context = super(ProjectApplicationUpdate,
                        self).get_context_data(**kwargs)
        short_semester = project_managers.calculate_semester()
        semester = human_readable_semesters[short_semester]
        context['semester'] = semester
        context['year'] = datetime.date.today().year
        return context


class ProjectCreate(views.generic.edit.CreateView):
    model = project_models.Project
    fields = ('name', 'description', 'project_lead', 'ideal_capacity')
    template_name = 'projects/create_form.html'


class ProjectDetail(views.generic.DetailView):
    model = project_models.Project
    fields = ('name', 'description', 'project_lead', 'ideal_capacity')
    template_name = 'projects/detail.html'