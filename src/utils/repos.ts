const url = "https://api.github.com/users/mad-maids/repos";

async function find(name: string) {
  let repos;

  const response = await fetch(url)
    .then((r) => r.json())
    .then((data) => (repos = data));

  return await repos.filter((repo) => repo.name.includes(name));
}

export { find };
