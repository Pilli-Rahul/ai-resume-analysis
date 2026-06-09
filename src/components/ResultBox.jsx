function ResultBox({ result }) {
  return (
    <div className="result-box">
      <h2>Analysis Result</h2>
      <pre>{result}</pre>
    </div>
  );
}

export default ResultBox;
