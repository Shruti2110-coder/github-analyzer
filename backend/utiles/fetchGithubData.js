const axios = require("axios");
require("dotenv").config();

const headers = {
  Authorization: `Bearer ${process.env.GITHUB_TOKEN}`
};


async function fetchGithubData(url) {
  const match = url.match(/github\.com\/([^\/]+)\/([^\/]+)/);
  if (!match) throw new Error("Invalid GitHub URL");

  const [_, owner, repo] = match;

  const repoRes = await axios.get(
    `https://api.github.com/repos/${owner}/${repo}`,
    { headers }
  );

  const commitsRes = await axios.get(
    `https://api.github.com/repos/${owner}/${repo}/commits`,
    { headers }
  );

  const readmeRes = await axios
    .get(`https://api.github.com/repos/${owner}/${repo}/readme`, { headers })
    .catch(() => null);

  return {
    name: repoRes.data.name,
    description: repoRes.data.description,
    stars: repoRes.data.stargazers_count,
    forks: repoRes.data.forks_count,
    language: repoRes.data.language,
    commits: commitsRes.data.length,
    readme: readmeRes ? true : false
  };
}

module.exports = { fetchGithubData };
