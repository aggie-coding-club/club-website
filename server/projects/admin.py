from django.contrib import admin
from projects import models as projects_models

# Register your models here.


class ProjectsAdmin(admin.ModelAdmin):
    pass


admin.site.register(projects_models.Project, ProjectsAdmin)
