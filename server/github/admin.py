from django.contrib import admin
from github import models as github_models

# Register your models here.


@admin.register(github_models.GithubUser)
class GithubUserAdmin(admin.ModelAdmin):
    readonly_fields = ['user', 'avatar_url', 'bio', 'company',
                       'email', 'name', 'url', 'login', 'teams', 'repositories']


@admin.register(github_models.Repository)
class RepositoryAdmin(admin.ModelAdmin):
    readonly_fields = ['description', 'homepage_url',
                       'is_private', 'name', 'primary_language', 'url']


@admin.register(github_models.Team)
class TeamAdmin(admin.ModelAdmin):
    readonly_fields = ['avatar_url', 'combined_slug',
                       'description', 'name', 'parent_team', 'url']
