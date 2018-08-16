from django import test
from django.contrib.auth import models as auth_models
from django.core import exceptions as django_exceptions

from notifications import models as notify_models
from notifications.tests import shared_testcase


class EmailNotificationTests(shared_testcase.SharedTestCase):

    def test_emails(self):
        notification = self.create_emailnotification(
            self.superuser1, [self.superuser2])

        expected = [self.superuser2.email]

        self.assertEqual(expected, notification.emails)

    def test_validation_error_when_sender_not_staff(self):
        dummy_user = auth_models.User.objects.create_user(
            username='username', email='email')
        with self.assertRaises(django_exceptions.ValidationError):
            notification = self.create_emailnotification(dummy_user, [self.superuser2])
            notification.full_clean()
