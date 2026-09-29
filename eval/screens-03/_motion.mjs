import { chromium } from '/Users/eugeniotamburini/Documents/knowunity-sprint/node_modules/playwright/index.mjs';
import { PNG } from '/Users/eugeniotamburini/Documents/knowunity-sprint/node_modules/pngjs/lib/png.js';
const B='http://localhost:3000/recap/renaissance-philosophy';
const GRANT=`navigator.mediaDevices.getUserMedia = async () => ({ getTracks: () => [{ stop(){} }] });`;
const browser=await chromium.launch();
const d=(a,b)=>{const A=PNG.sync.read(a),C=PNG.sync.read(b);let n=0;for(let i=0;i<A.data.length;i+=4)if(Math.abs(A.data[i]-C.data[i])>8||Math.abs(A.data[i+1]-C.data[i+1])>8||Math.abs(A.data[i+2]-C.data[i+2])>8)n++;return n};
async function run(reduced){
  const ctx=await browser.newContext({viewport:{width:390,height:844},colorScheme:'dark',reducedMotion:reduced?'reduce':'no-preference'});
  const p=await ctx.newPage();await p.addInitScript(GRANT);
  const css='nextjs-portal,[data-nextjs-toast],[data-next-badge-root]{display:none!important}';
  await p.goto(B+'/prompt/0',{waitUntil:'networkidle'});await p.addStyleTag({content:css});
  await p.getByRole('button',{name:/start speaking/i}).click();
  const l=[];for(let i=0;i<4;i++){await p.waitForTimeout(300);l.push(await p.screenshot());}
  const listening=[d(l[0],l[1]),d(l[1],l[2]),d(l[2],l[3])];
  await p.getByRole('button',{name:/stop recording|speaking|listening/i}).first().click();
  await p.getByRole('button',{name:'Submit'}).click();await p.waitForURL(/processing/);await p.addStyleTag({content:css});
  const q=[];for(let i=0;i<4;i++){q.push(await p.screenshot());await p.waitForTimeout(300);}
  const proc=[d(q[0],q[1]),d(q[1],q[2]),d(q[2],q[3])];
  const kf=await p.evaluate(()=>document.getAnimations().map(a=>a.animationName||a.transitionProperty||'?'));
  await ctx.close();return {reduced,listeningPxChangedBetween300msFrames:listening,processingPxChanged:proc,runningAnimationsAtEnd:kf};
}
console.log(JSON.stringify(await run(false)));console.log(JSON.stringify(await run(true)));
await browser.close();
