from notifications.tests import shared_testcase
from notifications import services
from notifications import models


class ServicesTests(shared_testcase.SharedTestCase):

    def setUp(self):
        super(ServicesTests, self).setUp()
        self.html_content = '<p>This is an html message</p>'

    def test_create_multialternatives(self):
        notification = models.EmailNotification(message=self.html_content,
                                                html_email=True,
                                                sending_user=self.superuser1,
                                                subject='Subject')
        notification.save()
        notification.recipients.set([self.superuser2])

        email = services.create_emailmultialternatives(notification)
        expected = {
            'subject': 'Subject',
            'from_email': self.superuser1.email,
            'to': [self.superuser2.email],
            'body': 'This is an html message'
        }

        actual = {
            'subject': email.subject,
            'from_email': email.from_email,
            'to': email.to,
            'body': email.body
        }

        self.assertDictEqual(expected, actual)

    def test_send_email(self):
        notification = self.create_emailnotification(
            self.superuser1, [self.superuser2])
        successful_emails = services.send_email(notification)
        self.assertEqual(successful_emails, 1)

    def test_send_email_with_html_content(self):
        notification = models.EmailNotification(message=self.html_content,
                                                html_email=True,
                                                sending_user=self.superuser1,
                                                subject='Subject')
        notification.save()
        notification.recipients.set([self.superuser2])

        successful_emails = services.send_email(notification)
        self.assertEqual(successful_emails, 1)

    def test_send_multiple_emails(self):
        first = self.create_emailnotification(
            self.superuser1, [self.superuser2])
        second = self.create_emailnotification(
            self.superuser1, [self.superuser2])

        expected = 2
        actual = services.send_multiple_emails([first, second])

        self.assertEqual(expected, actual)
