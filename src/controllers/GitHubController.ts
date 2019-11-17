import ProjectData from '../models/ProjectData';

export default class GitHubControler {
    constructor() {

    }

    getProjectData(): Promise<ProjectData[]> {
        // TODO: call octokit and format data to be like the model.
        return Promise.resolve([{
            repoURL: "",
            name: "",
            disc: "",
            tools: [""],
            members: [
                {
                    profileURL: "",
                    imageURL: ""
                }
            ]
        } as ProjectData])
    }
}