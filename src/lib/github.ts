export interface GitHubRepo {
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  topics: string[];
  stargazers_count: number;
  language: string | null;
  forks_count: number;
  open_issues_count: number;
  created_at: string;
  updated_at: string;
  default_branch: string;
}

const headers: HeadersInit = {
  Accept: "application/vnd.github.v3+json",
  "User-Agent": "Portfolio-App",
};
const githubUsername = import.meta.env.GITHUB_USERNAME;

if (import.meta.env.GITHUB_TOKEN) {
  headers["Authorization"] = `Bearer ${import.meta.env.GITHUB_TOKEN}`;
}

export async function getGitHubRepos(): Promise<GitHubRepo[]> {
  try {
    const response = await fetch(
      `https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=10`,
      { headers }
    );

    if (!response.ok) {
      console.warn(`GitHub API warning: ${response.statusText}`);
      return [];
    }

    const repos = await response.json();
    return repos;
  } catch (error) {
    console.error("Error fetching GitHub repos:", error);
    return [];
  }
}

export async function getRepoReadme(repoName: string): Promise<string | null> {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${githubUsername}/${repoName}/readme`,
      { headers }
    );

    if (!response.ok) {
      return null;
    }

    const { content } = await response.json();
    return atob(content); // Decode base64 content
  } catch (error) {
    console.error("Error fetching README:", error);
    return null;
  }
}
