import { ProjectData, ProjectMember } from '../models/ProjectData';
import * as Octokit from "@octokit/rest";

type RepoType = "public" | "private" | "forks" | "all";

/**
 * Controller for all GitHub data
 */
export default class GitHubControler {
    org: string;
    octokit: Octokit;

    
    constructor(octokit: Octokit, org?: string) {
        this.org = org || "aggie-coding-club";        
        this.octokit = octokit;
    }
    

    /**
     * Returns a list of projects belonging to this organization.
     * 
     * @param repoType - Type of the repos to fetch (public, private, forks, or all)
     * @returns a list of projects belonging to this organization.
     */
    getAllProjects(repoType?: RepoType): Promise<ProjectData[]> {
        return this.octokit.repos
            .listForOrg({
                org: this.org,
                type: repoType || "public"
            })
            .then((reposResponse) => {
                const repos = reposResponse.data;
                const projectList: ProjectData[] = [];

                for (const repo of repos) {
                    const project: ProjectData = {
                        repoURL: repo.html_url,
                        name: repo.name,
                        description: repo.description
                    };
                    projectList.push(project);
                }

                return projectList;
            }).then(projectList => {
                const apiCalls = [];

                for (let i = 0; i < projectList.length; ++i) {
                    // Get tools used for each repo
                    apiCalls.push(this.getProjectTopics(projectList[i].name).then(tools => {
                        projectList[i].tools = tools;
                    }));

                    // Get contributors of each repo
                    apiCalls.push(this.getProjectContributors(projectList[i].name).then(members => {
                        projectList[i].members = members;
                    }));
                }

                return Promise.all(apiCalls).then(_ => projectList);
            });
    }


    /**
     * Returns a list of topics for the repository
     * 
     * @param projectName - Name of the repository (belonging to the org)
     * @returns a list of topics
     */
    getProjectTopics(projectName: string): Promise<string[]> {
        return this.octokit.repos.listTopics({
            owner: this.org,
            repo: projectName
        }).then((topicsResponse) => {
            const topics = topicsResponse.data;
            const tools: string[] = [];
            for(const topic of topics.names) {
                tools.push(topic);
            }
            return tools;
        })
    }


    /**
     * Returns a list of project contributors for the repository
     * 
     * @param projectName - Name of the repository (belonging to the org)
     * @returns a list of project contributors
     */
    getProjectContributors(projectName: string): Promise<ProjectMember[]> {
        return this.octokit.repos.listContributors({
            owner: this.org,
            repo: projectName
        }).then((contributorsResponse) => {
            const contributors = contributorsResponse.data;
            const members: ProjectMember[] = [];
            for(const contributor of contributors) {
                members.push({ 
                    profileURL: contributor.html_url, 
                    imageURL: contributor.avatar_url
                } as ProjectMember);
            }
            return members;
        })
    }
}