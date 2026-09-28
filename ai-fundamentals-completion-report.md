# AI Fundamentals quiz: AI-900 expansion

## Results

- AI-900 processed: **323 of 323** questions, numbered 1–323.
- AI-900 automatically scored text questions: **164** (133 single-answer MCQ, 31 multiple-select).
- AI-900 source-image questions requiring manual review: **159**. Their question and source answer areas remain available in the quiz; reveal the PDF answer and self-mark. The original format is recorded in `source_type` where identifiable. These are **not** represented as verified text answers.
- AI-900 verified text records: **163**. `AI-900-143` has text choices and an answer but no extractable source explanation, so it is also flagged. `AI-900-103` is already among the image-review items and also has no extractable explanation.
- Previous AI-901 bank retained: **50** questions; `AI-901-5` remains flagged for its inconsistent PDF answer.
- Total available in Both mode: **373** questions.

## Files

- Created: `quiz/data/ai-900.json`, `quiz/source-images/` (PDF answer areas), this report.
- Modified: `quiz/index.html`, `quiz/app.js`, `quiz/style.css`, `quiz/README.md`.
- Retained: `quiz/data/ai-901.json`.

## Decisions and remaining work

The source PDF has 159 answer areas that are image-only. Their answers cannot be reliably mapped into interactive text from extraction alone, so the quiz displays the original question/answer images and lets you self-mark them. The JSON stores image paths, not Base64. Every such item is marked `verified: false` with a review note. This preserves all questions for practice without silently fabricating answer mappings.

The source images are assigned by page position between numbered question headers; a final structural pass confirmed that all image-review questions have a source image. The next content pass should transcribe and visually verify these 159 items, replacing source-image review controls with their original Yes/No, dropdown, matching, or other input types one by one.

## Validation

Passed checks for 323 consecutive AI-900 numbers, 373 unique cross-bank IDs, six AI-900 category counts matching the PDF category table (179, 67, 38, 20, 10, 9), complete automatic answer mappings, existing image files, and JavaScript syntax. Local HTTP checks returned 200 for the HTML, JSON, and source images. Browser automation could not run because the runtime has no installed Chromium binary; test the published site interactively after upload.

## GitHub Pages update

In your `az901` repository, replace the files inside `quiz/` with the contents of the new `quiz/` folder, including `data/ai-900.json` and `source-images/`. Keep the same folder name. Your existing URL remains `https://jyong1101.github.io/az901/quiz/`. The image directory has hundreds of small files, so a Git client or GitHub Desktop may be easier than browser drag-and-drop.
