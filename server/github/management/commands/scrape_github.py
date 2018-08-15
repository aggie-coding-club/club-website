import os
from typing import Dict, List

import requests
from django.contrib.auth import models as auth_models
from django.core.management.base import BaseCommand, CommandError

from github import models as github_models

HEADERS = {
    'Authorization': 'Bearer %s' % os.environ['PERSONAL_ACCESS_TOKEN']
}

def post_graphql(graphql_query: str, headers: Dict[str, str]):
    """
    Makes a POST request to GitHub's v4 API.

    Args:
      graphql_query: The GraphQL query to send in the request.
      headers: Authorization headers.
    Returns:
      A dictionary containing the GraphQL response.
    """
    url = 'https://api.github.com/graphql'
    r = requests.post(url, json={'query': graphql_query}, headers=headers)
    r.raise_for_status()
    json_response = r.json()
    if 'errors' in json_response:
        raise Exception(json_response['errors'])
    return json_response['data']


def save_member(member_dict: Dict[str, str]) -> github_models.GithubUser:
    """
    Takes a GitHub JSON representation of a member, and saves it with Django ORM.

    Args:
      member_dict: The dictionary representation of a member.
    Returns:
      The instance created (or retrieved) by Django.
    """
    login = member_dict['login']
    defaults = {
        'avatar_url': member_dict['avatarUrl'],
        'bio': member_dict['bio'],
        'company': member_dict['company'],
        'email': member_dict['email'],
        'name': member_dict['name'],
        'url': member_dict['url']
    }
    user = None
    try:
        user = auth_models.User.objects.get(email=defaults['email'])
    except auth_models.User.DoesNotExist:
        pass

    m, _ = github_models.GithubUser.objects.get_or_create(
        login=login, defaults=defaults, user=user)
    return m


def save_repository(repo_dict: Dict[str, str]) -> github_models.Repository:
    """
    Takes a GitHub JSON representation of a repository, and saves it with Django ORM.

    Args:
      repo_dict: The dictionary representation of a repository.
    Returns:
      The instance created (or retrieved) by Django.
    """
    defaults = {
        'description': repo_dict['description'],
        'homepage_url': repo_dict['homepageUrl'],
        'is_private': repo_dict['isPrivate'],
        'url': repo_dict['url']
    }
    if repo_dict['primaryLanguage']:
        defaults['primary_language'] = repo_dict['primaryLanguage']['name']
    r, _ = github_models.Repository.objects.get_or_create(
        name=repo_dict['name'], defaults=defaults)
    return r


def save_team(team_dict: Dict[str, str]) -> github_models.Team:
    """
    Takes a GitHub JSON representation of a team, and saves it with Django ORM.

    Args:
      repo_dict: The dictionary representation of a team.
    Returns:
      The instance created (or retrieved) by Django.
    """
    defaults = {
        'avatar_url': team_dict['avatarUrl'],
        'combined_slug': team_dict['combinedSlug'],
        'description': team_dict['description'],
        'name': team_dict['name'],
        'url': team_dict['url']
    }
    t, _ = github_models.Team.objects.get_or_create(
        name=team_dict['name'], defaults=defaults
    )
    return t


def repository_contributors(owner: str, repo_name: str, headers: Dict[str, str]) -> List[str]:
    """
    Uses GitHub's v3 API to obtain the contributors to a repository.

    Args:
      owner: The owner's login name.
      repo_name: The name of the repository (as it appears in the url)
      headers: Authorization headers
    Returns:
      A list of contributor logins to this repo.
    """
    url = 'https://api.github.com/repos/%s/%s/contributors' % (
        owner, repo_name)
    r = requests.get(url, headers=headers)
    r.raise_for_status()

    return [contributor['login'] for contributor in r.json()]


def repository_fields() -> str:
    """The desired fields to retrieve from GitHub for repositories.

    Returns:
      A newline-delimited list of fields to obtain.
    """
    fields_of_interest = [
        'description',
        'homepageUrl',
        'isPrivate',
        'name',
        'primaryLanguage { name }',
        'url'
    ]
    return '\n'.join(fields_of_interest)


def member_fields(login_only=False) -> str:
    """The desired fields to retrieve from GitHub for members.

    Args:
      login_only: If this is True, retrieves only the `login` for a member.
    Returns:
      A newline-delimited list of fields to obtain.
    """
    if login_only:
        return 'login'
    fields_of_interest = [
        'login',
        'avatarUrl',
        'bio',
        'company',
        'email',
        'name',
        'url'
    ]
    return '\n'.join(fields_of_interest)


def team_fields() -> str:
    """The desired fields to retrieve from GitHub for teams.

    Returns:
      A newline-delimited list of fields to obtain.
    """
    fields_of_interest = [
        'members(first:100) { nodes { %s } }' % member_fields(login_only=True),
        'avatarUrl',
        'combinedSlug',
        'slug',
        'description',
        'name',
        'url'
    ]
    return '\n'.join(fields_of_interest)


class Command(BaseCommand):
    def handle(self, *args, **options):
        """Scrapes GitHub data for member, team, and repository information."""

        query = """
        {
            organization(login:"aggie-coding-club") {
                members(first:100) { 
                    nodes {
                        %s
                    }
                }
                teams(first:100) {
                    nodes {
                        %s
                    }
                }
                repositories(first:100) {
                    nodes {
                        %s
                    }
                }
            }
        }
        """ % (member_fields(), team_fields(), repository_fields())
        organization_data = post_graphql(query, HEADERS)[
            'organization']
        members = organization_data['members']['nodes']

        member_cache = {}
        for member_dict in members:
            m = save_member(member_dict)
            member_cache[member_dict['login']] = m
        print('Member cache built')

        repositories = organization_data['repositories']['nodes']
        for repository_dict in repositories:
            r = save_repository(repository_dict)
            contributor_logins = repository_contributors(
                'aggie-coding-club', repository_dict['name'], HEADERS)
            for login in contributor_logins:
                if login in member_cache:
                    member_cache[login].repositories.add(r)
        print('Repositories saved')

        teams = organization_data['teams']['nodes']
        for team_dict in teams:
            t = save_team(team_dict)
            logins = [m['login'] for m in team_dict['members']['nodes']]
            for login in logins:
                if login in member_cache:
                    member_cache[login].teams.add(t)
        print('Teams saved')