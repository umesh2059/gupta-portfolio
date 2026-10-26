import { useQuery } from "@tanstack/react-query";

export type GitHubUser = {
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
};

export type GitHubRepo = {
  name: string;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  fork: boolean;
  pushed_at: string;
};

const fetchJson = async <T,>(url: string): Promise<T> => {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`GitHub API ${res.status}`);
  return res.json();
};

const STALE = 1000 * 60 * 30;

export const useGitHubUser = (username: string) =>
  useQuery({
    queryKey: ["gh-user", username],
    queryFn: () => fetchJson<GitHubUser>(`https://api.github.com/users/${username}`),
    staleTime: STALE,
    retry: 1,
  });

export const useGitHubRepos = (username: string) =>
  useQuery({
    queryKey: ["gh-repos", username],
    queryFn: () =>
      fetchJson<GitHubRepo[]>(
        `https://api.github.com/users/${username}/repos?per_page=100&sort=pushed`
      ),
    staleTime: STALE,
    retry: 1,
  });
