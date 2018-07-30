from projects import models as projects_models
from projects.tests import shared_testcase
from django.contrib.auth import models as auth_models
from projects import services as projects_services


class ServicesTest(shared_testcase.ProjectsTestCase):

    def setUp(self):
        self.email_fields = ('email-subject', 'email-body', 'test-email@email.com',)

    def test_email_members(self):
        self.setup_multiple_members(self.approved_project1)
        expected_emails_sent = 1
        actual_emails_sent = projects_services.email_members(
            self.approved_project1, self.email_fields)
        self.assertEqual(expected_emails_sent, actual_emails_sent)

    def test_email_members_when_no_members(self):
        expected_emails_sent = 0
        actual_emails_sent = projects_services.email_members(
            self.approved_project1, self.email_fields)
        self.assertEqual(expected_emails_sent, actual_emails_sent)
