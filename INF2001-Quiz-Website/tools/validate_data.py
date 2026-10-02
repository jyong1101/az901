"""Independently check extracted content against both packaged source files."""
import hashlib
import json
import re
from collections import Counter
from pathlib import Path

root = Path(__file__).resolve().parents[1]
bank = json.loads((root / "data/questions.json").read_text())
payload = (root / "data/question-data.js").read_text().split("window.QUESTION_BANK = ", 1)[1].rstrip().removesuffix(";")
assert json.loads(payload) == bank, "JS and JSON disagree"
assert len(bank["questions"]) == 34
assert len({q["id"] for q in bank["questions"]}) == 34

def extract(part):
    headings = list(re.finditer(r"^#### Question (\d+)([^\n]*)\n", part, re.M))
    result = {}
    for i,h in enumerate(headings):
        body = part[h.end():headings[i+1].start() if i+1 < len(headings) else len(part)]
        body = re.split(r"^#{1,3} ",body,maxsplit=1,flags=re.M)[0]
        result[int(h.group(1))] = (h.group(2).strip(),re.sub(r"(?:\n\s*---\s*)+$", "", body).strip())
    return result

for source in bank["sources"]:
    path = root / "sources" / source["file"]
    assert hashlib.sha256(path.read_bytes()).hexdigest() == source["sha256"]
    prompt_text,solution_text=path.read_text().split("# SOLUTIONS & MARKING SCHEME",1)
    prompts,solutions=extract(prompt_text),extract(solution_text)
    assert len(prompts)==len(solutions)==17
    qs=[q for q in bank["questions"] if q["source"]["file"]==path.name]
    assert [q["number"] for q in qs]==list(range(1,18))
    assert sum(q["marks"] for q in qs)==35
    for q in qs:
        heading,body=prompts[q["number"]]
        assert q["source"]["questionMarkdown"]==body
        assert q["source"]["answerMarkdown"]==solutions[q["number"]][1]
        assert q["marks"]==int(re.search(r"\((\d+) Marks?\)",heading).group(1))
        choices=re.findall(r"^\* (?:\[ \] )?([A-E])\) (.+)$",body,re.M)
        assert [(c["id"],c["sourceMarkdown"]) for c in q["choices"]]==choices
        answer=re.search(r"\* \*\*Correct Answer:\*\* \*\*([A-E, ]+)\*\*",solutions[q["number"]][1])
        assert q["correctAnswers"]==([a.strip() for a in answer.group(1).split(',')] if answer else [])
        assert q["topic"] in bank["topics"]
        assert not re.search(r"\\[A-Za-z]+",q["prompt"]+q["explanation"]+''.join(c["text"] for c in q["choices"]))
        assert q["explanation"].strip()
    assert not re.search(r"!\[[^\]]*\]\([^)]*\)|<img",path.read_text(),re.I), "Image requires review"

# Recompute all fully numeric worked estimates from the supplied values.
q_by_id={q['id']:q for q in bank['questions']}
ufp=2*4+3*7+4*3+1*15+2*5
assert ufp==66 and round(ufp*(0.65+0.01*25),2)==59.4
assert (6+4*12+24)/6==13 and (5+4*8+17)/6==9
ucp=(5+15+10+1+2+3)*(0.6+0.01*30)*(1.4-0.03*10)
assert round(ucp,2)==35.64 and round(ucp*20,1)==712.8
assert 8*2==16 and 2*8-2==14
assert 500000*0.25==125000 and 500000*4==2000000
for qid,values in {'mq1-q13':['66','0.90','59.40'],'mq1-q14':['13.0'],'mq1-q15':['16 : 1','14 : 1'],'mq2-q13':['35.64','712.8'],'mq2-q14':['9.0'],'mq2-q15':['125,000','2,000,000']}.items():
    assert all(v in q_by_id[qid]['explanation'] for v in values)
print('PASS: 34 questions; source text, choice order, keys, marking guides, marks, hashes, topic references, notation conversion and numeric calculations.')
print('Types:',dict(Counter(q['type'] for q in bank['questions'])))
print('Review flags:',[q['id'] for q in bank['questions'] if q['review']])
