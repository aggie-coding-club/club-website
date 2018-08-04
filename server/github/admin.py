from django.contrib import admin
from github import models as github_models

# Register your models here.


@admin.register(github_models.GithubUser)
class GithubUserAdmin(admin.ModelAdmin):
    pass


@admin.register(github_models.Repository)
class RepositoryAdmin(admin.ModelAdmin):
    pass


@admin.register(github_models.Team)
class TeamAdmin(admin.ModelAdmin):
    pass
