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

async function initializeClubData() {
    var clubData = {
        // "members": {},
        // "teams": {},
        // "projectManagers": {},
        // "officers": {},
        // "repos": {}
    };
    let cleanedUpTeams = [];
    let resolvedTeams = [];
    return getOrganizationMembers().then((members) => {
        let cleanedUpMembers = [];
        for (let member of members) {
            cleanedUpMembers.push({
                login: member['login'],
                avatar_url: member['avatar_url'],
                id: member['html_url'],
            })
        }
        clubData['members'] = cleanedUpMembers;
        return getOrganizationTeams();
    }).then((teams) => {
        let cleanedUpTeams = [];
        resolvedTeams = teams;
        let promises = [];
        for (let i = 0; i < teams.length; i++) {
            promises.push(getTeamMembers(teams[i]['id'], 'maintainer'))
        }
        return Promise.all(promises);
    }).then((members) => {
        for (let i = 0; i < members.length; i++) {
            members[i] = members[i].filter((member) => member['login'] !== 'aggiecodingclub');
            for (let member in members[i]) {
                member = {
                    login: member['login'],
                    id: member['id'],
                    avatar_url: member['avatar_url'],
                    html_url: member['html_url']

                }
            }
            cleanedUpTeams.push({
                name: resolvedTeams[i].name,
                id: resolvedTeams[i].id,
                description: resolvedTeams[i].description,
                "projectManager": members[i]
            })
        }
        clubData['teams'] = cleanedUpTeams
        return getOrganizationRepos();
    }).then((repos) => {
        clubData['repos'] = repos;
        _clubData = clubData;
        return clubData;
    })
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