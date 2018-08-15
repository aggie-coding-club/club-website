from projects import models as projects_models
from projects.tests import shared_testcase
import numpy as np
from projects.management.commands import assign_members_to_teams as mgmt_cmd
from scipy.optimize import linear_sum_assignment


class AssignMembersToTeamsTests(shared_testcase.ProjectsTestCase):

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

        expected_cost_matrix = [[1, 2, 3], [3, 2, 1]]
        self.assertEqual(expected_cost_matrix, actual_cost_matrix.tolist())

    def test_decode_project_members(self):
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
        cost_matrix = np.array([[1, 2, 3], [3, 2, 1]])
        reverse_mapping = {
            0: self.small_project,
            1: self.small_project2,
            2: self.medium_project
        }
        row_indices, col_indices = linear_sum_assignment(cost_matrix)
        indices = zip(row_indices, col_indices)
        actual_new_projects = mgmt_cmd.decode_project_members(
            forward_mapping, cost_matrix, reverse_mapping, indices, self.applications)

        expected_new_teams = {
            self.small_project: [self.application1],
            self.medium_project: [self.application2]
        }
        self.assertDictEqual(expected_new_teams, actual_new_projects)

    def test_add_new_members_to_projects(self):
        decoded_new_teams = {
            self.small_project: [self.application1],
            self.medium_project: [self.application2]
        }
        mgmt_cmd.add_new_members_to_projects(decoded_new_teams)
        
        expected_small_project_members = [self.member1]
        actual_small_project_members = list(self.small_project.members.all())
        self.assertListEqual(expected_small_project_members,
                             actual_small_project_members)

        expected_medium_project_members = [self.member2]
        actual_medium_project_members = list(self.medium_project.members.all())
        self.assertListEqual(expected_medium_project_members,
                             actual_medium_project_members)
