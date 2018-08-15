from projects import models as projects_models
from projects.tests import shared_testcase
from django.test import testcases


class ProjectManagerTests(shared_testcase.ProjectsTestCase):
    
    def test_approved_projects(self):
        approved_projects = projects_models.Project.objects.approved_projects()
        expected = [True, True, True]
        actual = [project.approved for project in approved_projects]
        self.assertListEqual(expected, actual)

    def test_unapproved_projects(self):
        unapproved_projects = projects_models.Project.objects.unapproved_projects()
        expected = [False]
        actual = [project.approved for project in unapproved_projects]
        self.assertListEqual(expected, actual)
