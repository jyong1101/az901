/* Static quiz: no server, account, analytics, or external requests. */
(() => {
  'use strict';
  const bank = window.QUESTION_BANK;
  const $ = id => document.getElementById(id);
  const escape = text => String(text ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  if (!bank || !window.marked) {
    $('question').innerHTML = '<div class="empty"><h2>Question bank could not load</h2><p>Keep the data and vendor folders beside index.html, then reload.</p></div>';
    return;
  }
  const renderer = new marked.Renderer();
  renderer.html = token => escape(token.text);
  renderer.link = function(token) {
    const content = this.parser.parseInline(token.tokens);
    return /^(https?:\/\/|\.\/|[^:/]+\.md$)/i.test(token.href) ? `<a href="${escape(token.href)}" target="_blank" rel="noopener">${content}</a>` : content;
  };
  renderer.image = () => '<span>[Image requires review]</span>';
  const md = text => marked.parse(text || '', {renderer, gfm:true, breaks:false}).replace(/<table>/g, '<div class="table-wrap"><table>').replace(/<\/table>/g, '</table></div>');
  const KEY = 'inf2001-practice-v1';
  const fingerprint = bank.sources.map(s => s.sha256).join(':');
  const questions = bank.questions;
  const byId = Object.fromEntries(questions.map(q => [q.id, q]));
  const blank = () => ({version:1, fingerprint, current:questions[0].id, topic:'all', bank:'all', filter:'all', search:'', records:{}});
  const newRecord = () => ({selection:[], text:'', submitted:false, selfScore:null, history:[]});
  let state = blank(), storageOK = true, restoreNote = '', results = false;

  function validAttempt(a, q) {
    if (!a || !Array.isArray(a.selection) || typeof a.text !== 'string' || typeof a.at !== 'string') return false;
    if (a.selection.some(id => !q.choices.some(c => c.id === id))) return false;
    if (a.selfScore !== null && (!Number.isFinite(a.selfScore) || a.selfScore < 0 || a.selfScore > q.marks)) return false;
    return (typeof a.correct === 'boolean' || a.correct === null);
  }
  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return;
      const saved = JSON.parse(raw);
      if (saved.version !== 1 || saved.fingerprint !== fingerprint) { restoreNote = 'Question bank changed; starting fresh.'; return; }
      if (!saved.records || typeof saved.records !== 'object') throw new Error('Invalid saved progress');
      if (byId[saved.current]) state.current = saved.current;
      if (saved.topic === 'all' || bank.topics[saved.topic]) state.topic = saved.topic;
      if (['all','1','2'].includes(saved.bank)) state.bank = saved.bank;
      if (['all','unanswered','incorrect','review'].includes(saved.filter)) state.filter = saved.filter;
      state.search = typeof saved.search === 'string' ? saved.search.slice(0,300) : '';
      for (const q of questions) {
        const r = saved.records[q.id];
        if (!r || !Array.isArray(r.selection) || !Array.isArray(r.history)) continue;
        const history = r.history.filter(a => validAttempt(a,q)).slice(-200);
        state.records[q.id] = {
          selection:[...new Set(r.selection.filter(id => q.choices.some(c => c.id === id)))],
          text:typeof r.text === 'string' ? r.text : '',
          submitted:r.submitted === true && history.length > 0,
          selfScore:Number.isFinite(r.selfScore) && r.selfScore >= 0 && r.selfScore <= q.marks ? r.selfScore : null,
          history,
        };
      }
      restoreNote = 'Progress restored in this browser';
    } catch { restoreNote = 'Saved progress could not be restored; starting fresh.'; }
  }
  function save() {
    try {
      localStorage.setItem(KEY,JSON.stringify(state));
      storageOK = true;
      $('save-status').textContent = 'Progress saved in this browser';
      $('save-status').classList.remove('error');
    } catch {
      storageOK = false;
      $('save-status').textContent = 'Browser storage unavailable · export results to keep them';
      $('save-status').classList.add('error');
    }
  }
  const record = q => state.records[q.id] || (state.records[q.id] = newRecord());
  const latest = q => (state.records[q.id]?.history || []).at(-1);
  const excluded = q => q.review?.excludeFromScore;
  const auto = q => q.choices.length > 0;
  const same = (a,b) => a.length === b.length && [...a].sort().join(',') === [...b].sort().join(',');
  const status = q => {
    const a = latest(q);
    if (!a) return state.records[q.id]?.selection.length || state.records[q.id]?.text ? 'draft' : 'unanswered';
    if (excluded(q)) return 'review';
    if (auto(q)) return a.correct ? 'correct' : 'incorrect';
    if (a.selfScore === null) return 'pending';
    return a.selfScore === q.marks ? 'self' : a.selfScore === 0 ? 'incorrect' : 'partial';
  };
  const statusLabel = q => ({correct:'Correct',incorrect:auto(q)?'Incorrect':'Self-assessed: 0 marks',partial:'Self-assessed: partial',self:'Self-assessed: full marks',review:'Source key under review',unanswered:'Unanswered',draft:'Draft saved',pending:'Awaiting self-assessment'}[status(q)]);
  function filtered() {
    const search = state.search.trim().toLowerCase();
    return questions.filter(q => {
      if (state.topic !== 'all' && q.topic !== state.topic) return false;
      if (state.bank !== 'all' && String(q.bank) !== state.bank) return false;
      if (state.filter === 'unanswered' && latest(q)) return false;
      if (state.filter === 'incorrect' && !['incorrect','partial'].includes(status(q))) return false;
      if (state.filter === 'review' && !q.review) return false;
      return !search || `${q.id} mock quiz ${q.bank} question ${q.number} ${q.title} ${bank.topics[q.topic]} ${q.prompt} ${q.choices.map(c=>c.text).join(' ')}`.toLowerCase().includes(search);
    });
  }
  function summarize(list) {
    const answered = list.filter(q => latest(q));
    const graded = answered.filter(q => auto(q) && !excluded(q));
    const correct = graded.filter(q => latest(q).correct);
    const written = answered.filter(q => !auto(q) && latest(q).selfScore !== null);
    return {
      answered:answered.length, graded:graded.length, correct:correct.length,
      accuracy:graded.length ? Math.round(correct.length / graded.length * 100) : null,
      autoMarks:correct.reduce((s,q)=>s+q.marks,0), autoMax:graded.reduce((s,q)=>s+q.marks,0),
      selfMarks:written.reduce((s,q)=>s+latest(q).selfScore,0), selfMax:written.reduce((s,q)=>s+q.marks,0),
      selfCount:written.length, attempts:answered.reduce((s,q)=>s+state.records[q.id].history.length,0),
    };
  }
  function renderStats() {
    const s = summarize(questions);
    $('stats').innerHTML = `<div class="stat"><div class="stat-label">Questions answered</div><div class="stat-value">${s.answered} <small>/ 34</small></div><div class="stat-note">${s.attempts} total submissions</div></div><div class="stat"><div class="stat-label">MCQ accuracy</div><div class="stat-value">${s.accuracy === null ? '—' : s.accuracy+'%'} <small>· ${s.correct}/${s.graded}</small></div><div class="stat-note">Latest answers · disputed key excluded</div></div><div class="stat"><div class="stat-label">Written self-assessment</div><div class="stat-value">${s.selfCount ? s.selfMarks : '—'} <small>${s.selfCount ? '/ '+s.selfMax+' marks' : 'marks'}</small></div><div class="stat-note">${s.selfCount} of 10 written questions marked</div></div>`;
  }
  function renderTopics() {
    $('topics').innerHTML = [['all','All topics'],...Object.entries(bank.topics)].map(([id,label]) => `<button class="topic-button${state.topic===id?' active':''}" data-topic="${id}" aria-pressed="${state.topic===id}"><span>${escape(label)}</span><span class="topic-count">${id==='all'?34:questions.filter(q=>q.topic===id).length}</span></button>`).join('');
  }
  function renderDirectory(list) {
    $('question-list').innerHTML = list.map(q=>`<button class="question-link ${status(q)}${q.id===state.current?' active':''}" data-question="${q.id}" aria-current="${q.id===state.current?'true':'false'}" aria-label="Mock Quiz ${q.bank}, Question ${q.number}: ${escape(q.title)}. ${escape(statusLabel(q))}${q.review?'. Needs review':''}"><span class="q-number">${q.number.toString().padStart(2,'0')}</span><span>Quiz ${q.bank}${q.review?' · Review':''}<br><span class="q-status">${escape(statusLabel(q))}</span></span></button>`).join('');
  }
  function choiceHtml(q,r) {
    return q.choices.map(c => {
      const selected = r.selection.includes(c.id);
      const correct = q.correctAnswers.includes(c.id);
      const graded = r.submitted && !excluded(q);
      const klass = `${selected?' selected':''}${r.submitted?' locked':''}${graded&&correct?' good':''}${graded&&selected&&!correct?' bad':''}`;
      const label = r.submitted ? (excluded(q) && correct ? 'Source key' : graded&&correct ? 'Correct' : graded&&selected&&!correct ? 'Your answer' : '') : '';
      return `<label class="choice${klass}"><input type="${q.type==='multiple-select'?'checkbox':'radio'}" name="answer" value="${c.id}" ${selected?'checked':''} ${r.submitted?'disabled':''}><span class="choice-key">${c.id}</span><span class="choice-content markdown">${md(c.text)}</span>${label?`<span class="choice-feedback">${label}</span>`:''}</label>`;
    }).join('');
  }
  function feedbackHtml(q,r) {
    if (!r.submitted) return '';
    const a = latest(q);
    let title, sub, cls;
    if (auto(q)) {
      const matches = same(r.selection,q.correctAnswers);
      if (excluded(q)) {
        title = matches ? 'Matches the supplied key' : 'Differs from the supplied key';
        sub = 'This answer key needs review. Your submission is saved and excluded from automatic accuracy and marks.';
        cls = 'review';
      } else {
        title = matches ? 'Correct' : 'Incorrect';
        sub = matches ? `${q.marks} / ${q.marks} marks${q.type==='multiple-select'?' · All correct options selected.':''}` : `0 / ${q.marks} marks${q.type==='multiple-select'?' · Select every correct option and no incorrect options.':''}`;
        cls = matches?'correct':'incorrect';
      }
      sub += ` Source answer: ${q.correctAnswers.join(', ')}.`;
    } else {
      title = 'Compare with the marking guide';
      sub = 'Written answers are self-assessed. Use the source guide below to record the marks you earned.';
      cls = q.review ? 'review' : '';
    }
    return `<section class="feedback ${cls}" aria-label="Answer feedback"><h3 class="feedback-title" tabindex="-1">${title}</h3><p class="feedback-sub">${sub}</p><h4>${auto(q)?'Source explanation':'Source marking guide'}</h4><div class="markdown">${md(q.explanation)}</div>${!auto(q)?`<form id="self-assessment" class="self-assessment"><label for="self-score">Your marks (0–${q.marks})</label><input type="number" id="self-score" min="0" max="${q.marks}" step="any" value="${a.selfScore??''}" required><button class="button secondary" type="submit">Save self-assessment</button><span class="hint" id="self-hint" role="status">${a.selfScore===null?'Not marked yet':`${a.selfScore} / ${q.marks} marks saved`}</span></form>`:''}</section>`;
  }
  function renderQuestion(list) {
    if (!list.length) {
      $('question').innerHTML = '<div class="empty"><h2>No matching questions</h2><p>Try another topic, status, or search term.</p><button class="button secondary" id="empty-clear">Clear filters</button></div>';
      return;
    }
    if (!list.some(q=>q.id===state.current)) state.current = list[0].id;
    const q = byId[state.current], r = record(q), index = list.indexOf(q);
    const types = {'mcq':'Single answer','multiple-select':'Multiple select','written':'Written answer','calculation':'Calculation'};
    const canSubmit = auto(q) ? r.selection.length > 0 : r.text.trim().length > 0;
    $('question').innerHTML = `<div class="card-meta"><span class="question-id">MOCK QUIZ ${q.bank} / QUESTION ${q.number.toString().padStart(2,'0')}</span><div class="badges"><span class="badge type">${types[q.type]}</span><span class="badge">${q.marks} ${q.marks===1?'mark':'marks'}</span>${q.review?'<span class="badge flag">Needs review</span>':''}</div></div><div class="card-body"><h2 class="question-title" tabindex="-1">${escape(q.title)}</h2>${q.review?`<details class="review-notice"><summary>${escape(q.review.summary)}</summary><p>${escape(q.review.detail)}</p></details>`:''}<div class="markdown question-prompt">${md(q.prompt)}</div>${auto(q)?`<p class="answer-instruction">${q.type==='multiple-select'?'Select all that apply. No partial credit.':'Select one answer.'}</p><div class="choices" role="group" aria-label="Answer choices">${choiceHtml(q,r)}</div>`:`<label for="written-answer" class="written-label">Your answer & working</label><textarea id="written-answer" class="written-answer" placeholder="Write your reasoning and calculations here…" ${r.submitted?'disabled':''}>${escape(r.text)}</textarea><p class="answer-instruction">Submit to reveal the marking guide, then assess your own answer.</p>`}${feedbackHtml(q,r)}<details class="source-details"><summary>Source: ${escape(q.source.file)}, Question ${q.number}${r.submitted?' · view original marking text':''}</summary><p>Question and choices are preserved from the source. Math notation is converted to readable text.</p>${r.submitted?`<div class="markdown">${md(q.source.answerMarkdown)}</div>`:''}</details><p id="question-message" class="submit-error" role="alert"></p></div><div class="card-actions"><button class="button" id="submit-answer" ${!r.submitted&&!canSubmit?'disabled':''}>${r.submitted?'Try again':'Submit answer'}</button><span class="position">Question ${index+1} of ${list.length}</span><div class="nav-buttons"><button class="button secondary" id="previous" ${index===0?'disabled':''}>Previous</button><button class="button secondary" id="next" ${index===list.length-1?'disabled':''}>Next</button></div></div>`;
  }
  function renderPractice() {
    const list = filtered();
    $('scope-label').textContent = state.topic==='all'?'All topics':bank.topics[state.topic];
    $('scope-count').textContent = `${list.length} ${list.length===1?'question':'questions'}`;
    $('clear-filters').hidden = state.topic==='all' && state.bank==='all' && state.filter==='all' && !state.search;
    renderQuestion(list);
    renderDirectory(list);
  }
  function resultTable() {
    return Object.entries(bank.topics).map(([id,name]) => {
      const qs = questions.filter(q=>q.topic===id), s=summarize(qs);
      return `<tr><td><button class="text-button" data-result-topic="${id}">${escape(name)}</button></td><td>${s.answered} / ${qs.length}</td><td>${s.accuracy===null?'—':s.accuracy+'%'} <span class="stat-note">(${s.correct}/${s.graded})</span></td><td>${s.autoMax?s.autoMarks+' / '+s.autoMax:'—'}</td><td>${s.selfCount?s.selfMarks+' / '+s.selfMax:'—'}</td></tr>`;
    }).join('');
  }
  function renderResults() {
    const attempts = questions.flatMap(q => (state.records[q.id]?.history||[]).map((a,i)=>({q,a,i}))).sort((x,y)=>y.a.at.localeCompare(x.a.at));
    $('results-view').innerHTML = `<section class="results-card"><h2>Results by topic</h2><p>Scores use your latest submission per question. Written marks are recorded by you. Quiz 1 Q1 is excluded from automatic scoring because its source key is disputed.</p><div class="results-table-wrap"><table class="results-table"><thead><tr><th>Topic</th><th>Answered</th><th>MCQ accuracy</th><th>MCQ marks</th><th>Self-assessed marks</th></tr></thead><tbody>${resultTable()}</tbody></table></div><div class="results-actions"><button id="export-progress" class="button secondary">Export progress</button><button id="reset-progress" class="text-button">Clear all progress</button></div><p id="export-message" role="status" style="margin:12px 0 0">${storageOK?'Progress is stored in this browser on this site. Export a backup before clearing browser data.':'Browser storage is unavailable. Export progress before closing this page.'}</p></section><section class="results-card"><h2>Attempt history</h2><p>Most recent 30 submissions${attempts.length?' · '+attempts.length+' in total':''}. Earlier attempts stay saved and are included in your export.</p>${attempts.length?attempts.slice(0,30).map(({q,a,i})=>{
      const label=excluded(q)?'Needs review':auto(q)?a.correct?'Correct':'Incorrect':a.selfScore===null?'Awaiting self-assessment':`Self-assessed: ${a.selfScore}/${q.marks}`;
      const cls=excluded(q)?'review':auto(q)?a.correct?'correct':'incorrect':'';
      return `<div class="attempt-item"><div><button class="text-button" data-attempt="${q.id}" data-attempt-index="${i}">Quiz ${q.bank} · Q${q.number} · ${escape(q.title)}</button><br><time datetime="${escape(a.at)}">${escape(new Date(a.at).toLocaleString())}</time></div><span class="result-pill ${cls}">${label}</span></div>`;
    }).join(''):'<p>No submissions yet. Submit your first answer to start tracking results.</p>'}</section>`;
  }
  function render() {
    renderTopics(); renderStats();
    $('practice-view').hidden = results;
    $('results-view').hidden = !results;
    $('results-toggle').textContent = results?'Back to practice':'View results';
    $('view-title').textContent = results?'Your results':'Your practice desk';
    if (results) renderResults(); else renderPractice();
  }
  function focusQuestion() { document.querySelector('.question-title')?.focus({preventScroll:true}); }
  function syncFilters() {
    $('search').value=state.search; $('bank').value=state.bank; $('status-filter').value=state.filter;
  }
  function clearFilters() {
    state.topic='all'; state.bank='all'; state.filter='all'; state.search='';
    syncFilters(); render(); save();
  }
  function submit() {
    const q=byId[state.current], r=record(q);
    if (r.submitted) {
      r.submitted=false; r.selection=[]; r.text=''; r.selfScore=null;
      render(); save(); focusQuestion(); return;
    }
    if (auto(q)?!r.selection.length:!r.text.trim()) return;
    r.submitted=true;
    const correct = auto(q) && !excluded(q) ? same(r.selection,q.correctAnswers) : null;
    r.history.push({at:new Date().toISOString(),selection:[...r.selection],text:r.text,correct,selfScore:null});
    // Keep the submitted question visible so filtered practice still shows its feedback.
    if (state.filter==='unanswered' || (state.filter==='incorrect' && correct)) state.filter='all';
    syncFilters(); render(); save();
    document.querySelector('.feedback-title')?.focus({preventScroll:true});
  }
  function go(id) {
    state.current=id; results=false; render(); save(); focusQuestion();
    $('question').scrollIntoView({behavior:'instant',block:'start'});
  }
  function download() {
    const blob=new Blob([JSON.stringify({exportedAt:new Date().toISOString(),module:bank.module,...state},null,2)],{type:'application/json'});
    const a=document.createElement('a'),url=URL.createObjectURL(blob);
    a.href=url;a.download='INF2001-progress.json';a.click();
    setTimeout(()=>URL.revokeObjectURL(url),1000);
    $('export-message').textContent='Progress exported. Keep the JSON file as a record of your answers and attempts.';
  }
  $('topics').addEventListener('click',e=>{
    const b=e.target.closest('[data-topic]'); if(!b)return;
    state.topic=b.dataset.topic; results=false; render(); save();
  });
  $('search').addEventListener('input',()=>{state.search=$('search').value;renderPractice();save();});
  $('bank').addEventListener('change',()=>{state.bank=$('bank').value;renderPractice();save();});
  $('status-filter').addEventListener('change',()=>{state.filter=$('status-filter').value;renderPractice();save();});
  $('clear-filters').addEventListener('click',clearFilters);
  $('review-filter').addEventListener('click',()=>{
    state.topic='all';state.bank='all';state.search='';state.filter='review';results=false;
    syncFilters();render();save();
  });
  $('results-toggle').addEventListener('click',()=>{results=!results;render();$('view-title').scrollIntoView({block:'start'});});
  $('question-list').addEventListener('click',e=>{const b=e.target.closest('[data-question]');if(b)go(b.dataset.question);});
  $('question').addEventListener('input',e=>{
    const q=byId[state.current],r=record(q);
    if(e.target.matches('input[name="answer"]')) {
      r.selection=[...document.querySelectorAll('input[name="answer"]:checked')].map(x=>x.value);
      document.querySelectorAll('.choice').forEach(c=>c.classList.toggle('selected',c.querySelector('input').checked));
    } else if(e.target.id==='written-answer') r.text=e.target.value;
    else return;
    $('submit-answer').disabled=auto(q)?!r.selection.length:!r.text.trim();
    save();
  });
  $('question').addEventListener('click',e=>{
    const b=e.target.closest('button');if(!b)return;
    if(b.id==='submit-answer')submit();
    if(b.id==='empty-clear')clearFilters();
    if(b.id==='next'||b.id==='previous') {
      const list=filtered(),i=list.findIndex(q=>q.id===state.current),q=list[i+(b.id==='next'?1:-1)];if(q)go(q.id);
    }
  });
  $('question').addEventListener('submit',e=>{
    if(e.target.id!=='self-assessment')return;
    e.preventDefault();
    const q=byId[state.current],r=record(q),score=Number($('self-score').value);
    if(!Number.isFinite(score)||score<0||score>q.marks)return;
    r.selfScore=score;latest(q).selfScore=score;
    save();renderStats();renderDirectory(filtered());
    $('self-hint').textContent=`${score} / ${q.marks} marks saved`;
  });
  $('results-view').addEventListener('click',e=>{
    const b=e.target.closest('button');if(!b)return;
    if(b.dataset.resultTopic){state.topic=b.dataset.resultTopic;state.bank='all';state.filter='all';state.search='';syncFilters();results=false;render();save();}
    if(b.dataset.attempt){clearFilters();go(b.dataset.attempt);}
    if(b.id==='export-progress')download();
    if(b.id==='reset-progress')$('reset-dialog').showModal();
  });
  $('cancel-reset').addEventListener('click',()=>$('reset-dialog').close());
  $('confirm-reset').addEventListener('click',()=>{
    state=blank();results=false;syncFilters();render();save();$('reset-dialog').close();
  });
  load();syncFilters();render();
  if(restoreNote)$('save-status').textContent=restoreNote;
  // Probe persistence even before the first answer; unavailable storage never blocks practice.
  try { localStorage.setItem(KEY+'-probe','1');localStorage.removeItem(KEY+'-probe'); }
  catch { storageOK=false;$('save-status').textContent='Browser storage unavailable · progress lasts for this visit';$('save-status').classList.add('error'); }
})();
