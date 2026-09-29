import { PNG } from '/Users/eugeniotamburini/Documents/knowunity-sprint/node_modules/pngjs/lib/png.js';
import { readFileSync } from 'node:fs';
const D='/Users/eugeniotamburini/Documents/knowunity-sprint/eval/screens-02/';
const load=n=>PNG.sync.read(readFileSync(D+n+'.png'));
function d(a,b,x0=139,y0=585,x1=251,y1=697){const A=load(a),B=load(b);let n=0;for(let y=y0*2;y<y1*2;y++)for(let x=x0*2;x<x1*2;x++){const i=(y*A.width+x)*4;if(Math.abs(A.data[i]-B.data[i])>8||Math.abs(A.data[i+1]-B.data[i+1])>8||Math.abs(A.data[i+2]-B.data[i+2])>8)n++;}return n}
for (const [a,b] of [['05-prompt-t1-idle','07-prompt-t1-stopped'],['05-prompt-t1-idle','06-prompt-t1-listening'],['08-processing-t1-early','20-prompt-t1-denied'],['05-prompt-t1-idle','20-prompt-t1-denied'],['05-prompt-t1-idle','08-processing-t1-early'],['10-hint-t2','05-prompt-t2-idle'],['10-hint-t2','21-hint-t2-denied']]) console.log(a,'vs',b,'disc px differing:',d(a,b));
const log=JSON.parse(readFileSync(D+'_log.json','utf8'));
for(const n of ['08-processing-t1-early','08b-processing-t1-late','08-processing-t3-early','08b-processing-t3-late','05x-prompt-t1-menu-open']) console.log(n, log.filter(l=>l.name===n).map(l=>l.url).join(' | '));
