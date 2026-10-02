/* Interaction checks with a small DOM stub. This is not a browser/layout test. */
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const assert = require('assert/strict');
const root = path.resolve(__dirname,'..');
const bank = JSON.parse(fs.readFileSync(path.join(root,'data/questions.json'),'utf8'));
const {marked} = require(path.join(root,'vendor/marked.umd.js'));
const code = fs.readFileSync(path.join(root,'app.js'),'utf8');
const key = 'inf2001-practice-v1';
let assertions = 0;
const check = (value,label) => {assert.ok(value,label);assertions++;};
function harness(initial,blocked=false) {
  const nodes = new Map(),store=new Map(initial?[[key,initial]]:[]);
  let selected=[];
  function node(id) {
    if (!nodes.has(id)) nodes.set(id,{id,value:'',innerHTML:'',textContent:'',hidden:false,disabled:false,
      listeners:{},classList:{add(){},remove(){},toggle(){}},
      addEventListener(type,fn){this.listeners[type]=fn;},focus(){},scrollIntoView(){},showModal(){this.open=true;},close(){this.open=false;}});
    return nodes.get(id);
  }
  const document={getElementById:node,querySelector:()=>({focus(){}}),querySelectorAll:selector=>selector.includes(':checked')?selected.map(value=>({value})):[],createElement:()=>({click(){}})};
  const localStorage={getItem:k=>store.get(k)||null,setItem:(k,v)=>{if(blocked)throw Error('blocked');store.set(k,v);},removeItem:k=>store.delete(k)};
  vm.runInNewContext(code,{window:{QUESTION_BANK:bank,marked},marked,document,localStorage,Blob,URL,setTimeout,console});
  const button = (id,extra={}) => ({id,dataset:{},...extra,closest(){return this;}});
  return {
    node, data:()=>JSON.parse(store.get(key)||'null'),
    choose(ids){selected=ids;node('question').listeners.input({target:{matches:s=>s==='input[name="answer"]'}});},
    click(id){node('question').listeners.click({target:button(id)});},
    go(id){node('question-list').listeners.click({target:button('',{dataset:{question:id}})});},
    written(text){node('question').listeners.input({target:{id:'written-answer',value:text,matches:()=>false}});},
    score(value){node('self-score').value=String(value);node('question').listeners.submit({target:{id:'self-assessment'},preventDefault(){}});},
    filter(value){node('status-filter').value=value;node('status-filter').listeners.change();},
    search(value){node('search').value=value;node('search').listeners.input();},
    results(){node('results-toggle').listeners.click();},
    reset(confirm){node('results-view').listeners.click({target:button('reset-progress')});node(confirm?'confirm-reset':'cancel-reset').listeners.click();},
  };
}
const h=harness();
check(h.node('question-list').innerHTML.match(/data-question=/g).length===34,'All questions navigable');
check(!h.node('question').innerHTML.includes('Source explanation'),'Answers hidden before submit');
// Exhaust every nonempty selection, including all combinations of each multi-select question.
for (const q of bank.questions.filter(q=>q.choices.length)) {
  const sets=q.type==='multiple-select' ? Array.from({length:2**q.choices.length-1},(_,i)=>q.choices.filter((c,j)=>(i+1)&(1<<j)).map(c=>c.id)) : q.choices.map(c=>[c.id]);
  for(const ids of sets){
    h.go(q.id);
    if(h.data()?.records[q.id]?.submitted)h.click('submit-answer');
    h.choose(ids);h.click('submit-answer');
    const r=h.data().records[q.id],a=r.history.at(-1);
    const expected=q.review?.excludeFromScore?null:ids.slice().sort().join(',')===q.correctAnswers.slice().sort().join(',');
    check(a.correct===expected,q.id+' key exact set '+ids.join(','));
    check(r.submitted && h.node('question').innerHTML.includes('Source explanation'),'Feedback revealed');
  }
}
check(!h.node('stats').innerHTML.includes('/24'),'Disputed question excluded from grading');
h.go('mq1-q13');h.written('UFP = 66; TCF = 0.90; FP = 59.40');h.click('submit-answer');h.score(5.5);
check(h.data().records['mq1-q13'].history.at(-1).selfScore===5.5,'Fractional written score');
check(h.node('question').innerHTML.includes('<table>'),'Reference table rendered');
h.go('mq2-q17');h.written('Draft answer: interface and polymorphism.');
const restored=harness(JSON.stringify(h.data()));
check(restored.node('question').innerHTML.includes('Draft answer: interface and polymorphism.'),'Written draft restored');
check(restored.node('stats').innerHTML.includes('5.5'),'Self score restored');
restored.go('mq2-q10');check(restored.node('question').innerHTML.includes('<pre>'),'Code block rendered');
restored.search('no-question-can-match-this');check(restored.node('question').innerHTML.includes('No matching questions'),'Empty search');
restored.search('PERT');check(restored.node('question-list').innerHTML.match(/data-question=/g).length===2,'Search question text');
restored.search('');restored.filter('review');check(restored.node('question-list').innerHTML.match(/data-question=/g).length===2,'Two review flags');
restored.go('mq1-q1');restored.choose(['D']);restored.click('submit-answer'); // Retrying a saved attempt first.
if(!restored.data().records['mq1-q1'].submitted){restored.choose(['D']);restored.click('submit-answer');}
check(restored.data().records['mq1-q1'].history.at(-1).correct===null,'Flagged key never auto graded');
restored.results();check(restored.node('results-view').innerHTML.includes('Results by topic'),'Results displayed');
restored.reset(false);check(restored.data().records['mq1-q13'].history.length>0,'Reset cancel preserves data');
restored.reset(true);check(Object.keys(restored.data().records).length<=1,'Reset clears histories');
const corrupt=harness('{bad-json');check(corrupt.node('question').innerHTML.includes('SE Foundations'),'Corrupt storage recovers');
const blocked=harness(null,true);blocked.go('mq1-q2');blocked.choose(['B']);blocked.click('submit-answer');
check(blocked.node('question').innerHTML.includes('feedback correct'),'Storage denial still permits practice');
check(blocked.node('save-status').textContent.includes('unavailable'),'Storage denial visibly warned');
console.log(`PASS: ${assertions} interaction assertions (DOM stub; no visual browser verification).`);
