from django.db import models
from django.contrib.auth import models as auth_models

# Create your models here.


class Notification(models.Model):
    """Abstract model.
    
    Representation of a notification event.
    Used primarily to ensure that when notifications are sent,
    they can be tracked in history.

    Attributes:
        message: The body of the notification, or what we want to announce to members.
        sending_user: Who sent the message. This should either be an officer or a robot account.
        attachment: An optional attachment to send alongside the message.
    """

    message = models.TextField(null=False, blank=False)
    attachment = models.FileField(null=True, blank=True)

    class Meta:
        abstract = True


class SlackMixin(models.Model):
    """Abstract model.

    Provides attributes that are specific to Slack.

    Attributes:
        channel: What channel to create an announcement in. The choices should be "#announcements", or "#general"
        notify_channel: Whether or not to prefix the announcement with "@channel"
    """

    CHANNEL_CHOICES = (('#announcements', '#announcements'),
                       ('#general', '#general'))
    channel = models.CharField(max_length=20, choices=CHANNEL_CHOICES)
    notify_channel = models.BooleanField(default=False)

    class Meta:
        abstract = True


class EmailMixin(models.Model):
    """Abstract model.

    Provides attributes necessary for sending emails.

    Attributes:
        subject: The subject line of the email
        recipients: The specific recipients of the email.
        html_email: Whether or not this email contains HTML content.
    """

    subject = models.CharField(max_length=255)
    recipients = models.ManyToManyField(auth_models.User)
    html_email = models.BooleanField(default=False)

    @property
    def emails(self):
        return list(self.recipients.values_list('email', flat=True))

    class Meta:
        abstract = True


class SlackNotification(Notification, SlackMixin):
    """A representation of a Slack notification.

    Attributes:
        message: The body of the notification, or what we want to announce to members.
        sending_user: Who sent the message. This should either be an officer or a robot account.
        attachment: An optional attachment to send alongside the message.
        channel: What channel to create an announcement in. The choices should be "#announcements", or "#general"
        notify_channel: Whether or not to prefix the announcement with "@channel"
    """
    sending_user = models.ForeignKey(
        auth_models.User, on_delete=models.PROTECT, related_name='slack_notifications', limit_choices_to={'is_staff': True})


class EmailNotification(Notification, EmailMixin):
    """A representation of an email notification.

    Attributes:
        attachment: An optional attachment to send alongside the message.
        html_email: Whether or not the message of the email is HTML.
        message: The body of the notification, or what we want to announce to members.
        recipients: The specific recipients of the email.
        sending_user: Who sent the message. This should either be an officer or a robot account.
        subject: The subject line of the email
    """
    sending_user = models.ForeignKey(
        auth_models.User, on_delete=models.PROTECT, related_name='email_notifications', limit_choices_to={'is_staff': True})


class SlackEmailNotification(Notification, EmailMixin, SlackMixin):
    """A representation of a notification that was emitted through Slack and through email.

    Attributes:
        attachment: An optional attachment to send alongside the message.
        channel: What channel to create an announcement in. The choices should be "#announcements", or "#general"
        html_email: Whether or not the message of the email is HTML.
        message: The body of the notification, or what we want to announce to members.
        notify_channel: Whether or not to prefix the announcement with "@channel"
        recipients: The specific recipients of the email.
        sending_user: Who sent the message. This should either be an officer or a robot account.
        subject: The subject line of the email
    """
    sending_user = models.ForeignKey(
        auth_models.User, on_delete=models.PROTECT, related_name='slack_email_notifications', limit_choices_to={'is_staff': True})
