from projects import models as projects_models
from projects.tests import shared_testcase
from django.contrib.auth import models as auth_models
from django.core import exceptions as django_exceptions
from django.test import testcases


class ProjectsTest(shared_testcase.ProjectsTestCase):
    """Tests method functionality of the Project model."""

    def test_add_member(self):
        self.approved_project1.add_member(self.member1)

        expected_usernames = ['member1']
        actual_usernames = [m.username for m in self.approved_project1.members.all()]

        self.assertListEqual(expected_usernames, actual_usernames)

    def test_add_member_when_project_unapproved(self):
        with self.assertRaises(projects_models.NotApprovedException):
            self.unapproved_project1.add_member(self.member1)

    def test_remove_member(self):
        self.setup_one_member(self.approved_project1)

        self.approved_project1.remove_member(self.member1)

        expected_usernames = []
        actual_usernames = [m.username for m in self.approved_project1.members.all()]

        self.assertListEqual(expected_usernames, actual_usernames)

    def test_remove_member_when_project_unapproved(self):
        self.setup_one_member(self.unapproved_project1)

        with self.assertRaises(projects_models.NotApprovedException):
            self.unapproved_project1.remove_member(self.member1)

    def test_add_multiple_members(self):
        self.approved_project1.add_multiple_members(self.members)

        expected_usernames = [m.username for m in self.members]

        actual_usernames = [m.username for m in self.approved_project1.members.all()]
        self.assertListEqual(expected_usernames, actual_usernames)

    def test_add_multiple_members_when_project_unapproved(self):
        with self.assertRaises(projects_models.NotApprovedException):
            self.unapproved_project1.add_multiple_members(self.members)

    def test_remove_multiple_members(self):
        self.setup_multiple_members(self.approved_project1)

        self.approved_project1.remove_multiple_members(self.members)

        expected_usernames = []

        actual_usernames = [m.username for m in self.approved_project1.members.all()]

        self.assertListEqual(expected_usernames, actual_usernames)

    def test_remove_multiple_members_when_project_unapproved(self):
        self.setup_multiple_members(self.unapproved_project1)

        with self.assertRaises(projects_models.NotApprovedException):
            self.unapproved_project1.remove_multiple_members(self.members)

    def test_add_project_lead(self):
        self.approved_project1.add_project_lead(self.project_lead)

        expected = 'project-lead'

        actual = self.approved_project1.project_lead.username

        self.assertEqual(expected, actual)

    def test_add_project_lead_when_project_unapproved(self):
        with self.assertRaises(projects_models.NotApprovedException):
            self.unapproved_project1.add_project_lead(self.project_lead)

    def test_add_project_lead_when_already_exists(self):
        self.setup_project_lead(self.approved_project1)
        with self.assertRaises(django_exceptions.ValidationError):
            self.approved_project1.add_project_lead(self.project_lead)

    def test_remove_project_lead(self):
        self.setup_project_lead(self.approved_project1)

        self.approved_project1.remove_project_lead()

        expected = None
        actual = self.approved_project1.project_lead

        self.assertEqual(expected, actual)

    def test_remove_project_lead_when_project_unapproved(self):
        self.setup_project_lead(self.unapproved_project1)

        with self.assertRaises(projects_models.NotApprovedException):
            self.unapproved_project1.remove_project_lead(self.project_lead)

    def test_replace_project_lead(self):
        self.setup_project_lead(self.approved_project1)
        new_project_lead = auth_models.User.objects.create_user(
            username='new-lead')

        self.approved_project1.replace_project_lead(new_project_lead)

        expected = 'new-lead'
        actual = self.approved_project1.project_lead.username

        self.assertEqual(expected, actual)

    def test_replace_project_lead_when_project_unapproved(self):
        self.setup_project_lead(self.unapproved_project1)
        new_project_lead = auth_models.User.objects.create_user(
            username='new-lead')
        with self.assertRaises(projects_models.NotApprovedException):
            self.unapproved_project1.replace_project_lead(new_project_lead)

    def test_member_emails(self):
        self.setup_multiple_members(self.approved_project1)
        expected = [m.email for m in self.members]
        actual = self.approved_project1.member_emails

        self.assertListEqual(expected, actual)

    def test_member_emails_when_no_members(self):
        expected = []
        actual = self.approved_project1.member_emails

        self.assertListEqual(expected, actual)
