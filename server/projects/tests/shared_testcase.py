from projects import models as projects_models
from django.contrib.auth import models as auth_models
from django.test import testcases
from typing import List, Dict, Tuple


class ProjectsTestCase(testcases.TestCase):
    """A subclass of Django's TestCase that reduces the amount of rewriting needed for each test."""

    @classmethod
    def setUpMembers(cls):
        """Creates members to be used between TestCases."""
        cls.member1 = auth_models.User.objects.create_user(
            username='member1', email='member1@email.com')
        cls.member2 = auth_models.User.objects.create_user(
            username='member2', email='member2@email.com')
        cls.member3 = auth_models.User.objects.create_user(
            username='member3', email='member3@email.com')

        cls.members = [cls.member1, cls.member2, cls.member3]

        # Project lead
        cls.project_lead = auth_models.User.objects.create_user(
            username='project-lead', email='project-lead@email.com')

    @classmethod
    def setUpProjects(cls):
        """Creates Projects to be used between TestCases."""
        cls.unapproved_project1 = projects_models.Project.objects.create(
            name='unapproved-project1', description='unapproved-description')
        cls.approved_project1 = projects_models.Project.objects.create(
            name='approved-project1', description='approved-description', approved=True)
        cls.approved_project2 = projects_models.Project.objects.create(
            name='approved-project2', description='approved-description', approved=True)
        cls.approved_project3 = projects_models.Project.objects.create(
            name='approved-project3', description='approved-description', approved=True)

    @classmethod
    def setUpTestData(cls):
        cls.setUpMembers()
        cls.setUpProjects()

    def create_application(self, user: auth_models.User, projects: List[projects_models.Project], semester=None, year=None) -> projects_models.ProjectApplication:
        """Creates an application given a user and a list of projects (in order of preference).

        Args:
            user: A user instance.
            projects: A list of Projects
        Returns:
            A ProjectApplication instance.
        """
        if len(projects) != 3:
            raise Exception(
                'Expected list of projects with 3 elements, got %i.' % len(projects))
        first_choice, second_choice, third_choice = projects
        parameters = {
            'user': user,
            'first_choice': first_choice,
            'second_choice': second_choice,
            'third_choice': third_choice,
        }
        if semester:
            parameters['semester'] = semester
        if year:
            parameters['year'] = year
        return projects_models.ProjectApplication.objects.create(**parameters)

    def setup_one_member(self, project: projects_models.Project):
        """Adds one member to a Project. Used for tesing purposes.

        Args:
            project: The Project to add one member to.
        """
        project.members.add(self.member1)

    def setup_multiple_members(self, project: projects_models.Project):
        """Adds multiple members to a Project. Used for testing purposes.

        Args:
            project: The Project to add multiple members to.
        """
        project.members.add(*self.members)

    def setup_project_lead(self, project: projects_models.Project):
        """Adds a project lead to a Project. Used for testing purposes.

        Args:
            project: The project to add a project_lead to.
        """
        project.project_lead = self.project_lead
        project.save()
