import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export async function analyzeResume(resumeText, jdText) {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
  });

  const prompt = `
You are an expert ATS resume analyzer and career mentor.

Compare the resume with the job description.

RESUME:
${resumeText}

JOB DESCRIPTION:
${jdText}

Give the result in this exact format:

1. ATS Match Score:
Give percentage and one-line reason.

2. Strong Matching Areas:
List skills, tools, projects, and experience that match the JD.

3. Missing Skills / Gaps:
List important missing keywords or skills from the JD.

4. Resume Improvement Suggestions:
Give clear bullet points to improve the resume.

5. Keywords to Add:
Give ATS-friendly keywords from the JD.

6. Improved Resume Bullet Points:
Rewrite 3 strong project bullet points suitable for this JD.

7. Interview Preparation Questions:
Give 5 likely interview questions based on the JD and resume.

8. Final Recommendation:
Tell whether the candidate is a weak, moderate, good, or strong fit.
Keep the language simple and professional.
`;

  const result = await model.generateContent(prompt);
  return result.response.text();
}