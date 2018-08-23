from django.db import models as django_models
from django.contrib.auth import models as auth_models
from datetime import datetime
from typing import List, Dict, Tuple


def calculate_semester(date=datetime.today()) -> str:
    """Determines what semester we're currently in.

    Args:
        date: A datetime object
    Returns:
        Either 'FA' (fall), 'SP' (spring), 'SU' (summer), 'WI' (winter)
    """
    current_month = date.month

    AUGUST = 8
    DECEMBER = 12
    JANUARY = 1
    MAY = 5

    FALL = 'FA'
    WINTER = 'WI'
    SPRING = 'SP'
    SUMMER = 'SU'

    if AUGUST <= current_month and current_month <= DECEMBER:
        return FALL
    elif DECEMBER <= current_month and current_month <= JANUARY:
        return WINTER
    elif JANUARY <= current_month and current_month <= MAY:
        return SPRING
    else:
        return SUMMER

def calculate_current_term() -> Tuple[str, int]:
    return (calculate_semester(), datetime.today().year)

class ProjectsManager(django_models.Manager):
    """A Manager for the Project model."""

    def get_queryset(self):
        return super(ProjectsManager, self).get_queryset()

    def approved_projects(self) -> django_models.QuerySet:
        """Returns a queryset of all of the approved projects.

        Returns:
            A queryset containing all of the projects whose `approved` attribute is True.
        """
        return self.get_queryset().filter(approved=True)

    def unapproved_projects(self) -> django_models.QuerySet:
        """Returns a queryset of all of the unapproved projects.

        Returns:
            A queryset containing all of the projects whose `approved` attribute is False.
        """
        return self.get_queryset().filter(approved=False)

class ProjectApplicationsManager(django_models.Manager):
    """A Manager for the ProjectApplication model."""

    def get_queryset(self):
        return super(ProjectApplicationsManager, self).get_queryset()

    def current(self):
        parameters = {
            'semester': calculate_semester(),
            'year': datetime.today().year
        }
        return self.get_queryset().get(**parameters)
