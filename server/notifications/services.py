from typing import Dict

from django.core import mail

from notifications import models as notify_models
from django.template import loader
from django.utils import html


def create_emailmultialternatives(email_notification) -> mail.EmailMultiAlternatives:
    """Creates an `EmailMultiAlternatives` instance from a notification.

    Args:
    
    email_notification: A Django model that inherits from `Notification` and `EmailMixin`

    Returns:
        An instance of EmailMultiAlternatives
    """
    fields = {
        'subject': email_notification.subject,
        'from_email': email_notification.sending_user.email,
        'to': email_notification.emails,
        'body': html.strip_tags(email_notification.message)
    }
    email = mail.EmailMultiAlternatives(**fields)

    if email_notification.html_email:
        email.attach_alternative(email_notification.message, 'text/html')
    return email


def send_email(email_notification):
    """A function that sends one email (with possible HTML content).
    To send multiple emails at once using the same connection (good for speed)
    use `send_multiple_emails`
    
    Args:
        email_notification: A child of `Notification` and `EmailMixin`
    Returns:
        0 if email was sent unsuccessfully, or 1.
    """
    email = create_emailmultialternatives(email_notification)
    return email.send(fail_silently=False)


def send_multiple_emails(email_notifications):
    """A function that sends multiple emails (with possible HTML content).
    To send one email at a time, see `send_email`

    Args:
        email_notifications: An iterable of instances inheriting from `Notification` and `EmailMixin`
    Returns:
        The number of emails sent successfully.
    """
    messages = []
    for notification in email_notifications:
        email = create_emailmultialternatives(notification)
        messages.append(email)
    connection = mail.get_connection()
    return connection.send_messages(messages)
