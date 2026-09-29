import { createRequire } from 'node:module';const sharp=createRequire('/Users/eugeniotamburini/Documents/knowunity-sprint/package.json')('sharp');
import { readdirSync } from 'node:fs';
const D='/Users/eugeniotamburini/Documents/knowunity-sprint/eval/screens-02/';
const O='/Users/eugeniotamburini/Documents/knowunity-sprint/eval/sheets-02/';
const sheets={
 'A-shell-recap':['01-home','02-due-list','03-due-list-caught-up','04-recap-t1','04b-recap-t2'],
 'B-prompt-t1-states':['05-prompt-t1-idle','06-prompt-t1-listening','07-prompt-t1-stopped','05x-prompt-t1-menu-open','05y-prompt-t1-exit-sheet'],
 'C-prompt-t2-t3':['05-prompt-t2-idle','06-prompt-t2-listening','07-prompt-t2-stopped','05-prompt-t3-idle','06-prompt-t3-listening','07-prompt-t3-stopped'],
 'D-processing-results':['08-processing-t1-early','08-processing-t2-early','08-processing-t3-early','09-result-t1','09-result-t2','09-result-t3'],
 'E-graded-hint':['09b-result-t1-graded-difficult','09b-result-t2-graded-easy','09c-result-t3-exit-sheet','10-hint-t2','10-hint-t3','13-hint-to-prompt-record1'],
 'F-failure-paths':['20-prompt-t1-denied','21-hint-t2-denied','22-prompt-t1-text-empty','23-prompt-t1-text-filled','25-result-t1-typed-echo','25b-prompt-t2-text-sticky'],
 'G-summary-404':['11a-summary-fresh','11-summary-after-grading','11b-summary-topic2-ungraded','12-404-topic','12f-404-way-out','05w-skip-on-last-term'],
};
for(const [k,names] of Object.entries(sheets)){
  const W=300,H=650,gap=10;
  const tiles=await Promise.all(names.map(async(n,i)=>({input:await sharp(D+n+'.png').resize(W,H).toBuffer(),left:i*(W+gap),top:0})));
  await sharp({create:{width:names.length*(W+gap)-gap,height:H,channels:3,background:'#444'}}).composite(tiles).png().toFile(O+k+'.png');
}
console.log(readdirSync(O));
