from django import test
from django.contrib.auth import models as auth_models

from notifications import models as notify_models


class SharedTestCase(test.TestCase):
    def setUp(self):
        super(SharedTestCase, self).setUp()

        self.superuser1 = auth_models.User.objects.create_superuser(
            username='admin', email='admin@mail.com', password='admin')

        self.superuser2 = auth_models.User.objects.create_superuser(
            username='admin2', email='admin2@mail.com', password='admin')

        self.dummy_content = {
            'message': 'Dummy body.',
            'subject': 'Dummy subject'
        }

    def create_emailnotification(self, sending_user, recipients):
        notification = notify_models.EmailNotification.objects.create(
            sending_user=sending_user, **self.dummy_content)
        notification.recipients.set(recipients)
        return notification

    def create_slacknotification(self, sending_user, channel, notify_channel):
        return notify_models.SlackNotification.objects.create(sending_user=sending_user,
                                                              channel=channel,
                                                              notify_channel=notify_channel,
                                                              message=self.dummy_content['message'])

    def create_slackemailnotification(self, sending_user, recipients, channel='#announcements', notify_channel=False):
        notification = notify_models.SlackEmailNotification.objects.create(
            sending_user=sending_user, channel=channel, notify_channel=notify_channel, **self.dummy_content)
        notification.recipients.set(recipients)
        return notification
