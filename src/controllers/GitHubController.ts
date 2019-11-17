import ProjectData, { ProjectMember } from '../models/ProjectData';
import * as Octokit from "@octokit/rest";

const octokit = new Octokit({auth: "38180c172fc048251613e7a1c527cc623c9c8bda"});

export default class GitHubControler {
    constructor() {

    }

    getProjectData(): Promise<ProjectData[]> {
        // TODO: call octokit and format data to be like the model.
        return octokit.repos
            .listForOrg({
                org: "aggie-coding-club",
                type: "public"
            })
            .then(({ data }) => {
                let projectList: ProjectData[] = [];

                for (let repo of data) {
                    let project: ProjectData = {
                        repoURL: repo.html_url,
                        name: repo.name,
                        description: repo.description
                    };
                    projectList.push(project);
                }

                return projectList;
            }).then(projectList => {
                let apiCalls = [];
                for (const i in projectList) {
                    apiCalls.push(octokit.repos.listTopics({
                        owner: "aggie-coding-club",
                        repo: projectList[i].name
                    }).then(( { data } ) => {
                        let tools: string[] = [];
                        for(let topic of data.names) {
                            tools.push(topic);
                        }
                        projectList[i].tools = tools
                    }));
                }
                return Promise.all(apiCalls).then(_ => projectList);
            }).then(projectList => {
                let apiCalls = [];
                for (const i in projectList) {
                    apiCalls.push(octokit.repos.listContributors({
                        owner: "aggie-coding-club",
                        repo: projectList[i].name
                    }).then(( { data } ) => {
                        let members: ProjectMember[] = [];
                        for(let contributor of data) {
                            members.push({ 
                                profileURL: contributor.html_url, 
                                imageURL: contributor.avatar_url
                            } as ProjectMember);
                        }
                        projectList[i].members = members
                    }));
                }
                return Promise.all(apiCalls).then(_ => projectList);
            });
    }
}