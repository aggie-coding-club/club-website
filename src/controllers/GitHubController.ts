import { ProjectData, ProjectMember } from '../models/ProjectData';
import * as Octokit from '@octokit/rest';

type RepoType = 'public' | 'private' | 'forks' | 'all';

/**
 * Controller for all GitHub data
 */
export class GitHubController {
  org: string;
  octokit: Octokit;

  constructor(octokit: Octokit, org?: string) {
    this.org = org || 'aggie-coding-club';
    this.octokit = octokit;
  }

  /**
   * Returns a list of projects belonging to this organization.
   *
   * @param repoType - Type of the repos to fetch (public, private, forks, or all)
   * @returns a list of projects belonging to this organization.
   */
  async getAllProjects(repoType?: RepoType): Promise<ProjectData[]> {
    const reposResponse = await this.octokit.repos.listForOrg({
      org: this.org,
      type: repoType || 'public',
    });

    const repos = reposResponse.data;
    const projectList: ProjectData[] = [];

    for (const repo of repos) {
      const project: ProjectData = {
        repoURL: repo.html_url,
        name: repo.name,
        description: repo.description,
      };
      projectList.push(project);
    }

    const apiCalls = [];

    for (let i = 0; i < projectList.length; ++i) {
      // Get tools used for each repo
      apiCalls.push(
        this.getProjectTopics(projectList[i].name).then(tools => {
          for(let i = 0; i < tools.length; i++){
            if(tools[i] == ("progress-oriented")){
              projectList[i].type = "progress-oriented";
              tools.splice(i,1);  
              break;
            } else if (tools[i] == "learning-oriented") {
              projectList[i].type = "learning-oriented";
              tools.splice(i,1);  
              break;
            }
          }
          projectList[i].tools = tools;
        })
      );
      // Get contributors for each repo
      apiCalls.push(
        this.getProjectContributors(projectList[i].name).then(members => {
          projectList[i].members = members;
        })
      );
    }

    // get all contributors and tools asynchronously
    await Promise.all(apiCalls);

    return projectList;
  }

  /**
   * Returns a list of topics for the repository
   *
   * @param projectName - Name of the repository (belonging to the org)
   * @returns a list of topics
   */
  async getProjectTopics(projectName: string): Promise<string[]> {
    const topicsResponse = await this.octokit.repos.listTopics({
      owner: this.org,
      repo: projectName,
    });

    const topics = topicsResponse.data;
    return topics.names;
  }

  /**
   * Returns a list of project contributors for the repository
   *
   * @param projectName - Name of the repository (belonging to the org)
   * @returns a list of project contributors
   */
  async getProjectContributors(projectName: string): Promise<ProjectMember[]> {
    const contributorsResponse = await this.octokit.repos.listContributors({
      owner: this.org,
      repo: projectName,
    });

    const contributors = contributorsResponse.data;
    const members: ProjectMember[] = [];

    for (const contributor of contributors) {
      members.push({
        profileURL: contributor.html_url,
        imageURL: contributor.avatar_url,
      } as ProjectMember);
    }

    return members;
  }

  /** 
   * returns a list of projects with specified types to filter through 
   * 
   * @param type - which type of project is it to filter
   * @param list - list of project data
   * @returns a list of projects with the specified types
   */
  filterProjects(type:"progress-oriented" | "learning-oriented", list: ProjectData[]){
    let projectArr = [];
    for(let i = 0; i < list.length; i++){
      if(list[i].type == type ){
        projectArr.push(list[i]);
      }
    }
    return projectArr;
  }
}
