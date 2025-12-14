function analyseRepo(data) {
  let score = 0;
  const roadmap = [];

  if (data.commits > 20) score += 30;
  else roadmap.push("Commit more frequently");

  if (data.readme) score += 30;
  else roadmap.push("Add a detailed README.md");

  if (data.language) score += 20;
  else roadmap.push("Choose a main programming language");

  if (data.stars + data.forks > 5) score += 20;
  else roadmap.push("Promote your project to get more engagement");

  const summary = `Repo "${data.name}" has ${data.commits} commits, ${data.stars} stars, and README ${data.readme ? "exists" : "missing"}.`;

  return { score, summary, roadmap };
}

module.exports = { analyseRepo };
