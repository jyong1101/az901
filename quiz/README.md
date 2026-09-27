# AI-901 Practice Quiz

Run from this directory with `python3 -m http.server 8000`, then visit `http://localhost:8000/`.

A web server is needed because browsers usually block `fetch()` of local JSON files opened with `file://`.

- `data/ai-901.json`: 50 normalized questions, seven PDF categories, source answers, explanations, and review flags.
- `index.html`, `style.css`, `app.js`: quiz interface and behavior.
- Browser progress is saved locally under `ai-fundamentals:AI-901:v1`. Reset clears only AI-901 quiz progress.
- AI-900 and Both are intentionally disabled in this phase.

Question 5 preserves the PDF's supplied answer C and is marked for review because the wording and listed classes appear inconsistent. The PDF supplies no explanation for it. Image answer areas were converted into text and interactive controls; no Base64 question images are stored.

When adding AI-900 later, normalize its questions in a separate `data/ai-900.json`, add the bank to the loader, and scope saved progress to its question IDs. Validate the new bank independently against its source PDF.
