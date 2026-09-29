import { chromium } from '/Users/eugeniotamburini/Documents/knowunity-sprint/node_modules/playwright/index.mjs';
import { createHash } from 'node:crypto';
import { writeFileSync } from 'node:fs';

const OUT = '/Users/eugeniotamburini/Documents/knowunity-sprint/eval/screens-03';
const BASE = 'http://localhost:3000';
const T1 = '/recap/renaissance-philosophy';
const T2 = '/recap/the-reformation';
const log = [];
const browser = await chromium.launch();

const GRANT = `navigator.mediaDevices.getUserMedia = async () => ({ getTracks: () => [{ stop(){} }] }); window.__gum = (window.__gum||0);`;
const DENY = `navigator.mediaDevices.getUserMedia = async () => { throw new DOMException('denied','NotAllowedError'); };`;
const COUNT = `(()=>{const o=navigator.mediaDevices.getUserMedia.bind(navigator.mediaDevices);window.__gumCalls=0;navigator.mediaDevices.getUserMedia=async(...a)=>{window.__gumCalls++;return o(...a)};})();`;

async function scenario(name, mic, fn) {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, colorScheme: 'dark' });
  const page = await ctx.newPage();
  const errs = [];
  page.on('console', m => { if (['error','warning'].includes(m.type())) errs.push(`${m.type()}: ${m.text().slice(0,200)}`); });
  page.on('pageerror', e => errs.push('pageerror: ' + e.message.slice(0,200)));
  page.on('response', r => { if (r.status() >= 400) errs.push(`http ${r.status()} ${r.url().replace(BASE,'')}`); });
  await page.addInitScript(mic === 'deny' ? DENY : GRANT);
  const shot = async (n, note='') => {
    await page.addStyleTag({ content: 'nextjs-portal,[data-nextjs-toast],[data-next-badge-root]{display:none!important}' }).catch(()=>{});
    // Make a capture deterministic without misrepresenting the screen:
    // finite animations (the 200ms state-change transitions) are run to
    // their END, so a still shows the state the screen has settled into;
    // infinite loops (the breathing mic) are paused at time 0, so they
    // don't hash differently on every shot. Pausing everything at 0 froze
    // the idle→paused colour transition on its first frame and made the
    // Paused mic look like the Idle one. Motion is verified by its own
    // run (90-93), not by these stills.
    await page.evaluate(() => document.getAnimations().forEach(a => {
      try {
        const it = a.effect?.getTiming().iterations;
        if (it === Infinity) { a.currentTime = 0; a.pause(); } else { a.finish(); }
      } catch {}
    })).catch(()=>{});
    await page.waitForTimeout(60);
    await page.waitForTimeout(350);
    const buf = await page.screenshot({ path: `${OUT}/${n}.png` });
    const m = await page.evaluate(() => ({ url: location.pathname + location.search, sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth, h1: document.querySelector('h1')?.textContent ?? null, bg: getComputedStyle(document.body).backgroundColor }));
    log.push({ name: n, hash: createHash('md5').update(buf).digest('hex'), note, ...m });
  };
  const go = async (p) => { await page.goto(BASE + p, { waitUntil: 'networkidle' }); };
  try { await fn({ page, shot, go }); } catch (e) { log.push({ name: name + '-ERROR', error: e.message.slice(0,300) }); }
  log.push({ name: name + '-console', errs });
  await ctx.close();
}

await scenario('nav', 'grant', async ({ shot, go }) => {
  await go('/'); await shot('01-home');
  await go('/due-list'); await shot('02-due-list');
  await go('/due-list?caughtUp=1'); await shot('03-due-list-caught-up');
  await go(T1); await shot('04-recap-t1');
  await go(T2); await shot('04b-recap-t2');
});

