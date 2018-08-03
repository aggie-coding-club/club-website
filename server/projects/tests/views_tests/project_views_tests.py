import json

from django import urls as django_urls
from django.contrib.auth import models as auth_models
from django.core import exceptions as django_exceptions
from django.test import testcases

from projects import models as projects_models
from projects.tests import shared_testcase
from rest_framework.authtoken.models import Token


class ProjectViewsTests(shared_testcase.ProjectsTestCase):
    """Tests Project views."""

    def setUp(self):
        super(ProjectViewsTests, self).setUp()

        self.create_project_url = django_urls.reverse('projects:projects-list')

    def test_create_project(self):
        mock_project = {
            'name': 'Test Project',
            'description': 'A project description',
            'idealCapacity': 0.05,
            'approved': False,
        }
        response = self.client.post(self.create_project_url, data=mock_project)

        expected = {
            'name': 'Test Project',
            'description': 'A project description',
            'ideal_capacity': 0.05,
            'approved': False,
            'project_lead': None,
            'members': []
        }

        actual = json.loads(response.content)

        self.assertDictEqual(expected, actual)

    def test_create_project_approved_is_false_when_created(self):
        mock_project = {
            'name': 'Test Project',
            'description': 'A project description',
            'idealCapacity': 0.05,
            'approved': True
        }
        response = self.client.post(self.create_project_url, data=mock_project)

        expected = {
            'name': 'Test Project',
            'description': 'A project description',
            'ideal_capacity': 0.05,
            'approved': True,
            'project_lead': None,
            'approved': False,
            'members': []
        }
        actual = json.loads(response.content)

        self.assertDictEqual(expected, actual)

    def test_delete_project(self):
        url = django_urls.reverse('projects:projects-detail', args=[
                                  self.approved_project1.pk])
        response = self.client.delete(url)
        with self.assertRaises(projects_models.Project.DoesNotExist):
            approved_project1 = projects_models.Project.objects.get(
                pk=self.approved_project1.pk)

    def test_update_project(self):
        url = django_urls.reverse('projects:projects-detail', args=[
                                  self.approved_project1.pk])
        data = {
            'name': 'New Project Name',
            'description': 'definitely not the same old description',
            'idealCapacity': 0.15,
            'members': [self.member1.pk, self.member2.pk, self.member3.pk],
            'projectLead': self.project_lead.pk
        }
        response = self.client.put(url, data=json.dumps(
            data), content_type='application/json')

        expected = {
            'name': 'New Project Name',
            'description': 'definitely not the same old description',
            'ideal_capacity': 0.15,
            'members': [self.member1.pk, self.member2.pk, self.member3.pk],
            'project_lead': self.project_lead.pk
        }

        updated_project = projects_models.Project.objects.get(
            pk=self.approved_project1.pk)
        members = updated_project.members.all()
        actual = {
            'name': updated_project.name,
            'description': updated_project.description,
            'ideal_capacity': updated_project.ideal_capacity,
            'members': [m.pk for m in members],
            'project_lead': updated_project.project_lead.pk
        }
        self.assertEqual(expected, actual)

    def test_modify_project_approval_doesnt_change_when_user_not_staff(self):
        url = django_urls.reverse(
            'projects:modify-approval', args=[self.unapproved_project1.pk])
        data = {
            'approval': True
        }

        response = self.client.patch(url, data=json.dumps(
            data), content_type='application/json')

        updated_project = projects_models.Project.objects.get(
            pk=self.unapproved_project1.pk)
        self.assertTrue(updated_project.approved == False)

    def test_modify_project_approval(self):
        token = Token.objects.get(user=self.staff_member)
        headers = {
            'HTTP_AUTHORIZATION': 'Token %s' % token
        }
        url = django_urls.reverse(
            'projects:modify-approval', args=[self.approved_project1.pk])

        data = {
            'approval': False
        }

        response = self.client.patch(
            url, data=json.dumps(data), content_type='application/json', **headers)

        updated_project = projects_models.Project.objects.get(
            pk=self.approved_project1.pk)
        self.assertTrue(updated_project.approved == False)


class ProjectApplicationViewsTests(shared_testcase.ProjectsTestCase):
    """Tests ProjectApplication views."""

    def setUp(self):
        super(ProjectApplicationViewsTests, self).setUp()
        self.authenticated_user = auth_models.User.objects.create_user(
            username='username', password='password')
        token = Token.objects.get(user=self.authenticated_user)
        self.headers = {
            'HTTP_AUTHORIZATION': 'Token %s' % token
        }

    def test_create_project_application(self):
        url = django_urls.reverse('projects:project-apps-list')
        data = {
            'semester': 'FA',
            'year': 2015,
            'firstChoice': self.approved_project1.pk,
            'secondChoice': self.approved_project2.pk,
            'thirdChoice': self.approved_project3.pk,
        }
        token = Token.objects.get(user=self.authenticated_user)
        response = self.client.post(url, data=json.dumps(
            data), content_type='application/json', **self.headers)
        actual = json.loads(response.content)

        expected = {
            'semester': 'FA',
            'year': 2015,
            'first_choice': self.approved_project1.pk,
            'second_choice': self.approved_project2.pk,
            'third_choice': self.approved_project3.pk,
            'created_project': None,
            'user': self.authenticated_user.pk
        }

        self.assertEqual(expected, actual)

    def test_create_project_application_fails_if_not_authenticated(self):
        url = django_urls.reverse('projects:project-apps-list')
        data = {
            'semester': 'FA',
            'year': 2015,
            'firstChoice': self.approved_project1.pk,
            'secondChoice': self.approved_project2.pk,
            'thirdChoice': self.approved_project3.pk
        }

        response = self.client.post(url, data=json.dumps(
            data), content_type='application/json')
        self.assertEqual(response.status_code, 401)

    def test_update_project_application(self):
        project_preferences = [self.approved_project1,
                               self.approved_project3, self.approved_project2]
        application = self.create_application(
            self.authenticated_user, project_preferences)
        url = django_urls.reverse(
            'projects:project-apps-detail', args=[application.pk])
        data = {
            'firstChoice': self.approved_project1.pk,
            'secondChoice': self.approved_project2.pk,
            'thirdChoice': self.approved_project3.pk
        }

        response = self.client.put(
            url, data=json.dumps(data), content_type='application/json', **self.headers)

        updated_application = projects_models.ProjectApplication.objects.get(
            pk=application.pk)
        expected = [self.approved_project1,
                    self.approved_project2, self.approved_project3]
        actual = updated_application.preferences
        self.assertListEqual(expected, actual)

    # def test_update_project_application_fails_when_not_owner(self):
    #     project_preferences = [self.approved_project1,
    #                            self.approved_project3, self.approved_project2]
    #     application = self.create_application(
    #         self.authenticated_user, project_preferences)

    #     url = django_urls.reverse(
    #         'projects:project-apps-detail', args=[application.pk])
    #     data = {
    #         'firstChoice': self.approved_project1.pk,
    #         'secondChoice': self.approved_project2.pk,
    #         'thirdChoice': self.approved_project3.pk
    #     }

    #     bad_token = Token.objects.get(user=self.member1)
    #     headers = {
    #         'HTTP_AUTHORIZATION': 'Token %s' % bad_token
    #     }
    #     response = self.client.put(url, data=json.dumps(
    #         data), content_type='application/json', **headers)
    #     updated_application = projects_models.ProjectApplication.objects.get(
    #         pk=application.pk)
    #     print(updated_application.preferences)
    #     self.assertEqual(response.status_code, 401)
