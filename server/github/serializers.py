from github import models as github_models
from rest_framework import serializers

class MemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = github_models.Member
        fields = ('avatar_url', 'company', 'login', 'url', 'name',)

class RepositorySerializer(serializers.ModelSerializer):
    contributors = MemberSerializer(many=True, read_only=True)
    class Meta:
        model = github_models.Repository
        fields = ('description', 'primary_language', 'name', 'homepage_url', 'contributors')

class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = github_models.Team
        fields = ('avatar_url', 'combined_slug', 'description', 'name', 'members')
