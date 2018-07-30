"""Provides services for the `core` app's models."""
from typing import Dict, List, NewType, Tuple

from django.core import mail

from projects import models as projects_models

Email = str


def email_members(project: projects_models.Project, datatuple: Tuple[str, str, Email]):
    """Sends an email to the members of a project.

    Args:
        project: The project whose members are to be emailed.
    """
    email_addresses = project.member_emails
    datatuple = list(datatuple)
    datatuple.append(email_addresses)
    if not email_addresses:
        return 0
    return mail.send_mail(*datatuple)
