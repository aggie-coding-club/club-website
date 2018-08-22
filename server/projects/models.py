from datetime import datetime
from typing import Dict, List, NewType, Tuple

from django import urls
from django.contrib.auth import models as auth_models
from django.core import exceptions as django_exceptions
from django.db import models

from github import models as github_models
from projects import managers as projects_managers

# Create your models here.
Email = str


class NotApprovedException(Exception):
    pass


def requires_project_approval(main_function):
    """Decorator. Used when a Project must be approved before modifying.

    Args:
        main_function: The function to call if the Project is approved.
    Returns:
        A wrapper function that first checks if the Project is approved, then calls `main_function`.
    """

    def wrapper(self, *args, **kwargs):
        if not self.approved:
            raise NotApprovedException(
                'This Project is not approved. It must be approved before modifying data.')
        main_function(self, *args, **kwargs)
    return wrapper


class Project(models.Model):
    """A representation of an ACC Project.

    Attributes:
        name: The name of the ACC project.
        description: A description of the project.
        project_lead: User who runs the project.
        approved: Whether or not this project has received official approval
        members: Users who are contributing to this project.
        ideal_capacity: How many Users this project ideally would have.
    """
    name = models.CharField(max_length=255, unique=True)
    description = models.TextField(max_length=255)
    project_lead = models.ForeignKey(auth_models.User,
                                     on_delete=models.SET_NULL,
                                     null=True,
                                     blank=True,
                                     related_name='leads')
    approved = models.BooleanField(default=False)
    members = models.ManyToManyField(auth_models.User, blank=True)

    CAPACITY_CHOICES = (
        (0.05, 'Small'),
        (0.10, 'Medium'),
        (0.15, 'Large'),
        (0.20, 'X-Large')
    )
    ideal_capacity = models.FloatField(choices=CAPACITY_CHOICES, default=0.10)

    objects = projects_managers.ProjectsManager()

    class Meta:
        ordering = ('name',)

    def __str__(self):
        return self.name

    @property
    def member_emails(self) -> List[Email]:
        """Retrieves all of the emails for the members of a Project.

        Args:
            project: The Project to get member emails from.
        Returns:
            A list of the `members` emails.
        """
        return [m.email for m in self.members.all() if m.email]

    def get_absolute_url(self):
        return urls.reverse_lazy('projects:project-detail', kwargs={'pk': self.pk})

class ProjectApplication(models.Model):
    """An application to an ACC project. Submitted by a `User` for a `Project`

    Attributes:
        user: A ForeignKey to a auth_models.User
        semester: The semester in which this application was submitted. 
        year: The year in which this application was submitted.
        first_choice: A ForeignKey relation to a `Project`. Indicates that this is `user`'s first choice.
        second_choice: A ForeignKey relation to a `Project`. Indicates that this is `user`'s second choice. Nullable.
        third_choice: A ForeignKey relation to a `Project`. Indicates that this is `user`'s third choice. Nullable.
        created_project: A ForeignKey relation to a `Project`. Indicates that `user` created this project, and must be assigned to it. Nullable.
    """
    user = models.ForeignKey(
        auth_models.User, on_delete=models.CASCADE, related_name='project_applications')

    SEMESTER_CHOICES = (
        ('FA', 'Fall'),
        ('SP', 'Spring'),
        ('SU', 'Summer'),
        ('WI', 'Winter'),
    )
    semester = models.CharField(
        max_length=2, choices=SEMESTER_CHOICES, default=projects_managers.calculate_semester)

    THIS_YEAR = datetime.today().year
    YEAR_CHOICES = ((y, y) for y in range(2015, THIS_YEAR+1))
    year = models.IntegerField(choices=YEAR_CHOICES, default=THIS_YEAR)

    first_choice = models.ForeignKey(
        Project, on_delete=models.CASCADE, related_name='first_choices', limit_choices_to={'approved': True})
    second_choice = models.ForeignKey(
        Project, on_delete=models.CASCADE, related_name='second_choices', null=True, blank=True, limit_choices_to={'approved': True})
    third_choice = models.ForeignKey(
        Project, on_delete=models.CASCADE, related_name='third_choices', null=True, blank=True, limit_choices_to={'approved': True})

    created_project = models.ForeignKey(
        Project, on_delete=models.CASCADE, related_name='project_creator', null=True, blank=True)

    objects = models.Manager()
    current = projects_managers.ProjectApplicationsManager()

    class Meta:
        ordering = ('')
        unique_together = ('user', 'semester', 'year')

    @property
    def is_complete(self):
        return self.first_choice is not None \
            and self.second_choice is not None \
            and self.third_choice is not None

    @property
    def is_current(self):
        """A computed property, indicating whether an application lies within the current semester
        and year.

        Returns:
            Boolean.
        """
        return self.semester == projects_managers.calculate_semester(datetime.today()) and self.year == datetime.today().year

    @property
    def preferences(self):
        """Returns the user's preferences in order, ignoring null fields.

        Returns:
            A list of Projects, ignoring null fields.
        """
        choices = [self.first_choice, self.second_choice, self.third_choice]
        return [choice for choice in choices if choice]

    def get_absolute_url(self):
        return urls.reverse_lazy('projects:app-detail', kwargs={'pk': self.pk})
