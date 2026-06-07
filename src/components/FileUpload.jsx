import { useRef, useState } from "react";
import { extractTextFromFile } from "../utils/extractText";

function FileUpload({ label, setText }) {
  const [fileName, setFileName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const inputRef = useRef(null);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFileName(file.name);
    setErrorMessage("");

    try {
      const text = await extractTextFromFile(file);
      setText(text);
    } catch (error) {
      console.error(error);
      setErrorMessage("File reading failed. Please paste text manually.");
    }
  };

  return (
    <div className="upload-box">
      <div className="upload-head">
        <label>{label}</label>
        <button
          type="button"
          className="upload-plus"
          onClick={() => inputRef.current?.click()}
          aria-label={`Upload ${label}`}
        >
          <span>+</span>
        </button>
      </div>
      {errorMessage && <p className="upload-error">{errorMessage}</p>}
      <input
        ref={inputRef}
        type="file"
        accept=".txt,.docx,.pdf"
        onChange={handleFileChange}
        className="hidden-input"
      />
      <p className="upload-hint">Click the plus icon to import a file or paste text below.</p>
      {fileName && <p className="file-name">Uploaded: {fileName}</p>}
    </div>
  );
}

export default FileUpload;