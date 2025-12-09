/** 
 * @param {string} text - the raw text rcvd from AI
 * @returns {string} - cleaned raw json string*/

export const cleanAIResponse = (text) => {
    if(!text) return '';
    //Remove markdown backticks from start and end
    let cleaned = text.trim();
    //remove start wrapper
    if (cleaned.startsWith('```')) {
        //find the first new line after ```
        const firstNewLineIndex = cleaned.indexOf('\n');
        if (firstNewLineIndex !== -1) {
            cleaned = cleaned.substring(firstNewLineIndex + 1);
        }else{
            //if no new line, js remove the first ```
            cleaned = cleaned.substring(3);
        }
        //remoce json or js if its still present at the start
        if (cleaned.toLowerCase().startsWith('json') ||cleaned.toLowerCase().startsWith('javascript') ) {
            cleaned = cleaned.substring(cleaned.toLowerCase().startsWith('json') ? 4 : 10);
        }
    }

    //remove end wrapper
    if (cleaned.endsWith('```')) {
        cleaned = cleaned.substring(0, cleaned.length - 3);
    }

    return cleaned.trim();
}