const express = require("express");
const cors = require("cors");
const { fetchGithubData } = require("./utiles/fetchGithubData");
const { analyseRepo } = require("./utiles/analyseRepo");

const app = express();

// CORS
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

// API route
app.post("/api/analyze", async (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: "Repo URL is required" });

  try {
    const repoData = await fetchGithubData(url);
    const analysis = analyseRepo(repoData);
    res.json(analysis);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to analyze repo" });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
