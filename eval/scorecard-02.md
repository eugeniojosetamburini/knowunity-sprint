# Scorecard 02 — voice active recall prototype

Graded against `eval/rubric.md`, 2026-09-21 (later run, after the scorecard-01 fixes). Rendered at 390px, dark mode, on `localhost:3000` (dev server). Four critics ran in separate contexts; each received only the routes, the screenshots in `eval/screens-02/`, the rubric and its own dimensions. None saw another critic's output, and each reported it did not open `scorecard-01.md` or `figma-parity-01.md`. Nothing in the app was changed: `git status` lists the same 36 entries as at the start.

## Total

**6.83 / 10** — weighted, three adversarial critics, `Σ(score × weight) / 18` exactly as `eval/rubric.md` writes it. Scorecard-01 scored 6.42 by the same formula (+0.41).

**The rubric's divisor is wrong.** The weights are 4+4+4+4+2+1 = **19**, not 18, so a perfect submission would score 10.56. Corrected (`/ 19`) this run is **6.47** and scorecard-01 is 6.08 (+0.39). I kept the rubric's own formula as the headline so the two scorecards stay comparable and I have not edited the rubric; the divisor is the user's call.

**Hard gates: 0 of 4 failed** (scorecard-01: 2 of 4). Two of the four sit close to their line; see Hard gates.

| Dimension | Weight | Score | Points | Critic | What the score rests on |
| --- | --- | --- | --- | --- | --- |
| System fidelity | High ×4 | 7.5 | 30.0 | critic-system | Every `var(--…)` in `app/` and `stories/` resolves in `build/css/tokens.css` (sole exception `--progress`, set inline); 0 `var(--x, fallback)`, 0 `--primitive-*` in page modules. Computed colours map to semantic tokens (eyebrow `rgb(145,120,230)` = `text.link`, ActionSheet `rgb(34,36,47)` = `background.surface`). Exactly one Primary-coloured button on each of 12 routes, never beside a Destructive |
| Coherence | High ×4 | 6.5 | 26.0 | critic-craft | Frame l=0/w=390, AppBar h=64, back `[4,8,48,48]`, ⋯ `[338,8,48,48]`, progress track `[84,20,222,24]`, eyebrow t=88, callout cy=721, "Type instead" cy=763 identical on 11 flow routes in both topics. Bubble left edge 104 → 110, outcome label x 169 → 137, recap CTA top 744 vs 764 everywhere else, bar at 100% on term 3's unanswered prompt |
| Craft | High ×4 | 5.5 | 22.0 | critic-craft | Trigger zone 259px and mic box `[139,585,112,112]` identical on prompt, processing and hint. No motion: processing at t=0 vs t=1.4s = 0 px changed, listening mic over time = 0 px; 1 `@keyframes` (unused Button spinner), 0 `transition`, 0 `:active`, 1 `:hover` in `app/` + `stories/components/` |
| UX judgment | High ×4 | 5.5 | 22.0 | critic-ux | Flow clicked end to end: idle → listening → stopped → processing → result → hint → re-record → result → continue → skip → summary; denied, typed, ⋯ exit and mid-flow refresh. Skipped all three terms without speaking and the Summary still read "You just said 3 terms back out loud · 33% explained unaided" |
| Accessibility | Medium ×2 | 7.5 | 15.0 | critic-ux | Every text/surface pair on all screens computed from rendered colours: worst body 4.86:1, worst large 6.66:1. Every tap target probed with `elementFromPoint` from its centre: minimum effective hit box 44×44 |
| Structure | Low ×1 | 8.0 | 8.0 | critic-system | 18 routes at 390×844: `scrollWidth − clientWidth = 0` on all; AppBar 64.0px on all six flow routes; sticky bottom nav re-measured after `scrollTo(0, 99999)` at viewport heights 844 / 667 / 560; 0 page errors, 0 4xx asset requests; back/forward and mid-flow refresh survive. `npm run build` passes; `npm run lint` 0 errors, 2 warnings |
| **Total** | | | **123.0 / 18** | | **6.83** |

**Movement since scorecard-01** (different critic instances, so ±0.5 is within run-to-run noise): System fidelity 7.5 → 7.5, Coherence 6.5 → 6.5, Craft 5.5 → 5.5, UX judgment 5.0 → 5.5, Accessibility 5.5 → 7.5, Structure 6.5 → 8. The gains are in the two dimensions the fixes touched (gates, the 404 page, lint, Skip, grade persistence); the three dimensions that need new behaviour, not repair, did not move.

### Reconciliation notes

