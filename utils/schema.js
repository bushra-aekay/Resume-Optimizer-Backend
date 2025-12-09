export const RESUME_PARSER_SCHEMA = {
    type: "object",
    properties: {
        summary: { type: "string", description: "A two-to-three sentence professional summary." },
        
        contactInfo: { 
            type: "object",
            properties: { 
                name: { type: "string" },
                email: { type: "string" },
                phone: { type: "string" },
                linkedin: { type: "string", description: "LinkedIn URL." },
                github: { type: "string", description: "GitHub or Portfolio URL." }
            },
            required: ["name", "email"]
        },
        
        experience: { 
            type: "array", 
            description: "List of all work experience and projects.",
            items: { 
                type: "object",
                properties: {
                    title: { type: "string" },
                    company: { type: "string" },
                    duration: { type: "string", description: "Dates worked (e.g., 'Jan 2022 - Present')." },
                    bullets: { 
                        type: "string",
                        description: "Semicolon-separated string of achievements/responsibilities."
                    }
                },
                required: ["title", "company", "bullets"]
            }
        },
        
        skills: { 
            type: "object", 
            description: "Categorized skills.",
            properties: {
                technical: { 
                    type: "array",
                    description: "Programming languages, frameworks, tools, and platforms.",
                    items: { type: "string" } 
                },
                soft: {
                    type: "array",
                    description: "Communication, leadership, teamwork, etc.",
                    items: { type: "string" }
                }
            },
            required: ["technical", "soft"]
        },
        
        education: { 
            type: "array", 
            description: "List of academic achievements.",
            items: { 
                type: "object",
                properties: {
                    institution: { type: "string" },
                    degree: { type: "string" },
                    fieldOfStudy: { type: "string" },
                    dates: { type: "string" },
                    gpa: { type: "string", description: "Optional GPA or honors." } 
                },
                required: ["institution", "degree", "dates"]
            }
        },
        
        unclassifiedSections: {
            type: "array",
            description: "Any resume sections that do not fit into the standard categories (e.g., 'References', 'Interests').",
            items: { // *** THIS IS THE CRITICAL FIX FOR THE ERROR ***
                type: "object",
                properties: {
                    sectionTitle: {
                        type: "string",
                        description: "The original title of the unclassified section."
                    },
                    content: {
                        type: "string",
                        description: "The raw content of this unclassified section."
                    }
                },
                required: ["sectionTitle", "content"]
            }
        },
    },
    required: ["summary", "contactInfo", "experience", "skills", "education", "unclassifiedSections"], 
};
