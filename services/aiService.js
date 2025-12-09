import { GoogleGenAI } from "@google/genai";
import { RESUME_PARSER_SCHEMA } from "../utils/schema.js";

const getAiClient = () => {
    if (!process.env.GEMINI_API_KEY) {
        throw new Error("GEMINI_API_KEY is not set in the environment.");
    }
    return new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
};


export async function parseText(resumeText) {
        if (!resumeText || resumeText.length < 50) {
        throw new Error("Resume text is too short or empty for parsing.");
    }
    const prompt = `
        You are an expert, strict Resume Parser and Data Extractor. Your task is to analyze the provided raw RESUME TEXT, normalize all formatting, eliminate any noise (headers, footers, page numbers), and structure the content into a single, clean JSON object.

        This structured JSON output will be used as input for a subsequent AI model focused on optimizing the resume for an Applicant Tracking System (ATS).

        **CRITICAL INSTRUCTIONS FOR PARSING:**

        1.  **STRICT JSON OUTPUT:** Respond ONLY with a single, complete JSON object. Do NOT include any markdown (like \`\`\`json), commentary, or external text.
        2.  **Contact Info:** Extract Name, Email, Phone, and normalize all professional links (LinkedIn, GitHub, Portfolio) into the appropriate fields.
        3.  **Experience/Projects:** For all work and project entries, combine achievement bullet points into a clean, single string using a semicolon (;) as the separator.
        4.  **Skills:** Categorize all non-language skills into 'technical' and 'soft'. All spoken or programming languages (e.g., Spanish, Python) must be listed in their appropriate skill arrays (Soft or Technical), but also aggregated into the \`additionalInfo.languages\` array.
        5.  **Handling Unknown Sections:** If the resume contains sections that DO NOT fit into the predefined schema categories (e.g., 'Volunteer Work', 'Publications', 'Interests'), place the content of those sections into the \`unclassifiedSections\` array as objects with the original section title.

        ---
        [START RAW RESUME TEXT]
        ${resumeText}
        [END RAW RESUME TEXT]
        ---
        `;
    let aiResponseText;
    try {
        const ai =  getAiClient({});
        const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            responseMimeType: 'application/json',
            responseSchema: RESUME_PARSER_SCHEMA,
        }
        });
        aiResponseText = response.text;
    } catch (error) {
            console.error("AI Error during resume parsing:", error);
        throw new Error(`AI Failed to respond for resume parsing:${error.message}`);
    }
    try {
        const structuredData = JSON.parse(aiResponseText);
        return structuredData;
    } catch (error) {
        console.error("JSON Parsing Error in resumeParserService:", error);
        console.error("Failing Text:", aiResponseText); 
        throw new Error("Resume Parser failed to return valid structured JSON.");
    }    
}


export async function optimizeResume(resumeText, jdText) {
    if (!resumeText || !jdText) {
        throw new Error("Missing resume data or job description for optimization.");
    }
    const prompt = `You are an expert ATS (Applicant Tracking System) optimization and professional resume tailoring AI  Your goal is to rewrite the provided RESUME TEXT to align perfectly with the JOB DESCRIPTION for a high match score, passes the ATS and maximum appeal to hiring managers.
        Follow these steps precisely:
        1.  **IDENTIFY CORE KEYWORDS:** Analyze the JOB DESCRIPTION to extract the 5-7 most critical, non-trivial technical skills, technologies, and methodologies (e.g., 'Kubernetes', 'Agile Scrum', 'Python ETL').
        2.  **REVISE AND TAILOR:** Go through every bullet point of the provided RESUME TEXT. Rewrite each point to incorporate the identified CORE KEYWORDS and use action verbs, quantitative results, and industry-specific phrasing found in the JOB DESCRIPTION. Analyze the context to ensure relevance and authenticity. 
        Identify gaps where the resume can be enhanced to better fit the job description and make those improvements while maintaining honesty and integrity. Identify and eliminate any generic or vague statements, replacing them with specific achievements and metrics that demonstrate impact and value. 
        Identify missing keywords or skills the resume should include.
        3.  **STRICT OUTPUT FORMAT:**The final output MUST be a complete JSON object that strictly adheres to the schema provided in the input, containing ALL the revised data. DO NOT include any surrounding text, commentary, Markdown fences (\`\`\`json), or instructions. ONLY the raw JSON object itself.
        ---
        [START JOB DESCRIPTION]
        ${jdText}
        [END JOB DESCRIPTION]
        ---
        [START RESUME TEXT]
        ${resumeText}
        [END RESUME TEXT]`;
    let aiResponseText;
    try {
        const ai =  getAiClient({});
        const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            responseMimeType: 'application/json',
            responseSchema: RESUME_PARSER_SCHEMA,
            }
        });
        aiResponseText = response.text;
    } catch (error) {
        console.error("AI API Error during resume optimization:", error);
        throw new Error(`AI service failed to respond for optimization: ${error.message}`);
    }
    try {
        const structuredTailoredData = JSON.parse(aiResponseText);
        return structuredTailoredData;
    } catch (e) {
        console.error("JSON Parsing Error in resumeOptimizerService:", e);
        console.error("Failing Text:", aiResponseText); 
        throw new Error("Resume Optimizer failed to return valid structured JSON.");
    }
    return response.text;
}



