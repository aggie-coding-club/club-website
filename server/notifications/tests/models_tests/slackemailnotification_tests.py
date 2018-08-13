from django import test
from notifications.tests import shared_testcase
from django.core import exceptions as django_exceptions
from django.contrib.auth import models as auth_models


class SlackEmailNotificationTests(shared_testcase.SharedTestCase):
    def test_validation_error_when_sender_not_staff(self):
        dummy_user = auth_models.User.objects.create_user(
            username='not_admin', email='not_admin@mail.com')
        with self.assertRaises(django_exceptions.ValidationError):
            notification = self.create_slackemailnotification(
                dummy_user, [self.superuser2])
            notification.full_clean()
