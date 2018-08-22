from django.test import testcases
from projects import models as projects_models
from projects.tests import shared_testcase
from django.contrib.auth import models as auth_models


class ProjectApplicationManagerTests(shared_testcase.ProjectsTestCase):
    def setUp(self):
        self.preferences = [self.approved_project1,
                            self.approved_project2, self.approved_project3]
        self.preferences2 = [self.approved_project1,
                             self.approved_project3, self.approved_project2]

        self.normal_application = self.create_application(
            self.member1, self.preferences)

    def test_current_applications_excludes_old_applications(self):
        old_application = self.create_application(
            user=self.member2, projects=self.preferences2, semester='SU', year=2015)

        current_applications = projects_models.ProjectApplication.current.all()
        expected = [self.normal_application.pk]
        actual = [app.pk for app in current_applications]
        self.assertListEqual(expected, actual)
