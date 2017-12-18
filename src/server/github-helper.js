var request = require('request');
var rp = require('request-promise-native');
const baseURL = 'https://api.github.com/'
const {
    personal_access_token
} = require('./config');
var _clubData;

function getOrganizationMembers() {
    let options = {
        uri: baseURL + 'orgs/aggie-coding-club/members',
        headers: {
            'User-Agent': 'Request-Promise',
            'Authorization': 'Bearer ' + personal_access_token
        }
    }
    return rp(options).then((response) => JSON.parse(response));
}

function getOrganizationRepos() {
    let options = {
        uri: baseURL + 'orgs/aggie-coding-club/repos',
        headers: {
            'User-Agent': 'Request-Promise',
            'Authorization': 'Bearer ' + personal_access_token
        }
    }
    return rp(options).then((response) => JSON.parse(response));
}

function getOrganizationTeams() {
    let options = {
        uri: baseURL + 'orgs/aggie-coding-club/teams',
        headers: {
            'User-Agent': 'Request-Promise',
            'Authorization': 'Bearer ' + personal_access_token
        }
    }
    return rp(options).then((response) => JSON.parse(response));
}

async function getTeamMembers(id, role) {
    let options = {
        uri: baseURL + 'teams/' + id + '/members' + '?role=' + (role ? role : 'all'),
        headers: {
            'User-Agent': 'Request-Promise',
            'Authorization': 'Bearer ' + personal_access_token
        }
    }
    return rp(options).then((response) => JSON.parse(response));
}

async function getTeamRepos(teamId) {
    let options = {
        uri: baseURL + 'teams/' + teamId + '/repos',
        headers: {
            'User-Agent': 'Request-Promise',
            'Authorization': 'Bearer ' + personal_access_token
        }
    }
    return rp(options).then((response) => JSON.parse(response));
}

async function followURL(url) {
    let options = {
        uri: url,
        headers: {
            'User-Agent': 'Request-Promise',
            'Authorization': 'Bearer ' + personal_access_token
        }
    }
    return rp(options).then((response) => JSON.parse(response));
}

async function initializeClubData() {
    var clubData = {
        // "teams": {},
        // "officers": {},
        // "repos": {}
    };
    teams = await getOrganizationTeams();
    for (let i = 0; i < teams.length; i++)  {
        repoInfo = await followURL(teams[i]['repositories_url']);
        repoData = []
        for (let repo of repoInfo)  {
            if (!repo['private'])   {
                languageInformation = await followURL(repo['languages_url']);
                repoData.push({
                    name: repo['name'],
                    html_url: repo['html_url'],
                    languages: languageInformation,
                    description: repo['description'],
                    stars: repo['stargazers_count'],
                    forks: repo['forks_count'],
                    watchers: repo['watchers']
                });
            }
        }
        teams[i]['repos'] = repoData;
        let maintainers = await getTeamMembers(teams[i]['id'], 'maintainer');
        maintainers = maintainers.filter((maintainer) => maintainer['login'] !== 'aggiecodingclub');
        for (let j = 0; j < maintainers.length; j++)    {
            maintainers[j] = {
                login: maintainers[j]['login'],
                id: maintainers[j]['id'],
                avatar_url: maintainers[j]['avatar_url'],
                html_url: maintainers[j]['html_url']
            }
        }
        let members = await getTeamMembers(teams[i]['id']);
        members = members.filter((member) => {
            if (member['login'] === 'aggiecodingclub') return false;
            for (let maintainer of maintainers) {
                if (maintainer['login'] === member['login'])    {
                    return false;
                }
            }
            return true;
        });
        teams[i] = {
            name: teams[i].name,
            id: teams[i].id,
            description: teams[i].description,
            repos: teams[i]['repos'],
            projectManagers: maintainers,
            'members': members
        }
    }
    let organizationRepos = await getOrganizationRepos();
    clubData['teams'] = teams;
    clubData['repos'] = organizationRepos;
    _clubData = clubData;
    return clubData;
    console.log(JSON.stringify(teams, null, 3));
}
module.exports = {
    getOrganizationMembers,
    getOrganizationRepos,
    getOrganizationTeams,
    initializeClubData,
    getClubData: function () {
        return _clubData;
    }
}
