import mammoth from "mammoth";
import * as pdfjsLib from "pdfjs-dist";
import pdfWorkerSrc from "pdfjs-dist/build/pdf.worker.min.mjs?url";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorkerSrc;

export async function extractTextFromFile(file) {
  const fileType = file.name.split(".").pop().toLowerCase();

  if (fileType === "txt") {
    return await file.text();
  }

  if (fileType === "docx") {
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    return result.value;
  }

  if (fileType === "pdf") {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

    let fullText = "";

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      const text = content.items.map((item) => item.str).join(" ");
      fullText += text + "\n";
    }

    return fullText;
  }

  return "Unsupported file type. Please upload PDF, DOCX, or TXT file.";
}