// voice path, all three terms, grant
for (const i of [0,1,2]) {
  await scenario('voice-t'+(i+1), 'grant', async ({ page, shot, go }) => {
    await go(`${T1}/prompt/${i}`); await shot(`05-prompt-t${i+1}-idle`);
    if (i===0) {
      await page.getByRole('button', { name: /more|menu|⋯|options/i }).last().click().catch(()=>{});
      await shot('05x-prompt-t1-menu-open');
      await page.keyboard.press('Escape'); 
      await go(`${T1}/prompt/${i}`);
    }
    await page.locator('main button, button').filter({ has: page.locator('svg') }).first(); // noop
    await page.getByRole('button', { name: /start speaking/i }).click();
    await shot(`06-prompt-t${i+1}-listening`);
    await page.waitForTimeout(600); await shot(`06b-prompt-t${i+1}-listening-later`, 'same state 600ms later: motion check');
    await page.getByRole('button', { name: /speaking|pause|listening|stop/i }).first().click();
    await shot(`07-prompt-t${i+1}-stopped`);
    await page.getByRole('button', { name: 'Submit' }).click();
    await page.waitForURL(/processing/);
    await page.waitForTimeout(150); await shot(`08-processing-t${i+1}-early`);
    await page.waitForTimeout(450); await shot(`08b-processing-t${i+1}-late`, 'same state ~1s later: motion check');
    await page.waitForURL(/result/, { timeout: 6000 });
    await shot(`09-result-t${i+1}`);
  });
}

// cancel path + skip on last + exit sheet
await scenario('cancel-skip-exit', 'grant', async ({ page, shot, go }) => {
  await go(`${T1}/prompt/0`);
  await page.getByRole('button', { name: /start speaking/i }).click();
  await page.getByRole('button', { name: 'Cancel' }).click();
  await shot('05z-prompt-t1-after-cancel', 'should equal idle');
  await page.getByRole('button', { name: /menu|more|options/i }).first().click().catch(()=>{});
  await shot('05x-prompt-t1-menu-open');
  const end = page.getByText('End session'); if (await end.count()) { await end.first().click(); await shot('05y-prompt-t1-exit-sheet'); }
  await go(`${T1}/prompt/2`);
  await page.getByRole('button', { name: 'Skip' }).click(); await page.waitForTimeout(600);
  await shot('05w-skip-on-last-term', 'expect summary');
});

// denied — since 2026-09-21 a refusal switches to the field itself
await scenario('denied', 'deny', async ({ page, shot, go }) => {
  await go(`${T1}/prompt/0`);
  await page.getByRole('button', { name: /start speaking/i }).click(); await page.waitForTimeout(400);
  await shot('20-prompt-t1-denied', 'auto-switched to text + notice');
  await go(`${T1}/prompt/1`); await shot('20d-prompt-t2-after-denial', 'text mode + notice persist across terms');
  await page.getByRole('button', { name: /use voice instead/i }).click(); await page.waitForTimeout(200);
  await shot('20e-prompt-t2-voice-restored', 'mic back, notice gone');
  await page.getByRole('button', { name: /start speaking/i }).click(); await page.waitForTimeout(400);
  await shot('20f-prompt-t2-denied-again', 'second refusal returns to the field');
});
await scenario('denied-hint', 'deny', async ({ page, shot, go }) => {
  await go(`${T1}/hint/1`); await shot('10-hint-t2-idle');
  await page.getByRole('button', { name: /start speaking|tap|mic/i }).first().click().catch(()=>{}); await page.waitForTimeout(300);
  await shot('21-hint-t2-denied');
});

// typed path
await scenario('typed', 'grant', async ({ page, shot, go }) => {
  await go(`${T1}/prompt/0`);
  await page.getByRole('button', { name: /type instead/i }).click();
  await shot('22-prompt-t1-text-empty');
  await page.getByRole('textbox').fill('Humanism is the renaissance focus on human reason and the classics.');
  await shot('23-prompt-t1-text-filled');
  await page.getByRole('button', { name: 'Submit' }).click(); await page.waitForURL(/processing/);
  await page.waitForTimeout(150); await shot('24-processing-typed');
  await page.waitForURL(/result/, { timeout: 6000 }); await shot('25-result-t1-typed-echo');
  await go(`${T1}/prompt/1`); await shot('25b-prompt-t2-text-sticky', 'text mode sticky across terms');
});