- **No averaging was needed.** The three critics' dimension sets do not overlap. No score was edited. Where two critics measured the same thing the numbers agree (no motion: craft, UX and my own pixel diff; summary asserted: UX and ambition; no read-back of spoken answers: UX and ambition).
- **8+ rule.** Only Structure reached 8, and it cites renders and numbers (18 routes, scroll-width 0, nav re-measured at three viewport heights). It stays below 9 because the rubric's 9 band asks for `verify-screen.mjs --figma` and no console warnings; neither holds. No dimension is over-credited by the rule.
- **Structure's `npm run build` is the critic's run, not mine.** I re-ran `npm run lint` (0 errors, 2 warnings) and `npm run check:tokens` (exit 0) myself. I did not re-run `next build`: it writes the same `.next` directory the dev server is serving from, and I would risk corrupting the running app.
- **Three of critic-craft's findings are frame-faithful, not build defects,** per `eval/figma-parity-01.md` (read by me after the critics reported): the bubble hop 104 → 110 (finding 4; the frames draw it), the recap CTA on its own row (finding 5; recap bottom 800 matches its frame), and the recorded state being the idle mic (finding 2; frame `15783:7103` draws `voiceInput` as Idle). Coherence and Craft measure the *product*, and the frames disagree with one another, so the critic's reading stands and I did not adjust its score. The parity file predates today's fixes but none of them touched layout. If the user rules that faithful-to-frame is not a coherence defect, Coherence is the score that would move up.
- **One critic claim is contradicted by the docs.** critic-craft (finding 3) called the missing partial icon an "undocumented deviation". `docs/design-system.md:206-207` records it as a known gap that "matches the Figma component exactly, not an oversight in the build". It is undocumented in `sprint-context.md` only. The visible consequence (outcome label 32px further left on partial) still stands.
- **One disagreement inside the docs.** critic-system (finding 2) says `Chips` for the recap's three terms breaks the "non-tappable label is not a chip" rule (`docs/design-system.md:31-36`). The same file at `:312` sanctions `brand` chips for "recap/topic tagging". I cannot settle it without a Figma read of what the frame's chips do; it is listed as contested and did not move System fidelity.
- **System fidelity is at the top of its range.** It carries an open CLAUDE.md-rule item (`mascot-peeking.png` uploaded and unused, S-3) and a repeat of the 6-band example (component default copy left in place, S-4), while the 9 band requires "no inline component anywhere" and five copies of one text link remain (S-1). I left the critic's 7.5.
- **UX judgment's 5.5 sits on the 4/6 boundary.** The rubric's 4 band names "hint copy gives the answer away" and "summary asserts a percentage with nothing behind it"; both were reproduced (U-1, U-2), yet every Must state is present and behaves, which is the 6 band. Half a point up from scorecard-01 reflects the fixed Skip, the fixed grade write-through and the 404 page.

## Hard gates

