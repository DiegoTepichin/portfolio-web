// Snapshots the public GitHub profile into src/data/github.json so every figure on the site
// is real and dated. Run with `npm run sync:github`. Set GITHUB_TOKEN to raise the rate limit.
import { writeFile } from 'node:fs/promises';

const USER = 'DiegoTepichin';
const API = 'https://api.github.com';
const OUT = new URL('../src/data/github.json', import.meta.url);

const headers = {
  Accept: 'application/vnd.github+json',
  'User-Agent': `${USER}-portfolio-sync`,
  ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
};

async function get(path) {
  const res = await fetch(`${API}${path}`, { headers });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} for ${path}`);
  return res;
}

// With per_page=1 the last page number in the Link header equals the commit count.
async function countCommits(repo) {
  const res = await get(`/repos/${USER}/${repo}/commits?per_page=1`);
  const last = res.headers.get('link')?.match(/[?&]page=(\d+)>; rel="last"/);
  return last ? Number(last[1]) : (await res.json()).length;
}

const profile = await (await get(`/users/${USER}`)).json();
const rawRepos = await (await get(`/users/${USER}/repos?per_page=100&sort=pushed`)).json();

const repos = [];
for (const repo of rawRepos.filter((r) => !r.fork)) {
  const [languages, commits] = await Promise.all([
    get(`/repos/${USER}/${repo.name}/languages`).then((r) => r.json()),
    countCommits(repo.name),
  ]);
  repos.push({
    name: repo.name,
    description: repo.description,
    url: repo.html_url,
    homepage: repo.homepage || null,
    language: repo.language,
    languages,
    topics: repo.topics,
    stars: repo.stargazers_count,
    commits,
    createdAt: repo.created_at,
    pushedAt: repo.pushed_at,
  });
}

const languageBytes = {};
for (const repo of repos) {
  for (const [name, bytes] of Object.entries(repo.languages)) {
    languageBytes[name] = (languageBytes[name] ?? 0) + bytes;
  }
}

const snapshot = {
  syncedAt: new Date().toISOString(),
  profile: {
    login: profile.login,
    name: profile.name,
    bio: profile.bio,
    company: profile.company,
    location: profile.location,
    blog: profile.blog,
    url: profile.html_url,
    publicRepos: profile.public_repos,
    createdAt: profile.created_at,
  },
  totals: {
    repos: repos.length,
    commits: repos.reduce((sum, r) => sum + r.commits, 0),
    stars: repos.reduce((sum, r) => sum + r.stars, 0),
    languageBytes: Object.fromEntries(Object.entries(languageBytes).sort((a, b) => b[1] - a[1])),
  },
  repos,
};

await writeFile(OUT, `${JSON.stringify(snapshot, null, 2)}\n`);
console.log(
  `Synced ${snapshot.totals.repos} repos, ${snapshot.totals.commits} commits → src/data/github.json`,
);
