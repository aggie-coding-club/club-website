from django.shortcuts import render
from rest_framework import viewsets as rf_viewsets
from github import models as github_models
from github import serializers as github_serializers

class GithubUserViewSet(rf_viewsets.ReadOnlyModelViewSet):
    queryset = github_models.GithubUser.objects.all()
    serializer_class = github_serializers.GithubUserSerializer

class TeamViewSet(rf_viewsets.ReadOnlyModelViewSet):
    queryset = github_models.Team.objects.all()
    serializer_class = github_serializers.TeamSerializer

class RepositoryViewSet(rf_viewsets.ReadOnlyModelViewSet):
    queryset = github_models.Repository.objects.all()
    serializer_class = github_serializers.RepositorySerializer