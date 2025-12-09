const  compareTextSimilarity = (resumeText, jdText) => {
    const resumeWords = new Set(resumeText.toLowerCase().replace(/[^\w\s]/g, '').split(/\s+/));
    const jdWords = new Set(jdText.toLowerCase().replace(/[^\w\s]/g, '').split(/\s+/));
    const commonWords = new Set([...resumeWords].filter(word => jdWords.has(word)));
    const similarity = (commonWords.size / jdWords.size) * 100; // Percentage of JD words in resume
    return similarity.toFixed(2); // Return as a string with 2 decimal places
}

export { compareTextSimilarity };