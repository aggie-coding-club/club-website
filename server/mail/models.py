from typing import Dict, List, NewType, Tuple

from django.contrib.auth import models as auth_models
from django.core import mail as mail_commands
from django.db import models

Email = NewType('Email', str)


class MailingGroup(auth_models.Group):
    """A mailing group used to dispatch emails to specific members."""

    @property
    def email_list(self):
        return [u.email for u in self.user_set.all() if u.email]

    def send_mail(self, subject: str, body: str, from_email: Email):
        """
        Sends an email to this group.

        Args:
          datatuple: A tuple of format (email_subject, email_body, sender)
        """
        return mail_commands.send_mail(subject, body, from_email, self.email_list, fail_silently=False)

    def __str__(self):
        return super().__str__()