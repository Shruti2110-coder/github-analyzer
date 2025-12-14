import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState(null);

  const handleAnalyze = async () => {
    try {
      const res = await axios.post("http://localhost:5001/api/analyze", { url });
      setResult(res.data);
    } catch (err) {
      alert("Failed to analyze repo");
      console.error(err);
    }
  };

  return (
    <div style={{ padding: 50, fontFamily: "sans-serif" }}>
      <h2>Github Repo Analyzer</h2>
      <input
        type="text"
        placeholder="Enter Github repo url"
        value={url}
        onChange={e => setUrl(e.target.value)}
        style={{ width: 400, padding: 8 }}
      />
      <button onClick={handleAnalyze} style={{ marginLeft: 10, padding: 8 }}>
        Analyze
      </button>

      {result && (
        <div style={{ marginTop: 30 }}>
          <h3>Score: {result.score} / 100</h3>
          <p><strong>Summary:</strong> {result.summary}</p>
          <p><strong>Roadmap:</strong></p>
          <ul>
            {result.roadmap.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