// miss loop: prompt t2 -> result -> hint -> re-record -> result
await scenario('miss-loop', 'grant', async ({ page, shot, go }) => {
  await go(`${T1}/result/1`); await shot('09-result-t2-fresh');
  await page.getByRole('button', { name: 'Hint' }).click(); await page.waitForURL(/hint/);
  await shot('10-hint-t2');
  await page.getByRole('button', { name: /tap|speak|mic/i }).first().click(); await page.waitForURL(/record=1/);
  await shot('13-hint-to-prompt-record1', 'arrives listening');
  await page.getByRole('button', { name: /stop recording/i }).click();
  await shot('13b-prompt-t2-stopped-after-hint');
  await page.getByRole('button', { name: 'Submit' }).click(); await page.waitForURL(/result/, { timeout: 6000 });
  await shot('13c-result-t2-after-hint-rerecord', 'compare with 09-result-t2-fresh: does hinting change anything');
  await go(`${T1}/result/2`); await shot('09-result-t3-fresh');
  await page.getByRole('button', { name: 'Hint' }).click(); await page.waitForURL(/hint/); await shot('10-hint-t3');
  await page.getByRole('button', { name: 'Repeat question' }).click(); await page.waitForURL(/prompt/); await shot('13d-prompt-t3-after-repeat-question');
});

// grading & summary
await scenario('grade-summary', 'grant', async ({ page, shot, go }) => {
  await go(`${T1}/result/0`);
  await page.getByRole('radio', { name: /difficult/i }).click(); await shot('09b-result-t1-graded-difficult');
  await go(`${T1}/result/1`); await page.getByRole('radio', { name: /easy/i }).click(); await shot('09b-result-t2-graded-easy');
  await go(`${T1}/result/2`); await page.getByRole('radio', { name: /difficult/i }).click(); await shot('09b-result-t3-graded-difficult');
  await page.getByRole('button', { name: /menu|more|options/i }).first().click().catch(()=>{});
  const end = page.getByText('End session'); if (await end.count()) { await end.first().click(); await shot('09c-result-t3-exit-sheet'); }
  await go(`${T1}/summary`); await shot('11-summary-after-grading');
  await go(`${T2}/summary`); await shot('11b-summary-topic2-ungraded');
});
await scenario('summary-fresh', 'grant', async ({ page, shot, go }) => {
  await go(`${T1}/summary`); await shot('11a-summary-fresh');
  await page.getByRole('button', { name: 'Continue' }).click(); await page.waitForTimeout(500); await shot('11c-summary-continue', 'chain to next topic');
});

// 404s and refresh
await scenario('404', 'grant', async ({ page, shot, go }) => {
  await go('/recap/nope'); await shot('12-404-topic');
  await go(`${T1}/prompt/9`); await shot('12b-404-term');
  await go('/nowhere'); await shot('12c-404-route');
  await go(`${T1}/processing/9`); await shot('12d-404-processing');
  await go(`${T1}/prompt/abc`); await shot('12e-404-nan');
  await page.getByRole('button').first().click(); await page.waitForTimeout(500); await shot('12f-404-way-out');
});

// mic permission on entry
await scenario('perm-on-entry', 'grant', async ({ page, go }) => {
  await page.addInitScript(COUNT);
  for (const p of ['/', '/due-list', T1, `${T1}/prompt/0`, `${T1}/hint/1`, `${T1}/result/1`]) { await go(p); }
  const n = await page.evaluate(() => window.__gumCalls);
  log.push({ name: 'perm-on-entry', getUserMediaCallsOnEntry: n });
});

await browser.close();
writeFileSync(`${OUT}/_log.json`, JSON.stringify(log, null, 1));
console.log(log.filter(l=>l.error||l.getUserMediaCallsOnEntry!==undefined).map(l=>JSON.stringify(l)).join('\n'));
console.log('shots', log.filter(l=>l.hash).length);
console.log(log.filter(l=>l.errs?.length).map(l=>l.name+': '+l.errs.join(' | ')).join('\n'));
