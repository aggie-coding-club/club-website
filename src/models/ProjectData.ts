export default interface ProjectData {
    repoURL: string,
    name: string,
    disc: string,
    tools: [string],
    members: [
        {
            profileURL: string,
            imageURL: string
        }
    ]
}