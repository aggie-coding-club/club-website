from django.contrib import admin
from projects import models as projects_models

# Register your models here.


@admin.register(projects_models.Project)
class ProjectsAdmin(admin.ModelAdmin):
    pass


@admin.register(projects_models.ProjectApplication)
class ProjectApplicationsAdmin(admin.ModelAdmin):
    pass
