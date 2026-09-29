import { PNG } from '/Users/eugeniotamburini/Documents/knowunity-sprint/node_modules/pngjs/lib/png.js';
import { readFileSync } from 'node:fs';
const D='/Users/eugeniotamburini/Documents/knowunity-sprint/eval/screens-02/';
const log=JSON.parse(readFileSync(D+'_log.json','utf8')).filter(l=>l.hash);
const groups={}; for(const l of log)(groups[l.hash]??=[]).push(l.name);
console.log('IDENTICAL-HASH GROUPS'); for(const g of Object.values(groups)) if(g.length>1) console.log('  ',g.join(' = '));
const load=n=>PNG.sync.read(readFileSync(D+n+'.png'));
function diff(a,b,band){const A=load(a),B=load(b);let n=0,tot=0;const y0=band?band[0]*2:0,y1=band?band[1]*2:A.height;
 for(let y=y0;y<y1;y++)for(let x=0;x<A.width;x++){const i=(y*A.width+x)*4;tot++;if(Math.abs(A.data[i]-B.data[i])>8||Math.abs(A.data[i+1]-B.data[i+1])>8||Math.abs(A.data[i+2]-B.data[i+2])>8)n++;}
 return (100*n/tot).toFixed(2)+'%'}
const pairs=[
['05-prompt-t1-idle','06-prompt-t1-listening'],['06-prompt-t1-listening','07-prompt-t1-stopped'],['05-prompt-t1-idle','07-prompt-t1-stopped'],
['06-prompt-t1-listening','06b-prompt-t1-listening-later'],
['08-processing-t1-early','08b-processing-t1-late'],['08-processing-t2-early','08b-processing-t2-late'],
['09-result-t1','09-result-t2'],['09-result-t2','09-result-t3'],['09-result-t1','09-result-t3'],
['10-hint-t2','05-prompt-t2-idle'],['10-hint-t3','09-result-t3-fresh'],
['08-processing-t1-early','20-prompt-t1-denied'],['20-prompt-t1-denied','21-hint-t2-denied'],
['05-prompt-t1-idle','05z-prompt-t1-after-cancel'],
['09-result-t2','09-result-t2-fresh'],['09-result-t2-fresh','13c-result-t2-after-hint-rerecord'],
['09-result-t2','09b-result-t2-graded-easy'],
['11a-summary-fresh','11-summary-after-grading'],['11a-summary-fresh','11b-summary-topic2-ungraded'],
['02-due-list','03-due-list-caught-up'],['04-recap-t1','04b-recap-t2'],
['12-404-topic','12b-404-term'],['22-prompt-t1-text-empty','23-prompt-t1-text-filled'],
['08-processing-t1-early','24-processing-typed'],['09-result-t1','25-result-t1-typed-echo'],
['05-prompt-t1-idle','05-prompt-t2-idle'],['05-prompt-t2-idle','05-prompt-t3-idle'],
['13-hint-to-prompt-record1','06-prompt-t2-listening'],['10-hint-t2','21-hint-t2-denied'],
['20-prompt-t1-denied','20b-prompt-t1-denied-after-second-tap'],['20-prompt-t1-denied','20c-prompt-t1-denied-then-text'],['20-prompt-t1-denied','20d-prompt-t2-after-denial'],
];
console.log('\nPAIR DIFFS (full-screen, threshold 8/255)  [mic band y 585-844 where relevant]');
for(const [a,b] of pairs) { try{ console.log(`  ${a}  vs  ${b}: ${diff(a,b)}  | mic-zone ${diff(a,b,[585,844])}`);}catch(e){console.log('  ',a,b,'ERR',e.message)} }
// mic disc band only (centre 112px disc): approx
