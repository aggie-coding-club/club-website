from django.test import testcases
from projects import models as projects_models
from projects.tests import shared_testcase
from django.contrib.auth import models as auth_models
from typing import List, Dict, Tuple


class ProjectApplicationsTest(shared_testcase.ProjectsTestCase):

    def test_get_preferences(self):
        preferences = [self.approved_project1, self.approved_project2, self.approved_project3]

        application = self.create_application(self.member1, preferences)

        expected = preferences
        actual = application.preferences

        self.assertListEqual(expected, actual)

    def test_get_preferences_ignores_nulls_if_second_choice_is_empty(self):
        preferences = [self.approved_project3, None, self.approved_project1]
        application = self.create_application(self.member1, preferences)

        expected = [self.approved_project3, self.approved_project1]

        actual = application.preferences

        self.assertListEqual(expected, actual)

    def test_get_preferences_ignores_nulls_if_third_choice_is_empty(self):
        preferences = [self.approved_project2, self.approved_project3, None]
        application = self.create_application(self.member1, preferences)

        expected = [self.approved_project2, self.approved_project3]

        actual = application.preferences
        self.assertListEqual(expected, actual)
