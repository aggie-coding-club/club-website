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

    def create_emailnotification(self, sending_user, recipients, html_email=False, message=None):
        notification = notify_models.EmailNotification(sending_user=sending_user)
        notification.subject = self.dummy_content['subject']
        if not html_email:
            notification.message = self.dummy_content['message']
        else:
            if not message:
                raise Exception('If html_email keyword argument is provided, so must "message"')
            notification.message = message
        notification.save()
        notification.recipients.set(recipients)
        return notification

    def create_slacknotification(self, sending_user, channel, notify_channel):
        return notify_models.SlackNotification.objects.create(sending_user=sending_user,
                                                              channel=channel,
                                                              notify_channel=notify_channel,
                                                              message=self.dummy_content['message'])

    def create_slackemailnotification(self, sending_user, recipients, channel='#announcements', notify_channel=False, html_email=False, message=None):
        notification = notify_models.SlackEmailNotification(sending_user=sending_user, 
                                                            channel=channel, 
                                                            notify_channel=notify_channel)
        notification.subject = self.dummy_content['subject']
        if not html_email:
            notification.message = self.dummy_content['message']
        else:
            if not message:
                raise Exception('If html_email keyword argument is provided, so must "message"')
            notification.message = message
        notification.save()
        notification.recipients.set(recipients)
        return notification
