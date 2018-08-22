import json

from django import urls as django_urls
from django.contrib.auth import models as auth_models
from django.core import exceptions as django_exceptions
from django.test import testcases

from projects import models as projects_models
from projects import serializers as project_serializers
from projects.tests import shared_testcase
import urllib.parse
from rest_framework.authtoken.models import Token


class ProjectViewsTests(shared_testcase.ProjectsTestCase):
    pass


class ProjectApplicationViewsTests(shared_testcase.ProjectsTestCase):

    def setUp(self):
        self.application1 = self.create_application(self.member1, [
                                                    self.approved_project1, self.approved_project2, self.approved_project3])

    def test_retrieve_project_application(self):
        url = django_urls.reverse(
            'projects:app-detail', args=[self.application1.pk])
        response = self.client.get(url)
        self.assertEqual(response.data['application'], self.application1)

    def test_update_project_application(self):
        url = django_urls.reverse(
            'projects:app-detail', args=[self.application1.pk])
        data = urllib.parse.urlencode({
            'user': self.member1.pk,
            'first_choice': self.approved_project2.pk,
            'second_choice': self.approved_project1.pk,
            'third_choice': self.approved_project3.pk
        })
        response = self.client.post(
            url, data, content_type='application/x-www-form-urlencoded')
        new_app = response.data['application']
        self.assertEqual(new_app.first_choice, self.approved_project2)
        self.assertEqual(new_app.second_choice, self.approved_project1)

    def test_delete_project_application(self):
        kwargs = {
            'pk': self.application1.pk
        }
        url = django_urls.reverse(
            'projects:app-detail', args=[self.application1.pk])
        response = self.client.delete(url, data=kwargs)
        self.assertEqual(response.status_code, 301)
        with self.assertRaises(django_exceptions.ObjectDoesNotExist):
            new_app = projects_models.ProjectApplication.objects.get(
                pk=self.application1.pk)

    def test_create_project_application(self):
        url = django_urls.reverse('projects:app-create')
        data = urllib.parse.urlencode({
            'user': self.member2.pk,
            'first_choice': self.approved_project2.pk,
            'second_choice': self.approved_project1.pk,
            'third_choice': self.approved_project3.pk
        })

        response = self.client.post(
            url, data=data, content_type='application/x-www-form-urlencoded')
        new_app = projects_models.ProjectApplication.objects.get(user=self.member2)