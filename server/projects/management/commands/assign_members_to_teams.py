from django.core.management.base import BaseCommand, CommandError
from typing import List, Any, Tuple, Dict, NewType
import math
from projects import models as projects_models
import numpy as np
from scipy.optimize import linear_sum_assignment
import collections

ForwardMapping = NewType('ForwardMapping', Dict[Any, Dict[str, int]])
BackwardMapping = Dict[int, Any]


def create_mappings(items: List[Any]) -> Tuple[ForwardMapping, BackwardMapping]:
    """Creates a forward and reverse relation for items. Forwards mapping to turn items into unique ids,
    and backwards mappings to turn ids into items.

    Args:
        items: An array of items.
    Returns:
        (forward mapping, backward mapping)
    """
    forward_mapping = {}
    backward_mapping = {}
    for item in items:
        curr_len = len(forward_mapping)
        forward_mapping[item] = {'id': curr_len}
        backward_mapping[curr_len] = item

    return forward_mapping, backward_mapping


def construct_cost_matrix(applications, projects):
    """Constructs a cost matrix "A" for use with the Hungarian algorithm. The columns of A are the
    member slots for each project. If there are 2 projects available for registration, project Z has 5 slots,
    and project Y has 3 slots, then "A" will have 8 columns. Each row of "A" represents a ProjectApplication.

    Args:
        applications: A list of ProjectApplications
        projects: A ForwardMapping of Projects
    Returns:
        A modified forward mapping of format:
        {
            <Project>: {
                "id": int,
                "range": (int, int)
            }
        }
        A 2-D numpy array, of shape (len(applications), number_of_project_slots).
    """
    num_columns = 0
    number_of_applications = len(applications)
    for project in projects:
        begin_range = num_columns
        num_columns += math.ceil(project.ideal_capacity *
                                 number_of_applications)
        end_range = num_columns
        projects[project]['range'] = (begin_range, end_range)

    cost_matrix = np.full(
        shape=(len(applications), num_columns), fill_value=9999)

    for i in range(len(applications)):
        preferences = applications[i].preferences
        for j in range(len(preferences)):
            preferred_project = preferences[j]
            start, end = projects[preferred_project]['range']

            cost_matrix[i][start:end] = j + 1
    return projects, cost_matrix


def decode_project_members(forward, backward, cost_matrix, indices, applications):
    """Takes a forward mapping, backward mapping, and indices, and then assigns applications to teams.

    Args:
        forward: A forward mapping, output by construct_cost_matrix
        backward: A backward mapping, output by create_mappings
        indices: The optimal indices to minimize cost. 
        applications: A list of projects_models.ProjectApplications
    Returns:
    {
        <Project>: [<ProjectApplication>],
        ...
        <Project>: [<ProjectApplication>]
    }
    """
    teams = collections.defaultdict(list)
    for row, col in indices:
        for project in forward:
            start, end = forward[project]['range']
            if start <= col and col < end:
                teams[project].append(applications[row])
    return teams


def add_new_members_to_projects(new_projects):
    """Assigns the users on each application to their new projects.

    Args:
        new_projects: {
            <Project>: [<ProjectApplication>]
        }
    """
    for project in new_projects:
        users = []
        for application in new_projects[project]:
            users.append(application.user)
        project.add_multiple_members(users)


class Command(BaseCommand):
    def handle(self, *args, **options):
        current_applications = projects_models.ProjectApplication.objects.current_applications()
        approved_projects = projects_models.Project.objects.approved_projects()
        forward_mapping, backward_mapping = create_mappings(
            approved_projects)
        forward_mapping, cost_matrix = construct_cost_matrix(
            current_applications, forward_mapping)
        row_indices, col_indices = linear_sum_assignment(cost_matrix)
        indices = zip(row_indices, col_indices)
        new_projects = decode_project_members(
            forward_mapping, backward_mapping, cost_matrix, indices, current_applications)
        add_new_members_to_projects(new_projects)