// **STRICT OUTPUT SCHEMA:**
// {
// "summary": "The candidate's 3-4 sentence professional summary synthesized from the text.",
// "contactInfo": {
//     "name": "Full Name",
//     "phone": "Phone Number",
//     "email": "Professional Email Address",
//     "linkedin": "LinkedIn Profile URL (if present)",
//     "portfolio": "Portfolio or GitHub URL (if present)"
// },
// "experience": [
//     {
//     "title": "Job Title",
//     "company": "Company Name",
//     "duration": "Start Date - End Date (e.g., Jan 2020 - Present)",
//     "location": "City, State",
//     "bullets": "Achievement 1; Achievement 2; Achievement 3 (separated by semicolon)"
//     }
// ],
// "projects": [
//     {
//     "name": "Project Name",
//     "duration": "Dates or Status (e.g., 2024, In Progress)",
//     "description": "Brief description of the project goal and technologies used."
//     }
// ],
// "skills": {
//     "technical": ["Skill 1", "Skill 2", "Skill 3", "etc."],
//     "soft": ["Skill 1", "Skill 2", "etc."]
// },
// "certifications": [
//     {
//     "name": "Certification Name (e.g., AWS Certified Developer)",
//     "issuer": "Issuing Organization",
//     "date": "Completion/Expiration Date (if known)"
//     }
// ],
// "education": [
//     {
//     "institution": "University Name",
//     "degree": "Degree and Major",
//     "graduation": "Year or 'Expected Year'"
//     }
// ],
// "unclassifiedSections": [
//     {
//     "title": "Original Section Title (e.g., Volunteer Experience)",
//     "content": "The full text content from this section."
//     }
// ]
// }

// NOTE: This must be identical to RESUME_PARSER_SCHEMA to ensure the two AI calls use the same contract.
// const OPTIMIZER_SCHEMA = {
//     type: "object",
//     properties: {
//         summary: { type: "string", description: "A two-to-three sentence professional summary." },
        
//         contactInfo: { 
//             type: "object",
//             properties: { 
//                 name: { type: "string" },
//                 email: { type: "string" },
//                 phone: { type: "string" },
//                 linkedin: { type: "string", description: "LinkedIn URL." },
//                 github: { type: "string", description: "GitHub or Portfolio URL." }
//             },
//             required: ["name", "email"]
//         },
        
//         experience: { 
//             type: "array", 
//             description: "List of all work experience and projects.",
//             items: { 
//                 type: "object",
//                 properties: {
//                     title: { type: "string" },
//                     company: { type: "string" },
//                     duration: { type: "string", description: "Dates worked (e.g., 'Jan 2022 - Present')." },
//                     bullets: { 
//                         type: "string",
//                         description: "Semicolon-separated string of achievements/responsibilities."
//                     }
//                 },
//                 required: ["title", "company", "bullets"]
//             }
//         },
        
//         skills: { 
//             type: "object", 
//             description: "Categorized skills.",
//             properties: {
//                 technical: { 
//                     type: "array",
//                     description: "Programming languages, frameworks, tools, and platforms.",
//                     items: { type: "string" } 
//                 },
//                 soft: {
//                     type: "array",
//                     description: "Communication, leadership, teamwork, etc.",
//                     items: { type: "string" }
//                 }
//             },
//             required: ["technical", "soft"]
//         },
        
//         education: { 
//             type: "array", 
//             description: "List of academic achievements.",
//             items: { 
//                 type: "object",
//                 properties: {
//                     institution: { type: "string" },
//                     degree: { type: "string" },
//                     fieldOfStudy: { type: "string" },
//                     dates: { type: "string" },
//                     gpa: { type: "string", description: "Optional GPA or honors." } 
//                 },
//                 required: ["institution", "degree", "dates"]
//             }
//         },
        
//         unclassifiedSections: {
//             type: "array",
//             description: "Any resume sections that do not fit into the standard categories (e.g., 'References', 'Interests').",
//             items: { // *** THIS IS THE CRITICAL FIX FOR THE ERROR ***
//                 type: "object",
//                 properties: {
//                     sectionTitle: {
//                         type: "string",
//                         description: "The original title of the unclassified section."
//                     },
//                     content: {
//                         type: "string",
//                         description: "The raw content of this unclassified section."
//                     }
//                 },
//                 required: ["sectionTitle", "content"]
//             }
//         },
//     },
//     required: ["summary", "contactInfo", "experience", "skills", "education", "unclassifiedSections"], 
// };