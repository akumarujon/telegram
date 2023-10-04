export interface Repo {
    id: string;
    name: string;
    description: string;
    html_url: string;
    stargazers_count: string;
    language: string;
    forks: string;
    open_issues: string;
    topics: string[] | undefined;
  }