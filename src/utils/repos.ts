import { Repo } from "@/types/repo";

const url = "https://api.github.com/users/mad-maids/repos";

async function find(name: string) {
  let repos: Repo[] = [];

  await fetch(url)
    .then((r) => r.json())
    .then((data) => (repos = data));

  return repos.filter((repo) => repo.name.includes(name));
}

export { find };
