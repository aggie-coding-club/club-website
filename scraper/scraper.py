import requests
from requests import HTTPError
import json
from pprint import pprint

ACCESS_TOKEN = None
with open('./scraper/config.txt', 'r') as f:
    ACCESS_TOKEN = f.read()

BASE_URL = 'https://api.github.com'

ORG_MEMBERS = '/orgs/aggie-coding-club/members'
ORG_REPOS = '/orgs/aggie-coding-club/repos'
ORG_TEAMS = '/orgs/aggie-coding-club/teams'
TEAM_MEMBERS = '/teams/{}/members?role={}'
TEAM_REPOS = '/teams/{}/repos'


headers = {'Authorization': 'token {}'.format(ACCESS_TOKEN)}

def pull_data(route):
    url = '{}{}'.format(BASE_URL, route)
    response = follow_url(url)
    return response

def follow_url(url):
    r = requests.get(url, headers=headers)
    r.raise_for_status()
    return json.loads(r.text)

try:
    # Collect all of the teams of the organization
    teams = pull_data(ORG_TEAMS)
    for i in range(len(teams)):

        # Get the information about this team's repositories
        repo_info = follow_url(teams[i]['repositories_url'])
        
        repo_data = []
        for repo in repo_info:
            
            # Don't track private repos!
            if not repo['private']:

                # Get what languages this repository is written in
                language_info = follow_url(repo['languages_url'])
                repo_data.append({
                    'name': repo['name'],
                    'html_url': repo['html_url'],
                    'languages': language_info,
                    'description': repo['description'],
                    'stars': repo['stargazers_count'],
                    'forks': repo['forks_count'],
                    'watchers': repo['watchers']
                })
        # Set it as the repositories this team maintains.
        teams[i]['repos'] = repo_data

        maintainers = pull_data(TEAM_MEMBERS.format(teams[i]['id'], 'maintainer'))
        maintainers = [maintainer for maintainer in maintainers if maintainer['login'] != 'aggiecodingclub']
        for maintainer in maintainers:
            maintainer = {
                'login': maintainer['login'],
                'id': maintainer['id'],
                'avatar_url': maintainer['avatar_url'],
                'html_url': maintainer['html_url']
            }
        members = pull_data(TEAM_MEMBERS.format(teams[i]['id'], 'member'))
        members = [member for member in members if member['login'] == 'aggiecodingclub']
        teams[i] = {
            'name': teams[i]['name'],
            'id': teams[i]['id'],
            'description': teams[i]['description'],
            'repos': teams[i]['repos'],
            'project_managers': maintainers,
            'members': members
        }
    organization_repos = pull_data(ORG_REPOS)
    club_data = {
        'teams': teams,
        'repos': organization_repos
    }

    pprint(club_data)
except HTTPError as e:
    print("There was an HTTP error scraping GitHub. Did you forget the API key?")
    print(e)
    raise e
