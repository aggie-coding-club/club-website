from github import models as github_models
from rest_framework import viewsets
from github import serializers as github_serializers


class MemberViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint that allows members to be viewed.
    """
    queryset = github_models.Member.objects.all()
    serializer_class = github_serializers.MemberSerializer

class TeamViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint that allows teams to be viewed.
    """
    queryset = github_models.Team.objects.all()
    serializer_class = github_serializers.TeamSerializer

class RepositoryViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoing that allows repos to be viewed.
    """
    queryset = github_models.Repository.objects.all()
    serializer_class = github_serializers.RepositorySerializer