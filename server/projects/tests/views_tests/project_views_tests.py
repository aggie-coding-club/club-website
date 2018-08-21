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
        response = self.client.post(self.create_project_url, data=json.dumps(
            mock_project), content_type='application/json')

        expected = {
            'name': 'Test Project',
            'description': 'A project description',
            'idealCapacity': 0.05,
            'approved': False,
            'projectLead': None,
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
        response = self.client.post(self.create_project_url, data=json.dumps(
            mock_project), content_type='application/json')

        expected = {
            'name': 'Test Project',
            'description': 'A project description',
            'idealCapacity': 0.05,
            'approved': True,
            'projectLead': None,
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

    def setUp(self):
        self.application1 = self.create_application(self.member1, [self.approved_project1, self.approved_project2, self.approved_project3])

    def test_retrieve_project_application(self):
        url = django_urls.reverse('projects:app-detail', args=[self.application1.pk])
        response = self.client.get(url)
        print(str(response.content))
