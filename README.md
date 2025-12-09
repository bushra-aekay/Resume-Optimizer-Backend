# ResumeOptimizer — Backend

Lightweight Express backend for parsing and tailoring resumes using Google Gemini AI.

## Quick overview
- Technology: Node.js (ESM), Express, @google/genai (Gemini), CORS, dotenv.
- Purpose: parse raw resume text and job descriptions, call AI services, and return structured/tailored JSON used by the frontend.

## Prerequisites
- Node.js 16+ (LTS recommended)
- npm
- Google Gemini API credentials (or other configured AI key)

## Install & run (Windows)
1. Open terminal in this folder:
   npm install

2. Create a `.env` file in the backend folder with at least:
   GEMINI_API_KEY=your_gemini_api_key
   PORT=5000

3. Run in development:
   npm run dev
   Or production:
   npm start

## Available npm scripts
- npm run dev — start with nodemon (auto-reload)
- npm start — run node index.js

## Important environment variables
- GEMINI_API_KEY — required to call the Google Gemini API (or equivalent)
- PORT — optional, defaults to whatever index.js uses (commonly 5000)

## API endpoints (typical)
- POST /api/resume/analyze
  - Body: { resumeText, jdText }
  - Returns: parsed + tailored resume JSON
- POST /api/resume/parse
  - Body: { resumeText }
  - Returns: parsed resume JSON

(Confirm endpoints by inspecting `index.js` and route files.)

## Project layout (typical)
- index.js — entry point, sets up Express, middleware and routes
- routes/ — Express route definitions
- controllers/ — controller functions that call service layer
- services/ — AI integration (Gemini) and parsing/optimization logic
- utils/ — helpers (schema, cleaning, logging)

## Troubleshooting
- CORS errors: ensure frontend `VITE_API_BASE_URL` matches backend origin and backend enables CORS.
- AI errors / non-JSON responses: check logs from the AI service wrapper; sanitize raw responses before parsing.
- "Could not reach backend": verify PORT, firewall, and that the server started without errors.

## Notes
- Keep the GEMINI_API_KEY secret; do not commit `.env`.
- Adjust logging for development vs production.
- Add unit tests and request validation (e.g., express-validator) for improved robustness.

```// filepath: c:\Users\arhsu\OneDrive\Desktop\Projects\ResumeOptimizer\backend\README.md
# ResumeOptimizer — Backend

Lightweight Express backend for parsing and tailoring resumes using Google Gemini AI.

## Quick overview
- Technology: Node.js (ESM), Express, @google/genai (Gemini), CORS, dotenv.
- Purpose: parse raw resume text and job descriptions, call AI services, and return structured/tailored JSON used by the frontend.

## Prerequisites
- Node.js 16+ (LTS recommended)
- npm
- Google Gemini API credentials (or other configured AI key)

## Install & run (Windows)
1. Open terminal in this folder:
   npm install

2. Create a `.env` file in the backend folder with at least:
   GEMINI_API_KEY=your_gemini_api_key
   PORT=5000

3. Run in development:
   npm run dev
   Or production:
   npm start

## Available npm scripts
- npm run dev — start with nodemon (auto-reload)
- npm start — run node index.js

## Important environment variables
- GEMINI_API_KEY — required to call the Google Gemini API (or equivalent)
- PORT — optional, defaults to whatever index.js uses (commonly 5000)

## API endpoints (typical)
- POST /api/resume/analyze
  - Body: { resumeText, jdText }
  - Returns: parsed + tailored resume JSON
- POST /api/resume/parse
  - Body: { resumeText }
  - Returns: parsed resume JSON

(Confirm endpoints by inspecting `index.js` and route files.)

## Project layout (typical)
- index.js — entry point, sets up Express, middleware and routes
- routes/ — Express route definitions
- controllers/ — controller functions that call service layer
- services/ — AI integration (Gemini) and parsing/optimization logic
- utils/ — helpers (schema, cleaning, logging)

## Troubleshooting
- CORS errors: ensure frontend `VITE_API_BASE_URL` matches backend origin and backend enables CORS.
- AI errors / non-JSON responses: check logs from the AI service wrapper; sanitize raw responses before parsing.
- "Could not reach backend": verify PORT, firewall, and that the server started without errors.

## Notes
- Keep the GEMINI_API_KEY secret; do not commit `.env`.
- Adjust logging for development vs production.
- Add unit tests and request validation (e.g., express-validator) for improved robustness.
