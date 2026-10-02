# INF2001 quiz — source review report

Both attached files are included unchanged. All supplied answers and marking guides are retained; no replacement answer was invented.

## Coverage

**34 questions, 70 source marks:** 18 single-answer MCQs, 6 multiple-select questions, 4 calculations, and 6 other written questions. The 10 calculation/written questions use self-assessment against the supplied marking guides. No images or image references occur in either file.

| Topic | Questions |
| --- | ---: |
| SE foundations & maintenance | 3 |
| Lifecycles & Agile | 5 |
| Requirements & stakeholders | 7 |
| Use case modeling | 4 |
| UML dynamic & class diagrams | 4 |
| Object-oriented analysis & design | 4 |
| Project management & estimation | 7 |

Topic groups are editorial navigation labels based on the question content, rather than an official syllabus mapping. Original question titles and source references remain available.

## Needs review

| Question | Issue | Website handling |
| --- | --- | --- |
| **Mock Quiz 1, Q1** | The stem asks how much more expensive maintenance is **than implementation**. Source answer **D** and the explanation use a requirements-phase baseline: implementation 30–52×; maintenance 200–368×. Comparing those phases instead gives roughly 3.85–12.27× across the stated ranges, so the intended option is unclear. | Key **D** and rationale preserved. Prominent review flag. Reports whether your selection matches the source key, but excludes the question from automatic accuracy and marks. Confirm the intended baseline/key with your lecturer. |
| **Mock Quiz 2, Q16** | The described `<<extend>>` arrows go from `Login` to `Borrow Book` / `Search Catalog`. The guide calls their direction inverted, yet also correctly states the direction is extending to base. Taking `Login` as the extending use case, those claims conflict. Whether login should instead be a precondition or mandatory included behavior is a separate issue. | Original guide preserved and flagged. Self-assessment only. Review the arrow-direction critique before awarding marks. |

Some statements are framed as strict lecture rules or empirical findings, including lifecycle prescriptions, stakeholder categories, and WBS duration/effort bounds. These were preserved as supplied. Lecture slides were not attached, so this report checks **source fidelity and internal consistency**, not whether all teaching claims match your lecturer or authoritative standards. Quiz 2's UCP notation (`UUW` and combined `UUCW`) is also kept exactly as supplied.

## Validation completed

- Checked all 34 question IDs, sequence numbers, question bodies, choice text/order, source keys, marking-guide text, topic references, and source hashes. Each file has 17 questions and 35 marks.
- Checked the six multiple-select keys and the no-partial-credit rule. Automatic grading uses exact set equality; selecting an extra or missing option earns zero.
- Converted the source's LaTeX subset to readable notation while retaining original Markdown. Reference tables and code blocks remain formatted.
- Recomputed the supplied FP, UCP, effort, PERT, elevator-button, and cost-range arithmetic. Numeric worked results are consistent with the given values.
- Checked JavaScript syntax and interaction logic using a DOM stub: choice grading, feedback, topic results, search, review flags, written self-assessment, saved drafts, reload restoration, reset cancellation/confirmation, corrupt storage recovery, and practice with unavailable storage.

**Verification limitation:** A live browser preview could not open in this environment, so visual appearance, mobile layout, keyboard behavior, and real-browser end-to-end interactions remain unverified. The ZIP contains the runnable static website and repeatable data/logic checks. No GitHub Pages deployment was performed.
