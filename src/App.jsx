import { useState } from "react";
import "./App.css";
import FileUpload from "./components/FileUpload";
import ResultBox from "./components/ResultBox";
import { analyzeResume } from "./utils/gemini";

function App() {
  const [resumeText, setResumeText] = useState("");
  const [jdText, setJdText] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!resumeText || !jdText) {
      alert("Please upload or paste both resume and job description.");
      return;
    }

    try {
      setLoading(true);
      setResult("");
      const analysis = await analyzeResume(resumeText, jdText);
      setResult(analysis);
    } catch (error) {
      console.error(error);
      setResult(error.message);
    } finally {
      setLoading(false);
    }
  };
  const handleClear = () => {
  setResumeText("");
  setJdText("");
  setResult("");
};

const handleDownload = () => {
  const blob = new Blob([result], { type: "text/plain" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "resume-analysis-report.txt";
  a.click();

  URL.revokeObjectURL(url);
};

  return (
    <div className="app">
      <div className="hero">
        <p className="eyebrow">ATS Resume Review</p>
        <h1>AI Resume Analyzer</h1>
        <p className="subtitle">
          Upload or paste your resume and job description to get ATS-based suggestions.
        </p>
      </div>

      <div className="container">
        <div className="card">
          <h2>Resume</h2>
          <FileUpload label="Upload Resume" setText={setResumeText} />
          <textarea
            placeholder="Paste your resume text here..."
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
          />
        </div>

        <div className="card">
          <h2>Job Description</h2>
          <FileUpload label="Upload JD" setText={setJdText} />
          <textarea
            placeholder="Paste job description here..."
            value={jdText}
            onChange={(e) => setJdText(e.target.value)}
          />
        </div>
      </div>

      <button onClick={handleAnalyze} disabled={loading}>
        {loading ? "Analyzing..." : "Analyze Resume"}
      </button>
    <button onClick={handleClear} className="clear-btn">
         Clear
    </button>

    {result && (
    <button onClick={handleDownload} className="download-btn">
        Download Report
    </button>
)}
      {result && <ResultBox result={result} />}
    </div>
  );
}

export default App;
