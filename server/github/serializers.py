from rest_framework import serializers as rf_serializers
from github import models as github_models


class GithubUserSerializer(rf_serializers.ModelSerializer):
    class Meta:
        model = github_models.GithubUser
        fields = ('avatar_url', 'bio', 'company', 'name', 'url', 'login',)


class RepositorySerializer(rf_serializers.ModelSerializer):
    contributors = GithubUserSerializer(many=True, read_only=True)

    class Meta:
        model = github_models.Repository
        fields = ('description', 'homepage_url', 'is_private',
                  'name', 'primary_language', 'url')


class TeamSerializer(rf_serializers.ModelSerializer):
    members = GithubUserSerializer(many=True, read_only=True)

    class Meta:
        model = github_models.Team
        fields = ('avatar_url', 'combined_slug',
                  'description', 'name', 'parent_team', 'url', 'members')