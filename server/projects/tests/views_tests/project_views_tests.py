import json
import urllib.parse

from django import urls as django_urls
from django.contrib.auth import models as auth_models
from django.core import exceptions as django_exceptions
from django.test import testcases

from projects import models as projects_models
from projects.tests import shared_testcase


class ProjectViewsTests(shared_testcase.ProjectsTestCase):

    def test_create_project(self):
        self.client.login(username='staff', password='password')
        url = django_urls.reverse('projects:project-create')
        expected = {
            'name': 'Dummy Name',
            'description': 'No description',
            'project_lead': self.member1.pk,
            'ideal_capacity': 0.1
        }
        data = urllib.parse.urlencode(expected)
        self.client.post(
            url, data=data, content_type='application/x-www-form-urlencoded')
        new_project = projects_models.Project.objects.get(name='Dummy Name')

        actual = {
            'name': new_project.name,
            'description': new_project.description,
            'project_lead': new_project.project_lead.pk,
            'ideal_capacity': new_project.ideal_capacity
        }

        self.assertDictEqual(expected, actual)

    def test_create_project_fails_when_not_logged_in(self):
        url = django_urls.reverse('projects:project-create')
        expected = {
            'name': 'Dummy Name',
            'description': 'No description',
            'project_lead': self.member1.pk,
            'ideal_capacity': 0.1
        }
        data = urllib.parse.urlencode(expected)
        self.client.post(
            url, data=data, content_type='application/x-www-form-urlencoded')

        with self.assertRaises(django_exceptions.ObjectDoesNotExist):
            new_project = projects_models.Project.objects.get(
                name='Dummy Name')

    def test_project_detail(self):
        self.client.login(username='staff', password='password')
        url = django_urls.reverse(
            'projects:project-detail', args=[self.approved_project1.pk])
        response = self.client.get(url)
        self.assertEqual(response.context['object'], self.approved_project1)
        self.assertEqual(response.context['project'], self.approved_project1)

    def test_project_detail_when_not_logged_in(self):
        url = django_urls.reverse(
            'projects:project-detail', args=[self.approved_project1.pk])
        response = self.client.get(url)
        self.assertRedirects(response, '/accounts/login/?next=/projects/%s/' %
                             self.approved_project1.pk, fetch_redirect_response=False)


class ProjectApplicationViewsTests(shared_testcase.ProjectsTestCase):

    def test_create_project_application(self):
        self.client.login(username='staff', password='password')
        url = django_urls.reverse('projects:app-create')
        expected = {
            'first_choice': self.approved_project1.pk,
            'second_choice': self.approved_project2.pk,
            'third_choice': self.approved_project3.pk
        }

        data = urllib.parse.urlencode(expected)

        self.client.post(
            url, data=data, content_type='application/x-www-form-urlencoded')

        new_app = projects_models.ProjectApplication.objects.get(
            user=self.staff_member)

        actual = {
            'first_choice': new_app.first_choice.pk,
            'second_choice': new_app.second_choice.pk,
            'third_choice': new_app.third_choice.pk
        }

        self.assertDictEqual(expected, actual)

    def test_update_project_application(self):
        self.client.login(username='staff', password='password')
        app = self.create_application(self.staff_member, [
            self.approved_project1, self.approved_project2, self.approved_project3])
        url = django_urls.reverse('projects:app-update', args=[app.pk])

        updates = {
            'first_choice': self.approved_project2.pk,
            'second_choice': self.approved_project1.pk,
            'third_choice': self.approved_project3.pk
        }

        data = urllib.parse.urlencode(updates)

        self.client.post(
            url, data=data, content_type='application/x-www-form-urlencoded')

        new_app = projects_models.ProjectApplication.objects.get(pk=app.pk)
        actual = {
            'first_choice': new_app.first_choice.pk,
            'second_choice': new_app.second_choice.pk,
            'third_choice': new_app.third_choice.pk
        }

        self.assertEqual(updates, actual)

    def test_update_project_application_when_not_owner(self):
        self.client.login(username='staff', password='password')
        app = self.create_application(self.member1, [
                                      self.approved_project1, self.approved_project2, self.approved_project3])
        url = django_urls.reverse('projects:app-update', args=[app.pk])

        updates = {
            'first_choice': self.approved_project2.pk,
            'second_choice': self.approved_project1.pk,
            'third_choice': self.approved_project3.pk
        }

        data = urllib.parse.urlencode(updates)

        response = self.client.post(
            url, data=data, content_type='application/x-www-form-urlencoded')
        self.assertRedirects(response, '/accounts/login/?next=/projects/applications/%s/' %
                             app.pk, fetch_redirect_response=False)
