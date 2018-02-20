const request = require('request');
const rp = require('request-promise');

const baseURL = 'https://api.github.com';
const { personal_access_token } = require('../../config');

let _clubData;


let options = {
    uri: baseURL,
    headers: {
        'User-Agent': 'Request-Promise',
        Authorization: `Bearer ${personal_access_token}`
    }
}

const getOrganizationMemebers = () => {
    options.uri = `${baseURL}/orgs/aggie-coding-club/members`;
    return rp(options).then((response) => JSON.parse(response));
}

const getOrganizationRepos = () => {
    options.uri = `${baseURL}/orgs/aggie-coding-club/repos`;
    return rp(options).then((response) => JSON.parse(response));
}

const getOrganizationTeams = () => {
    options.uri = `${baseURL}/orgs/aggie-coding-club/teams`;
    return rp(options).then((response) => JSON.parse(response));
}

const getTeamMembers = (id, role) => {
    options.uri = `${baseURL}/teams/${id}/members/${id}?role=${role ? role : 'all'}`;
    return rp(options).then((response) => JSON.parse(response));
}

const getTeamRepos = (teamId) => {
    options.uri = `${baseURL}/teams/${teamId}/repos`;
    return rp(options).then((response) => JSON.parse(response));
}

const followURL = (url) => {
    options.uri = url;
    return rp(options).then((response) => JSON.parse(response));
}

const pullClubData = async () => {
    let clubData = {
        // "teams": {},
        // "officers": {},
        // "repos": {}
    };
    let teams = await getOrganizationTeams();
    for (let i = 0; i < teams.length; i++) {
        repoInfo = await followURL(teams[i]['repositories_url']);
        repoData = []
        for (let repo of repoInfo) {
            if (!repo['private']) {
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
        for (let j = 0; j < maintainers.length; j++) {
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
                if (maintainer['login'] === member['login']) {
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
}

module.exports = {
    getOrganizationMemebers,
    getOrganizationRepos,
    getOrganizationTeams,
    getTeamMembers,
    getTeamRepos,
    pullClubData
};