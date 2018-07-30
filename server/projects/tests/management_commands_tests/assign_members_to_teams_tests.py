from projects import models as projects_models
from projects.tests import shared_testcase
import numpy as np
from projects.management.commands import assign_members_to_teams as mgmt_cmd
from scipy.optimize import linear_sum_assignment


class AssignMembersToTeamsTest(shared_testcase.ProjectsTestCase):

    def setUp(self):
        self.small_project = projects_models.Project(
            name='small', description='project', ideal_capacity=0.05, approved=True)
        self.small_project.save()
        self.small_project2 = projects_models.Project(
            name='small2', description='project', ideal_capacity=0.05, approved=True)
        self.small_project2.save()
        self.medium_project = projects_models.Project(
            name='medium', description='project', ideal_capacity=0.15, approved=True)
        self.medium_project.save()

        preferences1 = [self.small_project,
                        self.small_project2, self.medium_project]
        preferences2 = [self.medium_project,
                        self.small_project2, self.small_project]

        self.application1 = self.create_application(
            user=self.member1, projects=preferences1)
        self.application2 = self.create_application(
            user=self.member2, projects=preferences2)
        self.applications = [self.application1, self.application2]

    def test_forward_and_backward_mapping(self):
        forward, backward = mgmt_cmd.create_mappings(['a', 'b', 'c', 'd'])
        expected_forward = {
            'a': {'id': 0},
            'b': {'id': 1},
            'c': {'id': 2},
            'd': {'id': 3}
        }

        expected_backward = {
            0: 'a',
            1: 'b',
            2: 'c',
            3: 'd'
        }

        self.assertDictEqual(expected_forward, forward)
        self.assertDictEqual(expected_backward, backward)

    def test_construct_cost_matrix(self):
        mock_forward_mapping = {
            self.small_project: {'id': 0},
            self.small_project2: {'id': 1},
            self.medium_project: {'id': 2}
        }
        actual_forward_mapping, actual_cost_matrix = mgmt_cmd.construct_cost_matrix(
            self.applications, mock_forward_mapping)

        expected_forward_mapping = {
            self.small_project: {
                'id': 0,
                'range': (0, 1)
            },
            self.small_project2: {
                'id': 1,
                'range': (1, 2)
            },
            self.medium_project: {
                'id': 2,
                'range': (2, 3)
            }
        }
        self.assertDictEqual(expected_forward_mapping, actual_forward_mapping)

        expected_cost_matrix = [[0, 1, 2], [2, 1, 0]]
        self.assertEqual(expected_cost_matrix, actual_cost_matrix.tolist())

    def test_assign_members_to_teams(self):
        forward_mapping = {
            self.small_project: {
                'id': 0,
                'range': (0, 1)
            },
            self.small_project2: {
                'id': 1,
                'range': (1, 2)
            },
            self.medium_project: {
                'id': 2,
                'range': (2, 3)
            }
        }
        cost_matrix = np.array([[0, 1, 2], [2, 1, 0]])
        reverse_mapping = {
            0: self.small_project,
            1: self.small_project2,
            2: self.medium_project
        }
        row_indices, col_indices = linear_sum_assignment(cost_matrix)
        indices = zip(row_indices, col_indices)
        actual_new_teams = mgmt_cmd.assign_members_to_teams(forward_mapping, cost_matrix, reverse_mapping, indices, self.applications)
        
        expected_new_teams = {
            self.small_project: [self.application1],
            self.medium_project: [self.application2]
        }
        self.assertDictEqual(expected_new_teams, actual_new_teams)