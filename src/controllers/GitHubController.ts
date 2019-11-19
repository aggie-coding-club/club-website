import ProjectData, { ProjectMember } from '../models/ProjectData';
import * as Octokit from "@octokit/rest";

type RepoType = "public" | "private" | "forks" | "all";

export default class GitHubControler {
    org: string;
    type: RepoType;
    octokit: Octokit;

    constructor(authToken: string, org?: string, type?: RepoType) {
        this.org = org || "aggie-coding-club";
        this.type = type || "public";
        
        this.octokit = new Octokit({auth: authToken});
    }
    
    getProjectData(): Promise<ProjectData[]> {
        return this.octokit.repos
            .listForOrg({
                org: this.org,
                type: this.type
            })
            .then((reposResponse) => {
                const repos = reposResponse.data;
                let projectList: ProjectData[] = [];

                for (let repo of repos) {
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
                    // Get tools used for each repo
                    apiCalls.push(this.octokit.repos.listTopics({
                        owner: this.org,
                        repo: projectList[i].name
                    }).then((topicsResponse) => {
                        const topics = topicsResponse.data;
                        let tools: string[] = [];
                        for(let topic of topics.names) {
                            tools.push(topic);
                        }
                        projectList[i].tools = tools
                    }));

                    // Get contributors of each repo
                    apiCalls.push(this.octokit.repos.listContributors({
                        owner: this.org,
                        repo: projectList[i].name
                    }).then((contributorsResponse) => {
                        let contributors = contributorsResponse.data;
                        let members: ProjectMember[] = [];
                        for(let contributor of contributors) {
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