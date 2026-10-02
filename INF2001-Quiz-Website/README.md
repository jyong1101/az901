# INF2001 practice quiz

A static question practice website based on **Mock Quiz 1.md** and **Mock Quiz 2.md**. No installation or build step is needed to use or host it.

## Start practising

Extract the ZIP, then open `index.html` in a browser. Keep all folders together. Choose **All topics** or a topic, select an answer, and submit. Multiple-select questions require an exact match with the source key: no partial credit. Written and calculation questions reveal the original marking guide after you submit your working; record your own marks, including fractional marks where appropriate.

Use the navigator, search box, quiz selector, and status filter to find questions. **View results** shows latest scores by topic and submission history. **Try again** clears the current answer while retaining previous attempts. The history lists previous outcomes; clicking one opens that question for further practice.

Progress and drafts save automatically in this browser using localStorage. They are specific to the site address and browser profile. Private browsing, disabled storage, clearing browser data, or changing the site address can remove or separate progress. Opening a local file may handle storage differently between browsers; GitHub Pages gives a consistent site origin. An on-screen warning appears if storage is unavailable. **Export progress** downloads a JSON record of your drafts, submissions, and marks; this version does not import that backup.

## Host on GitHub Pages

1. Put the contents of this folder in a GitHub repository, with `index.html` at the repository root. Upload the actual extracted files, not the ZIP.
2. Configure GitHub Pages to publish that branch's root folder. You can use the repository's **Settings → Pages** controls.
3. Open the Pages address provided by GitHub. Relative asset paths support both project pages and custom domains.

The files work on any static web host. There are no external CDNs, API keys, fonts, or network services. Markdown rendering is bundled locally with its license.

## Files

| File | Purpose |
| --- | --- |
| `index.html` | Page structure and accessible controls |
| `styles.css` | Desktop and mobile styles |
| `app.js` | Filtering, navigation, marking, results, and saved progress |
| `data/question-data.js` | Browser-loadable question data; also works without fetch when opened locally |
| `data/questions.json` | Same data in editable JSON format |
| `sources/` | Both unchanged question bank files |
| `REVIEW.md` | Source issues, coverage, and validation limitations |
| `vendor/` | Locally bundled Marked renderer and MIT license |
| `tools/build_data.py` | Rebuild question data from the supplied sources |
| `tools/validate_data.py` | Check extracted content against source text and worked calculations |
| `tools/check_logic.cjs` | Interaction checks with a DOM stub; does not test visual layout |

## Source review and updates

**Read REVIEW.md before using the flagged questions for revision.** The application preserves the supplied keys and explanations; it does not replace them with guessed answers. The disputed key in Quiz 1 Q1 is excluded from automatic accuracy and marks. Written questions are explicitly self-assessed, including flagged Quiz 2 Q16.

To make a source correction, first confirm it with your lecturer or lecture notes, edit the relevant file in `sources/`, then update the corresponding `FLAGS` entry in `tools/build_data.py`. Run:

```sh
python3 tools/build_data.py
python3 tools/validate_data.py
node tools/check_logic.cjs
```

The extractor is tailored to these two 17-question files and their current Markdown syntax. Adding questions or changing the source format also requires updating its topic mapping and validation expectations. If source hashes change, the app starts fresh rather than grading old submissions against new keys. Export your results before replacing question data.

This is a personal practice tool: the correct keys are in the downloadable files and can be inspected. It is not a secure examination platform.
