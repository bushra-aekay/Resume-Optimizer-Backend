import { optimizeResume, parseText } from "../services/aiService.js";

const tailorResume = async (req, res) => {
    const { resumeText, jdText } = req.body;
    const error = "Both text are required"
    if (!resumeText || !jdText){
         res.status(400).json({success: false, error:"Both text are required"})       
    }
    try {
        let structuredResumeText;
        structuredResumeText = await parseText(resumeText);
        const structuredResumeJSON = JSON.stringify(structuredResumeText);
        const comparisionResult = await optimizeResume(structuredResumeJSON, jdText);
        return res.status(200).json({
            success: true,
            ogStructuredData: structuredResumeText,
            tailoredResume: comparisionResult
        })
    } catch (error) {
        console.error(`Tailoring pipeline error:${error.message}`, error);
        const errorMessage = error.message.includes("parse")
            ? "Error parsing resume text."
            : "Error optimizing resume.";
        return res.status(500).json({
            error: errorMessage,
            details: error.message
        })
    }
}

const analyzeResume = async (req, res) => {
    const { resumeText } = req.body;
    const error = "No text provided"
    if (resumeText){
        try {
            const comparisionResult = await parseText(resumeText);
            return res.status(200).json({
                message: "Compared",
                data: comparisionResult
            })
        } catch (error) {
            console.error("errrr", error);
            return res.status(500).json({
                error: "comparision errors"
            })
        }        
    } else {
        res.status(400).json({error})
    }
}



export { tailorResume, analyzeResume };

