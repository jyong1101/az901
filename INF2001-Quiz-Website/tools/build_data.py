"""Extract supplied banks without inventing answers. Run from any directory."""
import hashlib
import json
import re
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
TOPICS = {
    "foundations": "SE foundations & maintenance",
    "lifecycles": "Lifecycles & Agile",
    "requirements": "Requirements & stakeholders",
    "usecases": "Use case modeling",
    "uml": "UML dynamic & class diagrams",
    "ood": "Object-oriented analysis & design",
    "estimation": "Project management & estimation",
}
MAP = {
    1: ["foundations", "foundations", "lifecycles", "lifecycles", "lifecycles", "requirements", "requirements", "requirements", "usecases", "usecases", "ood", "uml", "estimation", "estimation", "ood", "requirements", "uml"],
    2: ["foundations", "lifecycles", "lifecycles", "requirements", "requirements", "requirements", "usecases", "uml", "ood", "uml", "estimation", "estimation", "estimation", "estimation", "estimation", "usecases", "ood"],
}
FLAGS = {
    "mq1-q1": {
        "summary": "The cost comparison in the question differs from the explanation's baseline.",
        "detail": "The question compares maintenance with implementation, but the source key D uses the 200–368× requirements baseline. Its rationale lists implementation at 30–52× and maintenance at 200–368×. Those ranges imply roughly 3.85–12.27× when comparing the two phases; the intended choice is unclear. Source answer D is preserved, but this question is excluded from automatic accuracy and marks until reviewed.",
        "excludeFromScore": True,
    },
    "mq2-q16": {
        "summary": "The source marking guide contradicts the described extend-arrow direction.",
        "detail": "The question describes arrows from Login to Borrow Book/Search Catalog. The marking guide calls the direction inverted while also saying extend goes from extending to base. With Login as the extending use case, the described direction already follows that rule. The critique of mandatory authentication is a separate issue. The source guide is preserved; review the arrow-direction claim before self-assessing.",
        "excludeFromScore": False,
    },
}

def readable_math(text):
    # The source uses only this small, audited LaTeX subset. Preserve raw Markdown too.
    def convert(match):
        s = match.group(1)
        s = s.replace(r"\$", "CURRENCY_DOLLAR")
        for _ in range(10):
            s = re.sub(r"\\(?:text|mathbf)\{([^{}]*)\}", r"\1", s)
            s = re.sub(r"\\frac\{([^{}]*)\}\{([^{}]*)\}", r"(\1) / (\2)", s)
        s = s.replace(r"\times", "×").replace(r"\rightarrow", "→").replace(r"\theta", "θ").replace(r"\le", "≤").replace(r"\quad", " ")
        s = re.sub(r"_\{([^{}]+)\}", r"_\1", s)
        s = s.replace("CURRENCY_DOLLAR", "$")
        assert not re.search(r"\\[A-Za-z]+", s), f"Unsupported math: {s}"
        return s.strip()
    # Replace display math first; match an escaped currency dollar inside a math span.
    text = re.sub(r"\$\$([\s\S]*?)\$\$", convert, text)
    text = re.sub(r"\$((?:\\\$|[^$])+?)\$", convert, text)
    return text

def blocks(text):
    headings = list(re.finditer(r"^#### Question (\d+)([^\n]*)\n", text, re.M))
    out = {}
    for i, h in enumerate(headings):
        body = text[h.end():headings[i+1].start() if i+1 < len(headings) else len(text)]
        # Subsequent section headings are metadata, not part of the question or solution.
        body = re.split(r"^#{1,3} ", body, maxsplit=1, flags=re.M)[0]
        body = re.sub(r"(?:\n\s*---\s*)+$", "", body).strip()
        n = int(h.group(1))
        assert n not in out
        out[n] = (h.group(2).strip(), body)
    assert list(out) == list(range(1, 18))
    return out

questions, provenance = [], []
for bank in (1, 2):
    path = ROOT / "sources" / f"Mock Quiz {bank}.md"
    raw = path.read_text()
    qpart, spart = raw.split("# SOLUTIONS & MARKING SCHEME", 1)
    prompts, answers = blocks(qpart), blocks(spart)
    provenance.append({"file": path.name, "sha256": hashlib.sha256(path.read_bytes()).hexdigest(), "questionCount": 17})
    for n, (heading, body) in prompts.items():
        qid = f"mq{bank}-q{n}"
        marks = int(re.search(r"\((\d+) Marks?\)", heading).group(1))
        title = heading.split(" — ", 1)[1]
        title = re.sub(r"\[MULTI-ANSWER: NO PARTIAL CREDIT\]\s*", "", title)
        matches = list(re.finditer(r"^\* (?:\[ \] )?([A-E])\) (.+)$", body, re.M))
        choices = [{"id": m.group(1), "sourceMarkdown": m.group(2), "text": readable_math(m.group(2))} for m in matches]
        stem = body[:matches[0].start()].strip() if matches else body
        solution = answers[n][1]
        multi = "[MULTI-ANSWER" in heading
        key = re.search(r"\* \*\*Correct Answer:\*\* \*\*([A-E, ]+)\*\*", solution)
        correct = [x.strip() for x in key.group(1).split(",")] if key else []
        assert bool(choices) == bool(key)
        if choices:
            assert len(choices) in (4, 5)
            assert set(correct) <= {c["id"] for c in choices}
            assert (len(correct) > 1) == multi
            assert n <= 12
        else:
            assert n >= 13
        explanation = solution
        if key:
            explanation = solution[key.end():].strip()
            explanation = re.sub(r"^\*\(No partial marks[^\n]*\n", "", explanation)
            # Keep the complete answer/marking text too, including no-partial-credit notices.
            explanation = re.sub(r"^[^\n]*\n(?=\* \*\*Rationale:)", "", explanation)
            explanation = re.sub(r"^\* \*\*Rationale:\*\*\s*", "", explanation)
        kind = "multiple-select" if multi else "mcq" if choices else "calculation" if n in (13, 14) else "written"
        questions.append({
            "id": qid, "bank": bank, "number": n, "title": title,
            "topic": MAP[bank][n-1], "type": kind, "marks": marks,
            "prompt": readable_math(stem), "choices": choices,
            "correctAnswers": correct, "explanation": readable_math(explanation),
            "source": {"file": path.name, "heading": f"Question {n}", "questionMarkdown": body, "answerMarkdown": solution},
            "review": FLAGS.get(qid),
        })

assert len(questions) == 34
assert sum(q["marks"] for q in questions) == 70
assert Counter(q["type"] for q in questions) == {"mcq":18, "multiple-select":6, "calculation":4, "written":6}
assert all(not re.search(r"\\[A-Za-z]+", q["prompt"]+q["explanation"]) for q in questions)
bank = {"version": 1, "module": "INF2001", "title": "Introduction to Software Engineering", "topics": TOPICS, "sources": provenance, "questions": questions}
(ROOT / "data/questions.json").write_text(json.dumps(bank, ensure_ascii=False, indent=2)+"\n")
(ROOT / "data/question-data.js").write_text("// Generated by tools/build_data.py; source answers are preserved.\nwindow.QUESTION_BANK = "+json.dumps(bank, ensure_ascii=False, indent=2)+";\n")
print(json.dumps({"questions":len(questions), "types":dict(Counter(q["type"] for q in questions)), "marks":70, "review":list(FLAGS), "images":0}, indent=2))
