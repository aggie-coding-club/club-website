export interface ProjectMember {
  profileURL: string;
  imageURL: string;
}

export interface ProjectData {
  repoURL: string;
  name: string;
  description?: string;
  type?: 'progress-oriented' | 'learning-oriented';
  tools?: string[];
  members?: ProjectMember[];
}
