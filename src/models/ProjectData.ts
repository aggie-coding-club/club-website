export interface ProjectMember {
    profileURL: string,
    imageURL: string
}

export interface ProjectData {
    repoURL: string,
    name: string,
    description?: string,
    tools?: string[],
    members?: ProjectMember[]
}