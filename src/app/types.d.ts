export interface IProfile {
  login?: string;
  id?: number;
  avatar_url?: string;
  html_url: string;
  name: string;
  public_repos: number;
  followers: number;
  following: number;
}

export interface IRepo {
  id: number;
  name: string;
  html_url: string;
  description: string;
}

export interface IOptions {
  loading: boolean;
}
