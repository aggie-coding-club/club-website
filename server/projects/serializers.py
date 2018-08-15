from rest_framework import serializers
from projects import models as projects_models


class ProjectSerializer(serializers.ModelSerializer):

    class Meta:
        model = projects_models.Project
        fields = ('name', 'description', 'project_lead',
                  'approved', 'members', 'ideal_capacity')


class ProjectApplicationSerializer(serializers.ModelSerializer):

    class Meta:
        model = projects_models.ProjectApplication
        fields = ('user', 'semester', 'year', 'first_choice',
                  'second_choice', 'third_choice', 'created_project', 'created_project')
