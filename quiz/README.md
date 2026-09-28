# AI Fundamentals practice quiz

Host this folder as a static site. Its `index.html` fetches JSON from `data/` using relative paths, so it works at a GitHub Pages URL such as `/az901/quiz/`. For local use, run `python3 -m http.server 8000` from this directory and open `http://localhost:8000/`.

## Banks

- AI-901: 50 normalized text questions, with one source answer flagged for review (`AI-901-5`).
- AI-900: 323 source questions. 164 have text choices and automatic scoring (163 verified; AI-900-143 lacks an explanation). 159 have image-based answer areas and use source image reveal plus self-marking. These are flagged until each answer area can be transcribed and verified manually. AI-900-103 also lacks an extractable explanation. Their original question types are recorded in `source_type`.
- Both mode includes all 373 questions. Category filtering follows the selected bank(s).

Progress is stored in your own browser. The app imports earlier AI-901 progress from its previous localStorage key. Reset affects the selected bank (or both banks in Both mode).

## Files

- `index.html`, `style.css`, `app.js`: interface and interactions.
- `data/ai-901.json`, `data/ai-900.json`: source questions and answers.
- `source-images/`: extracted AI-900 question and answer areas for questions whose text could not be mapped with confidence. No Base64 images are embedded in JSON.

The AI-900 PDF has six categories and 323 questions. The PDF's supplied answers are authoritative for this transcription; ambiguous source content is flagged rather than corrected from outside knowledge.