| Gate | Result | Evidence |
| --- | --- | --- |
| Contrast ≥ 4.5:1 body text | **PASS** | critic-ux, computed from rendered colours on `/`, `/due-list` (both states), recap, prompt (idle / listening / stopped / denied / text-empty / text-filled), processing, result ×3, hint, summary, 404, ⋯ menu, exit sheet. Worst body pair **4.86:1** (textarea placeholder `rgba(245,243,255,.52)` on `rgb(34,36,47)`, 0.36 above the line); worst large pair 6.66:1; lowest others: ⋯-menu "End session" 5.21, "Difficult" 5.56, eyebrow 5.6. The one pair under 4.5 is the *disabled* text-mode Submit at **3.69:1**, exempt as an inactive control. No text sits over mascot art |
| Touch targets ≥ 44pt | **PASS**, by expanded hit area | critic-ux probed each control with `elementFromPoint` outward from its centre. Back 48×48, ⋯ 48×48, Skip 62×48, mic 112×112, "Type instead" 82×44, grade rows 342×64, Retry/Continue 165×56, ⋯-menu item 150×44, sheet buttons 342×56. Visual boxes under 44 (chips and badges 40 tall, avatar 24×24) reach 44×44 through `stories/components/hitArea.module.css`. Two probes read 0×0 for benign reasons (a chip off-viewport in a scrolling row; the dev-tools overlay covering "MyAI") |
| No raw hex in source | **PASS** | `npm run check:tokens` exit 0, re-run by me and by critic-system; 0 `rgb()`/`hsl()` literals in code, 0 `var(--x, #y)` fallbacks |
| No two states that should differ render identically | **PASS on the named pairs, with four near-misses** | Full-screen diffs, threshold 8/255: idle vs listening 6.43%, listening vs stopped 6.53%, pass vs incorrect 28.91%, incorrect vs partial 37.24%, hint vs prompt 4.98% (critic-craft's independent diffs differ by up to 0.5 point, e.g. idle vs listening 6.88% and idle vs stopped 0.86%, from a different threshold, but reach the same verdicts). Near-misses below |

**Near-misses on the state gate** (my captures, `eval/screens-02/`):

1. **idle vs stopped:** 0.86% of the screen; the 112px mic disc is **0 px** different. Only the Submit pill and the caption string change. Frame-faithful (`15783:7103` draws Idle), still weak.
2. **processing vs denied:** the mic disc is **0 px** different (both `disabled`); the callout string and the bubble differ.
3. **denied, then tapping the mic again:** `20-prompt-t1-denied` vs `20b-…-after-second-tap` = **0.00%**. The tap is silent.
4. **result after the first attempt vs result after hint → re-record:** `09-result-t2` = `09-result-t2-fresh` = `13c-result-t2-after-hint-rerecord`, **byte-identical** (same md5). This is not one of the rubric's named pairs, so I did not fail the gate; a strict reading of "states that should differ" would, because a second attempt after a nudge is a different state. The decision is the user's.

## State comparison (orchestrator, before the critics ran)

64 captures at 390×844, dark mode, `deviceScaleFactor` 2: all routes; all three terms on prompt idle / listening (+600 ms later) / stopped; processing early (~0.5 s) and late (~1 s), voice and typed; results for all three outcomes, fresh and after grading; hint on terms 2 and 3, denied, and after re-record; **failure paths:** mic denied on prompt and on hint, second tap after denial, denial then "Type instead", text mode sticky on term 2, empty and filled text, cancel after listening, Skip on the last term, ⋯ menu and exit sheet on prompt and result, and five unknown URLs (topic, term, route, processing term, non-numeric term). Contact sheets: `eval/sheets-02/`. Harness: `eval/screens-02/_scripts/`. Every route: `scrollWidth === clientWidth === 390`, body `rgb(9,12,24)` (64 of 64). `getUserMedia` calls on entry to `/`, `/due-list`, recap, prompt, hint and result: **0**. Flagged, not fixed:

- **No motion:** `06-prompt-t1-listening` vs the same state 600 ms later = 0.00%, on all three terms; `08-processing-*-early` vs `-late` = 0.00% on terms 1 and 2 (term 3's late capture landed on the same processing frame). This is the state pair the rubric cares about most, and it never changes.
- **The four near-misses above.**
- **Identical hashes, expected (same state, two routes):** idle = after-cancel; listening = hint-then-record; stopped = stopped-after-hint; denied-then-text = text-empty; term 2 after denial = text-sticky; skip-on-last = fresh Summary; Summary → Continue = topic 2's recap; 404 way-out = due list; the five unknown URLs render one identical 404.
- **Summary looks the same for both topics:** 33% · 1 right / 1 partial / 1 incorrect on both, with only the term names changing (`11a` vs `11b`, 1.06% of pixels). Tapped grades do reach the table (Easy / Difficult / Medium → Difficult / Easy / Difficult, 0.79%) but the 33% does not move.
- **Console:** the LCP image warning on `/due-list` (`card-image`); a CSS-preload warning on one run; the three expected 404 logs on the unknown-route captures. Dev-server behaviour, not a production build.
- **Harness limits:** the dev-tools badge is hidden by CSS in these shots; mic states use a stubbed `getUserMedia`, not the iOS permission dialog; one filename (`05x-prompt-t1-menu-open`) was written by two scenarios and holds the second, identical shot.

## Findings

Merged across critics; "raised by" shows who found it independently. Severity is mine, ordered by what a student hits. Tags: **U** UX, **C** craft/coherence, **S** system, **A** accessibility.

### Breaks the recall loop

**U-1. The Summary reports a session the student never had.** Raised by critic-ux (1) and critic-ambition (settles 1); reproduced in my captures. critic-ux tapped Skip three times from `/prompt/0`; the Summary read "You just said 3 terms back out loud · 33% explained unaided · 1 right / 1 partial / 1 incorrect", Theocentrism graded "Medium · Review in 2 days". `app/due-terms.ts:215-221` (`tallyTopic` reads the static `term.outcome`), `:241-245` (`summarySubtitle`). The tapped grade now reaches the table (scorecard-01 F1 fixed) but never the headline. Violates `docs/sprint-context.md:20` and the brief's earned-not-asserted claim; carried from scorecard-01 F2.

**U-2. The miss result states the full answer, then offers a hint for it.** critic-ux (2), and visible on `09-result-t2.png`: "That's the reverse. Anthropocentrism puts human concerns, not God's order, at the centre." precedes Hint → "Think about what sits at the centre, and why." (`due-terms.ts:90` vs `:92`). The "no reveal" decision (`sprint-context.md:27`) is nominal. Rubric UX-4 names this pattern. **New this run.**

**U-3. A second attempt is invisible to the system.** critic-ux (3); my captures confirm byte-identical results (near-miss 4). Result → Hint → mic → `/prompt/1?record=1` → Submit returns the same "Incorrect", same sentence, same preselected Difficult, Hint offered again; nothing records that a hint was taken (`result/[termIndex]/page.tsx:124-129`). Carried from F8.

**U-4. A denied microphone is not routed to text, and is forgotten on every screen.** critic-ux (4), critic-craft (8), my captures (`20b` 0.00%). Mic renders `disabled`, "Microphone is off", no explainer, no auto-switch; a tap does nothing (Playwright click timed out at 30 s); after typing term 1, "Use voice instead" shows a live mic on term 2 that fails again. `prompt/[termIndex]/page.tsx:105-120` (`setDenied` is per-screen `useState`), `hint/…/page.tsx:82-90`. `sprint-context.md:34` says text is "the destination a denied student is routed to". Carried from F7; not fixed on purpose in scorecard-01.

**U-5. Leaving does not resume.** critic-ux (8). ⋯ → End session returns to Home with the topic still due, but Ready always routes to `/prompt/0` (`recap/[topicId]/page.tsx:97`), so a student who quit on term 3 redoes term 1 while their grades survive in session storage. **New this run.**

**U-6. A spoken answer is never echoed back.** critic-ux (6), critic-ambition (settles 4). The "You typed" block is gated on `typedAnswer` (`result/[termIndex]/page.tsx:174-179`), so "misheard" and "wrong" look the same, on the screen where the brief's false-wrong risk sits. `voice-ux.md` §4. Carried from F11.

**U-7. Dead controls.** critic-ux (7). "Change review time" (`summary/page.tsx:137-139`) does nothing; the recap entry's ⋯ opens nothing because `AppBar` gets no `menuItems` (`recap/[topicId]/page.tsx:71`; also noted by critic-ambition); a due-list card's "More options" navigates into the topic. Carried from F12.

### State, motion and craft

**C-1. No motion anywhere, and the wait is a frozen frame.** critic-craft (1, high), critic-ux (5), critic-ambition (settles 2, 3), my diffs (0.00%). `document.getAnimations()` = `[]` on the listening prompt and `0` on `/processing/0`; screenshots 1.5 s apart md5-identical. Only `@keyframes` is `Button.module.css:195` `spin`, unused by any flow screen; `voice-ux.md` §6 and rubric Craft-6 ask for a calm animated thinking state. Carried from F9.

**C-2. The recorded state is the idle mic plus a pill.** critic-craft (2, high), my near-miss 1. `prompt/[termIndex]/page.tsx:213` maps `stopped` to `idle`; the disc is 0 px different. **Frame-faithful** (parity-01: the frame draws Idle); fixing it is a departure to log. Carried from F10.

**C-3. Partial has no status icon.** critic-craft (3). `ChatBubble.tsx:43-45` draws icons for correct and incorrect only; `svgsInBubble = 0` on result/2, so the outcome label starts at x=137 against x=169 on the others. Documented as a known gap that matches the Figma component (`design-system.md:206-207`). Carried from F13.

**C-4. Progress reads 25% before the session and 100% on an unanswered term 3.** critic-craft (6). Measured fills on the 222px track: recap 25.0%, prompt/0 25.0%, prompt/1 75.0%, prompt/2 100.0%. The 25/75/100 rule is logged and every frame draws 25, but `recap/[topicId]/page.tsx:71` hardcodes `progress="25"` instead of reading `progressForTerm` (I read the line). Carried from F17.

**C-5. The text fallback does not swap in place: the mode toggle moves 27px.** critic-craft (7), one critic only. "Type instead" box top 741 in voice mode; "Use voice instead" top 768 in text mode. Zone arithmetic in `TypeTrigger.module.css:14-16` says 204px (field 104, Submit 32); rendered 215px (field 99, Submit 48). **New this run; I did not re-measure it.**

**C-6. Bubble hops 6px between prompt/processing and result/hint** (left 104 → 110, gap 10 → 16; `prompt/…/page.module.css:46`, `processing/…/page.module.css:50` vs `hint/…/page.module.css:46`). critic-craft (4). **Frame-faithful** (parity-01). Carried from F15.

**C-7. Recap CTA on its own row** (top 744 vs 764 elsewhere; `recap/[topicId]/page.module.css:117`). critic-craft (5). **Frame-faithful** (recap bottom 800 matches its frame). Carried from F16.

**C-8. Copy is one voice but templated.** critic-craft (9). All six hints open "Think about …" (`due-terms.ts:83, 92, 101, 118, 127, 136`; I confirmed). The hyphen in "In your own words - " is frame-verbatim; critic-craft's fix would break the CLAUDE.md match-the-frame rule. Carried from F18.

**U-8. Knowie's voice goes clinical on the miss.** critic-ux (10). The bubble label is the bare "Incorrect" in a full-bleed red bubble. The `Incorrect` label matches the frame; the counter-proposal is a content departure like the ones already logged. Low.

### System

**S-1. One underlined text link hand-drawn in five modules under four class names**, with two padding values and two hit boxes (`prompt` :105, `hint` :76, `TypeTrigger` :44 at `space-300 0`; `due-list` :83, `summary` :80 at `space-300 space-200`). critic-system (1); `component-gaps.md:26` lists it Open. Carried from F21.

**S-2. `Chips` for three non-tappable terms on the recap** (`recap/[topicId]/page.tsx:86`, no `onClick`; renders `<button>`). critic-system (2). **Contested**: `design-system.md:31-36` forbids it, `:312` sanctions it.

**S-3. `public/images/mascot-peeking.png` is referenced by nothing;** the Summary uses `Mascot state="excited"` (`summary/page.tsx:115`) with a comment describing a "peeking look". CLAUDE.md says use the uploaded file. critic-system (3); unverifiable against the frame without Figma.

**S-4. The recap's Knowie line is `ChatBubble`'s default prop** (`recap/[topicId]/page.tsx:79`, no `neutralText`; text from `ChatBubble.tsx:28`). critic-system (4); also raised by critic-ambition as the least-working screen. Carried from F23.

**S-5. Result passes one string to all three of `ChatBubble`'s independent state props** (`result/[termIndex]/page.tsx:186-188`). critic-system (5). **New**, low.

**S-6. Two stale source comments** in `processing/[termIndex]/page.tsx:60-62` ("every term currently resolves to Pass") and `:43-45` ("already asked for on the entry screen's mic tap"). critic-system (6). **New**, low.

**S-7. LCP console warnings** on `/due-list` and `/processing/*`. critic-system (7); my capture saw the `/due-list` one. Dev-only heuristic. Carried from F26.

### Accessibility (gates pass; these are what held the score at 7.5)

**A-1. No `aria-live` on the prompt callout**, so idle → listening → stopped is announced to nobody, while processing does have `aria-live="polite"`. critic-ux (9).
**A-2. The exit sheet is `aria-modal="true"` with focus moved in and Escape working, but no focus trap or `inert`:** Tab past "Keep going" reaches the controls behind it. critic-ux (9).
**A-3. Focus ring is the browser default** (`rgb(153,200,255) auto 1px`), untokenised; prompt, hint and processing render no `h1`; the denied mic is a `disabled` button and drops the only status text from tab order. critic-ux (9).

### Verified fixed since scorecard-01 (re-checked on the render)

F1 grade write-through (Summary table changes with taps), F3/F4 gates (contrast and touch), F5 404 (all five unknown URLs render in `Scaffold` at `rgb(9,12,24)` with a working "Back to due list" → `/due-list`), F6 Skip on the last term (→ `/summary`), F19 resize grabber (not seen on the text-field captures), F25 lint (0 errors). Not re-raised this run and therefore neither confirmed nor cleared: F14 (three colours for Partial/Medium), F20 (Repeat question weight), F22 (screen-local `MicTrigger`/`TypeTrigger`), F27 (259px literal).

### Verified clean (measured, from the critics)

`Scaffold` owns every route including the 404; `AppBar` on the six flow routes and `TopNav` only at Home level; `ActionSheet` (slot 4) on results and `BottomSheet` (slot 5) for exit; `TextField` not `TextBlock` for typed input; one Primary per screen on all 12 routes checked; `chatActive` false on the due list and default on Home; `ProgressIndicator` `variant="primary"` set explicitly; text mode sticky across terms and hard reload; mic permission never on entry (0 `getUserMedia` calls on six routes, mine); no horizontal overflow on any route (0 of 64 captures); typed answer survives a reload on the result.

## Addendum — recall-loop findings fixed (2026-09-21, after the run)

The scores, gates and findings above are the record of the run and are unchanged; re-grading would mean re-running the critics. U-1 (the static 33%) was left as is on purpose: the percentage is static for the prototype.

| Finding | Fix | Verified by |
| --- | --- | --- |
| **U-2** miss states the answer | All six `miss` lines in `app/due-terms.ts` say the answer was off and point at the hint | Incorrect bubble still 256×160 on term 2 |
| **U-3** second attempt invisible | Opening the hint records it; the next submission (spoken or typed, from prompt or hint) is the second attempt and reads one step kinder (`outcomeAfterHint`), with no Hint button on it. Ready clears a topic's grades, typed answers and hint state | Term 2: first result Incorrect + Hint + Difficult → after hint and re-record Partial, Medium, no Hint. Term 3: Partial → Correct, Easy. Back from the hint without answering: result unchanged, Hint gone. Plain Retry: unchanged. Summary shows Medium for the retried term. After Ready: Incorrect and Hint again |
| **U-4** denied mic | A refusal turns text mode on and shows "Microphone is off. Type your answer, or allow it again in Settings." (`role="status"`); the disabled-mic state is gone from prompt and hint. `textMode.ts` renamed `sessionState.ts` | Denied `getUserMedia`: field appears on prompt and hint; stays on term 2; "Use voice instead" restores the mic and a second refusal returns to the field; zone 585/259 and eyebrow, bubble positions identical to idle; 0 `getUserMedia` calls on entry to six routes |

`tsc` clean, `npm run check:tokens` exit 0, `npm run lint` 0 errors and the same 2 warnings, `verify-screen.mjs` on `/recap`, prompt, processing, result, hint and summary: frame 0/390, bar 64, glyph edges identical. Evidence in `eval/fixes-02/`.

**Not changed, each because it contradicts a decision already logged:** U-5 (resume on re-entry: SPEC #15 and sprint-context say an abandoned topic returns "untouched, as though never started"), U-6 (echo of a spoken answer: SPEC #14 kept spoken results identical to the measured frames, and the transcript would have to be scripted), U-7 (dead controls: "Change review time", "Choose your own topics" and the recap ⋯ are logged as known inert). The due-list card's ⋯ navigating into the topic is not logged anywhere and is still open.

## Addendum — score-improvement work applied (2026-09-21, after the run)

The scores above are the record of the run and are unchanged; re-grading means re-running the critics. This is what changed in the app since, aimed at the dimensions the critics scored lowest. Evidence is in `eval/screens-03/` (64 stills, `_capture.mjs`, plus `90`–`93` for motion) and was measured on `localhost:3000` at 390px, dark mode.

### Motion — C-1, the largest single finding (Craft, UX, Accessibility)

`primitive.motion` had shipped with the token import and **nothing was ever bound to it**, so no component could use motion without reading a primitive directly, which CLAUDE.md forbids. Added `semantic.motion.press` / `.stateChange` / `.breathe`, plus one new primitive (`motion.duration.breathe`, 1400ms — the three existing durations are one-shot transition lengths and the longest reads as a blink when looped).

| What | Before | After |
| --- | --- | --- |
| Processing, two moments 350ms apart | 0 px changed | **3,927 px** (`90-motion-processing-live`) |
| Listening, two moments 350ms apart | 0 px changed | **4,253 px** (`91-motion-listening-live`) |
| Same, under `prefers-reduced-motion: reduce` | — | **0 px**, `document.getAnimations()` empty (`92`) |
| Idle, two moments apart | 0 px | **0 px** — a resting state, held still on purpose (`93`) |

Press feedback (`motion.press.scale`) added to `Button`, `ButtonIcon`, `Chips`, `Pill`, `Radio` and the new `TextLink`; there is no hover on mobile, so it is the only tap feedback there was. All of it is off under reduced motion.

### The recorded state — C-2

`voiceInput` gained a **`Paused`** state: Listening's fill, no glow, a pause mark. The stopped frame (15783:7103) draws `Idle` there, so this is a logged departure (SPEC.md #5b, `docs/design-system.md`, `docs/sprint-context.md`).

- Idle vs recorded, across the 112px disc: **0 px → 45,276 px**. Full screen 0.86% → 2.35%.
- Accessible name changes with it: "Start speaking" → "Resume recording".
- Processing vs denied, which were also 0 px apart on the disc: the denied state no longer renders a mic at all (see U-4 in the previous addendum), so the pair is gone.

### Coherence — C-4, C-5, and the bubble hop

- **Bubble left edge is now 110 on every screen** (was 104 on prompt and processing, 110 on recap, result and hint). The frames disagree — 10px gap on two, 16px on three — so it slid 6px sideways on every prompt → result step. Standardised on 16px (`space-400`), the majority value and the only one of the two that is a token. Same reasoning as the 259px trigger zone. No text re-wrapped: bubble heights are unchanged.
- **The mode toggle no longer moves.** "Type instead" and "Use voice instead" both measure **top 741** (text mode was 768). The zone's own comment claimed the content measured 204px in 215px of usable space; rendered it was 239px and **overflowing**, which is what pushed the link down. Field and Submit now share a block whose height *is* the voice zone's mic-plus-callout block, so the link cannot drift again; `rows=2` is what fits.
- **The recap's progress bar reads `progressForTerm(0)`** instead of a hardcoded `"25"`. Same 25% the frame draws, now from the single source every other screen uses.

### System fidelity — S-1, S-3, S-4, S-5

- **`TextLink` promoted** (`stories/components/TextLink`, with stories). It had been hand-drawn in five page modules under four class names, already drifted into two paddings. All five call sites migrated, four dead CSS blocks deleted, `component-gaps.md` marked built. The two paddings are now one component with a `flush` prop.
- **`mascot-peeking.png` is used.** The Summary rendered `Mascot state="excited"` while the uploaded art for that slot was referenced by nothing, against CLAUDE.md's "use the uploaded file" rule. Added as a fifth `Mascot` state. Its art is square where the others are not, so it renders ~5px shorter; no Figma access this session to confirm the frame's art, so it is flagged rather than assumed.
- **The recap's Knowie line moved into `app/due-terms.ts`** (`recapIntro`) instead of showing through from `ChatBubble`'s default prop. Text unchanged; only where it lives.
- **The result passes one text prop, not all three.** `ChatBubble` keeps `correctText` / `incorrectText` / `partialText` independent on purpose.

### Accessibility — A-1, A-2, A-3

- **The exit sheet traps focus.** It was `aria-modal="true"` with focus moved in but no trap, so Tab past "Keep going" reached the back arrow, ⋯ and Skip behind the scrim. Measured after: 8 consecutive Tabs stay on "End session" / "Keep going" and never leave the dialog; Escape still closes it.
- **The prompt callout is `role="status"`**, so idle → listening → paused is announced. It is the one thing on that screen that changes without a navigation.
- **One tokenised focus ring** in `app/globals.css` (`border.focus` + the heavy 2px stroke), replacing the browser default (`rgb(153,200,255) auto 1px`) — an undesigned colour from outside the palette.
- **Prompt, processing and hint now render an `h1`.** Each had none. The eyebrow became the heading; it carries all the styling, so nothing moved (eyebrow still 24/88, 342×15).

### Re-measured after all of it

| Check | Result |
| --- | --- |
| Contrast | **0 failures** across 17 routes plus the listening state, recomputed from rendered colours against 4.5:1 body / 3:1 large |
| Touch targets | **0 under 44pt**, `elementFromPoint` probed outward from each control's centre |
| Frame geometry | frame 0/390, `AppBar` 64, eyebrow t=88, zone 259, mic t=585 identical across prompt, processing and hint, both topics |
| Horizontal overflow | none on any of 17 routes; 64/64 captures `scrollWidth === clientWidth === 390` |
| Console | 0 errors, 0 page errors |
| `npm run build` | passes, 9 routes |
| `npm run lint` | 0 errors, the same 2 pre-existing warnings |
| `npm run check:tokens` | exit 0 |
| `tsc --noEmit` | clean |
| Storybook | **201/201 tests pass**, a11y included (was 194 before the new stories) |
| Recall-loop fixes from the previous addendum | re-verified end to end after these changes; unchanged |
| Mic permission on entry | still 0 `getUserMedia` calls on six routes |

**One capture-harness note for whoever re-runs this.** `eval/screens-03/_capture.mjs` finishes finite animations and pauses infinite ones at time 0, so stills are deterministic. An earlier version paused *everything* at 0, which froze the 200ms idle→paused colour transition on its first frame and made the Paused mic look like the Idle one in the PNGs while the live DOM measured magenta. Motion is evidenced by `90`–`93`, not by the stills.

**Not done, and why.** The Summary's 33% stays static at the user's instruction. The recap CTA still sits on its own row (764 elsewhere, 800 here): it matches its frame, and moving it would trade frame parity for a coherence point on a screen outside the prompt → result sequence. Progress still reads 25/75/100 — a logged decision. `Chips` on the recap is still contested in `docs/design-system.md` (line 31 forbids a non-tappable label, line 312 sanctions brand chips for recap tagging); it needs a Figma read or a ruling, not a guess. The due-list card's ⋯ still navigates into the topic. No Figma PNGs on disk, so `verify-screen.mjs --figma` still could not run for any screen.

## Each critic's blind spot

- **critic-system.** No Figma access, so no `verify-screen.mjs --figma` on any screen; its likeliest miss is a per-screen variant or instance-count mismatch (a `Badge` count, the recap `Chips` colour, the summary mascot artwork; S-3 is the visible edge). `html { overflow-x: hidden }` (`app/globals.css:16`) makes its "no horizontal scroll" result partly enforced, which it offset with a bounding-box scan on initial states only. It did not audit the interior of every `stories/components/*` module, so a component binding a defensible-but-wrong semantic token would not show.
- **critic-craft.** No Figma exports, so it graded frame parity through internal consistency only, and three of its findings (C-2, C-6, C-7) turn out to be what the frames draw. No raised text size, landscape, mid-flow refresh or real `getUserMedia` denial. It named the summary rows' 61px pitch but did not check it against a token step.
- **critic-ux.** Headless Chromium with a stubbed `getUserMedia`, so no real iOS permission sheet, no genuine re-request behaviour after denial (which likely makes U-4 feel silently broken), no Safari safe-area under the sticky `ActionSheet`. No VoiceOver, Dynamic Type or 200% zoom; the hardcoded `<br />` in the grade headline (`result/…/page.tsx:209-211`) is where it expects the first overflow. It walked `renaissance-philosophy` end to end and `the-reformation` only through its Summary.
- **Shared by all three:** dev server, not a production build; no Figma-frame diff for any screen, which the rubric's 8+ bar asks for. `eval/figma-parity-01.md` covers frames read through the bridge (predating today's fixes), not a pixel scan.
- **Orchestrator (mine).** Static screenshots cannot show animation; the motion claim rests on pixel diffs between two moments plus the critics' `getAnimations()` reads. Mic states use a stubbed `getUserMedia`. I re-ran lint and `check:tokens` but not `next build` (see Reconciliation notes), and I did not re-measure C-5, S-3, U-5 or U-7's due-list case; those rest on one critic each.

## critic-ambition — kept separate, advisory, not in the total

**Ambition: 6.5 / 10.** The flow reaches past its frames in a few small, deliberate places, but the thing the brief calls hardest, a felt and earned "I know this now", is still asserted from scripted data, and the recording moment is a static gradient with no motion, no elapsed time and nothing heard back. Its score does not enter the weighted total. Scorecard-01 read 6.

**Where it reaches**
1. The typed answer is echoed above Knowie's reply on a screen whose frame has no slot for it (`result/…/page.tsx:174-179`), `voice-ux.md` §4 for the one case where the words are real.
2. Text mode lives in `sessionStorage` so a hard reload cannot put a refused student back in front of a microphone (`textMode.ts:28-44`).
3. The mic sits at one pixel row (259px) on every voice screen against five different frame heights (`sprint-context.md:42`), a thumb-ergonomics call, not a fidelity one.

**Where it settles**
1. Summary, every state: percentage, bar and rows come from `tallyTopic()`; a hint costs nothing and a skipped term still reports its scripted outcome (`due-terms.ts:215-221`).
2. Prompt, listening: colour, a waveform mark and a line of copy are the only evidence the app is recording; `06` and `06b` are the same frame.
3. Processing: "Thinking..." in a default `ChatBubble` with a disabled mic, unchanged from 0.2 s to 1.6 s.
4. Result, voice path: a verdict with nothing that was heard.
5. **Recap entry, the screen doing the least work:** eyebrow, headline, `ChatBubble` on its default text, three inert `Chips`, an inert `ButtonIcon`, one Ready. Identical for both topics and for a first visit and a return.
6. Home: the feature's whole activation surface is a `Badge` in the top bar (named as unspent, not proposed against the frame-parity rule).

**Stronger patterns proposed (existing components only)**
1. **Hinting costs the unaided count.** Record hint visits beside grades (`saveHinted` / `useHinted` next to `saveGrade` / `useGrades` in `textMode.ts`), and let `ResultCard` spend them: `percentage` (free text), `subtitle="explained unaided"`, `correctCount` / `partialCount` / `incorrectCount`, `summary`. `ResultTable` stays unchanged, since `difficulty` is a closed enum.
2. **Say what was heard on the voice path too.** A scripted `heard` line per term and outcome in `app/due-terms.ts`, rendered in the result's existing echo block relabelled "What I heard". It flags that block as an inline pattern, not a library component (`component-gaps.md` already records it), and rejects folding the text into `ChatBubble`'s `incorrectText` because that puts the student's words in Knowie's mouth.
3. **The recap remembers.** Set `ChatBubble` `state="default"` `neutralText` per topic from `app/due-terms.ts`, and on re-entry from the session store, with the frame otherwise untouched.

**Its blind spot.** It read screenshots and source and did not run the app, so anything carried by a route transition may be called static when it is only uncaptured. Proposal 3 depends on reading "text nodes are data" into CLAUDE.md's frame-match rule; if the rule covers copy, only 1 and 2 stand. If "explained unaided" was only ever a claim about the scripted demo, proposal 1 solves a problem the build does not have. It dropped one idea (a level or elapsed-time readout while listening) because no component carries it, and named motion in `VoiceInput.module.css` as the cheap answer, a component change, not a recomposition.

Its patterns 1 and 2 and settle-points 1 and 4 overlap with U-1 and U-6 from the adversarial critics. That overlap is independent: ambition read no other critic's output.

## Files written

- `eval/scorecard-02.md` (this file)
- `eval/screens-02/` — 64 PNGs, `_log.json` (hashes, URLs, scroll widths, console output), `_scripts/` (capture, diff, disc and sheet scripts)
- `eval/sheets-02/` — seven contact sheets
- `eval/fixes-02/` — the recall-loop fixes' evidence (10 PNGs, `_results.json`)
- `eval/screens-03/` — the state set re-shot after both addenda: 64 PNGs, `_log.json`, `_capture.mjs`, `90`–`93` motion pairs, and two contact sheets
