from django import test
from django.contrib.auth import models as auth_models
from django.core import exceptions as django_exceptions

from notifications.tests import shared_testcase


class SlackNotificationTests(shared_testcase.SharedTestCase):
    def test_validation_error_when_sender_not_staff(self):
        dummy_user = auth_models.User.objects.create_user(
            username='not_admin', email='not_admin@mail.com')
        with self.assertRaises(django_exceptions.ValidationError):
            notification = self.create_slacknotification(
                dummy_user, channel='#announcements', notify_channel=False)
            notification.full_clean()
