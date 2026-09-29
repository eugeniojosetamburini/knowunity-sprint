# Scorecard 03 — voice active recall prototype

Graded against `eval/rubric.md`, 2026-09-29. Every state was rendered at 390×844 @2x, dark mode, on `localhost:3000` (dev server) into `eval/screens-03/` (64 stills, replacing the Sep 21 set; the old ones stay in git history). Four critics then ran in separate contexts. Each got only the routes, the screenshots, the rubric and its own dimensions. None saw another critic's output or any earlier scorecard, and each reported it did not open `scorecard-*.md` or `figma-parity-*.md`. Nothing in the app was changed.

## Total

**6.56 / 10**, weighted across the three adversarial critics with the rubric's own formula, `Σ(score × weight) / 18` = 118 / 18. Scorecard-02 scored 6.83 by the same formula (−0.27).

**The rubric's divisor is still wrong.** The weights are 4+4+4+4+2+1 = 19, not 18, so 10/10 would score 10.56. Corrected (`/ 19`) this run is **6.21** and scorecard-02 is 6.47 (−0.26). I kept the rubric's formula as the headline so the scorecards stay comparable and did not edit the rubric.

**Hard gates: 0 of 4 failed.** See Hard gates for how close two of them sit.

| Dimension | Weight | Score | Points | Critic | What the score rests on |
| --- | --- | --- | --- | --- | --- |
| System fidelity | High ×4 | 5.5 | 22.0 | critic-system | Computed eyebrow colour `rgb(145,120,230)` is `text.link`, whose own description forbids non-clickable text, on 5 screens. A primitive colour read in a library component (`Radio/icons.tsx:36`), a primitive weight and a raw `24px` in `Badge.module.css:105-106`. Page CSS forces `min-width:138px` on a Button's inner span. `--size-space-*`/`--size-radius-*` are primitives read directly (about 80 uses) because the semantic layer has no size group. `check:tokens` exits 0 |
| Coherence | High ×4 | 6.5 | 26.0 | critic-craft | Shell identical on 8 routes through `verify-screen.mjs`: frame l=0/w=390, AppBar 64, back glyph 22.75, ⋯ right edge 368, mic top 585, "Type instead" top 741; progress 25/75/100 per term on all four screens. Against that: bubble top 131→145→131 across prompt→processing→result, mascot top 145.5→135.5→173.5→133.5 in one term, white bottom button on rows 744 / 756 / 764, Summary inset 16 vs 24 everywhere else |
| Craft | High ×4 | 6.5 | 26.0 | critic-craft | Live computed styles: 1.4s `voiceInputBreatheScale` loop on the listening glyph and the disabled mic, 0.1s press scale, ~1926ms processing hold. Idle / listening / paused / processing differ in fill, glyph and animation. Held down by: no screen-to-screen motion (`animationName: none` on `main`, the screen-level motion token unused), Skip indented 16px against its siblings, the preselected grade hidden under the footer on a typed miss |
| UX judgment | High ×4 | 5.5 | 22.0 | critic-ux | Real flow clicked with `getUserMedia` instrumented: 0 calls on entry, 1 on tap, denial routes to the text field, every voice-ux Must state present. Ready → Skip ×3 → Summary still reads "33% explained unaided · 1 right / 1 partial / 1 incorrect · You just said 3 terms back out loud" |
| Accessibility | Medium ×2 | 7.5 | 15.0 | critic-ux | Every text pair on all 7 flow screens computed from composited colours: lowest non-disabled body 5.16:1. Every hit box probed with `elementFromPoint`: minimum 44×44. Recording carried by glyph and motion as well as colour. Loses points for the greyscale-flat summary bar (adjacent segments 1.21–1.53:1, 0px gaps) and focus dropping to `<body>` on the text swap |
| Structure | Low ×1 | 7.0 | 7.0 | critic-system | `npm run build` passes (9 routes), lint 0 errors / 2 warnings, 20 routes at 390px with `scrollWidth` 390 on all, no failed images, bottom nav y 764–820 on `/` and `/due-list`, a grade survives reload and back/forward. Held at 7 by HTTP 200 on bad term indexes and an LCP console warning on every Processing load |
| **Total** | | | **118.0 / 18** | | **6.56** |

**Movement since scorecard-02:** System 7.5 → 5.5, Coherence 6.5 → 6.5, Craft 5.5 → 6.5, UX 5.5 → 5.5, Accessibility 7.5 → 7.5, Structure 8 → 7. Different critic instances, so ±0.5 is run-to-run noise; the System drop of 2 is not. I can't say whether it comes from code that changed or from a stricter reading: scorecard-02 and the current `app/` landed in the same commit, so `git diff` between them is empty. Both critics cite the same eyebrow colour, and scorecard-02's system critic recorded it as a pass. The 8+ rule left nothing over-credited: no dimension reached 8.

## Comparing states (done before the critics ran, before anything they said)

Pixel-diff of the 64 stills plus a live motion probe. Findings, not fixes.

- **No pair that should differ came back identical.** Every identical-hash pair is a repeat of one state: `05-prompt-t1-idle` = `05z-…after-cancel`, `09-result-t2` = `09-result-t2-fresh`, `05w-skip-on-last-term` = `11a-summary-fresh`, `20d` = `20f` (second refusal lands where the first did), the five 404 variants with each other.
- **Weakest distinct pair: hint vs prompt** (`10-hint-t2` vs `05-prompt-t2-idle`), 4.74% of pixels differ and the mic zone 0.40%. They differ in bubble copy, mascot pose, Skip → "Repeat question", and the caption "Tap to start" → "Tap to try again"; the mic disc, eyebrow and layout are identical. Passes, but "this is a hint" rests mostly on copy.
- **`24-processing-typed` is pixel-identical to `08-processing-t1-early`.** Processing doesn't show the typed answer, so the two paths are the same screen there. Not a defect by itself; noted because the result screen does echo typed text and processing doesn't.
- **Processing early vs late is 0.00% in the stills.** That is my capture, not the app: it pauses looping animations at t=0. The live probe (animations running) shows 344–874 px changing between 300ms frames on Processing and 771–1275 on listening, with `voiceInputBreatheScale` the only running animation. With `prefers-reduced-motion` both go to 0 and no animation runs. The Sep 21 motion stills `90-93` in the folder were not regenerated.
- **Result outcomes differ:** pass vs incorrect 28.9%, incorrect vs partial 37.2%, pass vs partial 37.7%. Post-hint result vs first result 35.4%: the hint visibly changes the verdict.
- **Bad routes:** the four bad-route variants I loaded all render the "That page isn't here" screen. The system critic found that several return HTTP 200, not 404 (finding 13).
- **Console during capture:** 0 page errors; the LCP image warning on Home and Processing; three expected 404s on the bad routes. 0 `getUserMedia` calls on entry.

## Findings

Ordered by what a student hits. Evidence is what the critic rendered or measured. "Frame check" means the finding may be faithful to a Figma frame; no critic had frame PNGs (see Blind spots).

### The Summary's claim isn't earned (UX judgment; also raised by ambition)

1. **The Summary shows the same numbers whether the student answered or skipped.** `tallyTopic` reads only the scripted first `term.outcome` (`app/due-terms.ts:247-253`); the subtitle counts `terms.length` (`:273-277`). Clicked Ready → Skip ×3 → Summary: identical card. The rubric's 4-band names this ("Summary asserts a percentage with nothing behind it").
2. **Skipping earns the longest interval.** After Skip ×3, Humanism reads "Easy · Review in 1 week": `summary/page.tsx:90-92` falls back to `GRADE_FOR_OUTCOME[term.outcome]` and Skip writes nothing (`prompt/page.tsx:183-189`).
3. **A hinted pass is recorded as unaided Easy, and the card contradicts the result the student saw.** Hinted term 2 (result: partial) and term 3 (result: pass); the Summary still said "1 incorrect" and Theocentrism "Easy · Review in 1 week". `result/page.tsx:141` preselects `GRADE_FOR_OUTCOME[outcomeAfterHint]`; the card ignores hint state. `ResultCard`'s own prop docs define the segments as unaided / needed a hint / revealed-or-skipped (`ResultCard.tsx:10-15`).
4. **The self-grade is final whatever the answer was.** Marking a miss Easy shows "Anthropocentrism · Easy · Review in 1 week" (`summary/page.tsx:87-93`, `11-summary-after-grading.png`). The brief wants overconfidence to cost something. (Ambition's version of finding 1–3; UX and ambition reached it separately.)
5. **The grade colours fight the outcome colours.** In `11-summary-after-grading.png` Humanism (a pass, green in the bar) shows "Difficult" in red; Anthropocentrism (a miss, red in the bar) shows "Easy" in green (`Radio.module.css:45-54`). (critic-craft)
6. **No "Try again" on the Summary.** voice-ux marks it Must; the rendered buttons are back, ⋯, Change review time, Continue (`summary/page.tsx:104-114`). Also the Summary footer is a bare `Button` where the result screens use `ActionSheet` (system: `summary/page.tsx:104`, measured 390×80 at y 764 vs the result footer 120px at y 724). Frame check: the Summary footer form.

### Flow behaviour (UX judgment)

7. **Back on terms 2 and 3 leaves the session with no confirm.** `backHref` is `/recap/${topicId}` for every index (`prompt/page.tsx:147`); on `/prompt/1` the accessible name is "Back to recap", and Ready then resets the session.
8. **No mic-permission primer.** The OS prompt fires cold on first tap; the recap copy and the idle callout ("Tap to start") say nothing about the microphone (`due-terms.ts:94,130`). Instrumented: 0 → 1 calls, no priming text on either screen.
9. **Skip vanishes while recording** (`showSkip = textMode || state !== "listening"`, `prompt/page.tsx:143`); the brief says available throughout. Listening controls: back, ⋯, Cancel, Stop recording, Type instead.
10. **Inert controls:** ⋯ on the recap and Summary (no `menuItems`), "Change review time" (`summary/page.tsx:144`), "Add a topic" (+) on the recap. Also three recap chips render as `<button>` with no handler and are "chips for something not tappable" (system finding 2).
11. **Focus drops to `<body>`** when the text field swaps in after a denial or "Type instead" (`prompt/page.tsx:127-129`, `TypeTrigger.tsx:46-53`).
12. **Text mode's only way forward looks absent** until the student types: disabled Submit at 3.69:1 on `rgb(34,36,47)` (`TypeTrigger.tsx:55-62`). WCAG exempts disabled controls.
13. **Bad term indexes return HTTP 200** with the 404 page (`/prompt/9`, `/prompt/-1`, `/prompt/1.5`), while `/result/9`, `/hint/9`, `/processing/abc` return 404. `/hint/0` renders a full hint for a term that passes and never offers Hint. (critic-system)
14. **Spoken answers leave no trace.** Processing swaps the question for "Thinking..." and the result echoes only typed answers (`processing/page.tsx:110`, `result/page.tsx:192-197`), the opposite of voice-ux §4. (ambition)

### Coherence and craft (measured positions)

15. **Knowie's bubble drops 14px on Processing and returns on Result within ~2s:** top 131 / 145 / 131. Cause: `grid-template-rows: 84px` plus `align-self: center` in the processing module, whose header comment still says the gap is 10px. Frame check: the 84px row.
16. **The mascot moves on every step of one term:** top 145.5 / 135.5 / 173.5 / 133.5 (prompt / processing / result / hint), re-centred on each bubble's height. Frame check: the frames centre it.
17. **The white bottom button sits on three rows:** recap Ready top 744, result 756, Summary 764. Summary Continue chains into the next topic's recap, so the same pill jumps from 764 to 744 (width 134.6 → 138).
18. **The Summary breaks the content inset and top rhythm:** title left 16, top 64; every other flow screen is left 24, top 88.
19. **Partial is the only outcome with no icon.** `ChatBubble.tsx:45` renders only `CorrectIcon` / `IncorrectIcon`; "Almost!" sits 4 device-px above the other two titles. Raised by craft and UX separately; logged only as a "Known gap" in `design-system.md:226`.
20. **Nothing moves between screens.** `@keyframes` only in `VoiceInput.module.css:126` and `Button.module.css:195` (unused spinner); `main` has `animationName: none`; the ⋯ menu has 0s transition; the screen-level `semantic.motion` token is defined and unused.
21. **On a typed miss the preselected "Difficult" row loads under the footer:** radio rows 648 / 728 / 808, ActionSheet top 724, so the selected row (728–808) is covered until scrolled; the AppBar scrolls away with the document (952/844).
22. **Skip is optically 16px inside the bubble edge** (text ends x=350 vs bubble 366) while Hint and "Repeat question" sit flush at 366, and its hit box starts 0px below the bubble against 8px for the others.
23. **On the hint screen "Repeat question" is the Primary fill** (`hint/page.tsx:131-133`) though the caption asks for the mic ("Tap to try again").
24. **The greyscale summary bar:** segments `rgb(0,195,134)` / `rgb(245,181,61)` / `rgb(255,107,107)`, each 108×8 with no gap; adjacent luminance contrast 1.26 / 1.53 / 1.21:1. Legend dots are colour-only.
25. **Copy seams in `due-terms.ts`:** " - " where every other reply uses "—" (lines 98, 134); lowercase "renaissance" at line 98; straight "I'll" at 94 and 130; four miss replies end with the same "A hint can…" tail (101, 119, 137, 155); listening aria-label "Stop recording" while the tap pauses; "Thinking..." with three dots.

### System fidelity (critic-system)

26. **Eyebrow uses `semantic.color.text.link`,** which forbids non-clickable text; the eyebrow is non-clickable on 5 screens (`page.module.css:58` and the four prompt/processing/result/hint modules).
27. **Library components read primitives or raw values:** `Radio/icons.tsx:36` (`--color-alpha-light-10`), `Badge.module.css:105-106` (`--font-weight-heavy`, `font-size: 24px`).
28. **Page CSS reaches into a component:** `.triggerZone > button > span { min-width: 138px; }` (`page.module.css:126`), and `DueListScreen.tsx:82` styles a Card image slot inline.
29. **Screen-local components built four times:** `height: 259px` appears in four modules; `MicTrigger`, `TypeTrigger`, `ExitSession` live in `app/recap/[topicId]/`; the eyebrow block is copied into five modules. `component-gaps.md` records them as screen-local; the build-screen skill says a gap needed by a second screen becomes a Storybook component.
30. **No semantic size layer:** the token file has none, so about 80 spacing/radius reads go to primitives, unrecorded.
31. **Content departs from the frames** (logged, not hidden): the second due card reads "The Reformation" (`due-terms.ts:129`), the Summary has 3 rows / 33% where the frame has 4 / 50% (`SPEC.md:144`). The CLAUDE.md rule says change data, never the screen.
32. **The ⋯ exit sheet shows Destructive "End session" while the Primary "Continue" sits under the scrim** (`09c-result-t3-exit-sheet.png`). Inside the sheet the rule holds.
33. **Deviations logged outside `sprint-context.md`:** the 3-row Summary (SPEC.md only), the typed-echo block (a CSS comment and `component-gaps.md`), the Summary's 40→32px gap (CSS comment), the missing partial icon (`design-system.md`). Rubric 9-band says every deviation is logged there.
34. **Processing logs an LCP warning on every load** (mascot image lacks `loading="eager"`, and `Mascot` has no such documented prop).

## Hard gates

| Gate | Verdict | Evidence |
| --- | --- | --- |
| Contrast ≥ 4.5:1 | **Pass, close** | Lowest non-disabled pairs: 5.16:1 ("Review tomorrow" on the selected Difficult row), 5.21 (End session), 5.56 (Summary Difficult), 5.60 (eyebrow), 4.86 (textarea placeholder). Only pair under 4.5 is the disabled Submit at 3.69, exempt. |
| Touch targets ≥ 44pt | **Pass, at the line** | `elementFromPoint` hit boxes: back and ⋯ 48×48, Skip 62×48, Type instead 98×44, Use voice instead 130×44, Hint 54×48, Repeat question 134×48, grade rows full × 64, Add a topic 48×48, Pro badge 44×44 (visual 41×40), avatar 44×44 (visual 24×24). Minimum 44. |
| No raw hex in source | **Pass** | `npm run check:tokens` exits 0 (re-run by me); `var(--x, fallback)` grep clean. The gate's regex only catches `#hex`; the critic hand-checked for `rgb()`/`hsl()` literals in code and found none (only in comments). |
| No two states identical | **Pass** | Idle / listening / paused / processing differ in fill, glyph and animation; pass / partial / incorrect differ in bubble colour, title, mascot asset, preselected grade and Hint. Weakest pair: hint vs prompt (above). |

## Blind spots, by critic

- **critic-system:** no Figma frame PNGs (`docs/reference/` holds only beta screenshots), so `verify-screen.mjs --figma` never ran. It could not confirm any `Mascot` state, `Chips` colour, eyebrow token or Summary footer against a frame; a wrong variant is its likeliest miss. It did not measure contrast or targets. The disabled mic measured 115px against 112px elsewhere; it believes that's the breathe animation but did not confirm it.
- **critic-craft:** same missing frames, so findings 15, 16, 22 and 23 may be frame-faithful and would then be undocumented overrides rather than build defects. Motion was read from computed styles, not filmed or timed on a slow device. It didn't measure `/recap/the-reformation` route by route; that topic's longer prompts are where a 5-line bubble would push Skip or Hint down a row.
- **critic-ux:** `getUserMedia` was stubbed, so real iOS Safari behaviour is untested (a denied site often never re-prompts, so "Use voice instead" may silently bounce back to text). Not tested: raised system text size, VoiceOver, reduced-motion rendering. It treated the Next.js dev-tools portal covering Home's "MyAI" button as dev-only and did not confirm on a production build. The second topic was only spot-checked, and 320px is out of scope. (I did check reduced motion: 0 px change and no running animation on Processing and listening.)
- **critic-ambition:** read code and stills, did not drive the flow. It may over-read "last tap wins" (`sprint-context.md:30`) as governing only which grade is stored, not the interval. A scripted transcript (pattern 3) could look broken in a live demo. It made no Home proposal and treated the 1:1 Figma Home as out of scope.
- **Mine:** the pixel diffs use one threshold (8/255) on a paused-animation capture, so they say nothing about motion (I ran the live probe separately) and could miss a sub-threshold difference. I did not re-run `next build` (it shares `.next` with the running dev server); its pass is the system critic's. My `_diff.mjs` pair list carries two stale filenames, `20b` and `20c`, that no longer exist; those pairs errored and were skipped, and the surviving `20`/`20d`/`20e`/`20f` shots cover the same denied path.

## Ambition — kept separate, advisory, not in the total

**critic-ambition: 6 / 10.** It does not enter the weighted total.

The flow makes one authored move: a hinted second attempt comes back one grade kinder (Incorrect → Partial, Partial → Pass, Hint disappears), so the miss loop ends on a changed verdict. That move stops at the result screen. The Summary, the screen the brief calls the hardest to design, lays the frame out again with scripted numbers and ignores the session the student had.

Where it settles:
1. Summary self-grade is final (`summary/page.tsx:87-93`).
2. The hint loop drops out of the count (`due-terms.ts:247-253`).
3. No "say it without the hint" after a hinted pass (`result/page.tsx:160-183`), so a hinted term can never become one the student recalled alone.
4. Spoken answers are never shown back, while typed answers are.
5. The end state doesn't know what happened: the caught-up due list is generic and "Choose your own topics" and "Change review time" are inert.

Stronger patterns it proposed, all from existing components:
1. **Calibration readout on the Summary.** `ResultTable` rows carry `difficulty` from the student's tap and a capped `dueText` for Easy-on-a-miss (e.g. "Review tomorrow"); `ResultCard.summary` names the mismatch in words; Difficult-on-a-pass credits the student. Data and copy only.
2. **"Say it without the hint"** as a `Button variant="secondary" size="l"` beside Continue in `ActionSheet` on a post-hint result, with `ChatBubble state="correct"` on a clean pass, feeding the `ResultCard` segments from a hint-aware tally.
3. **"You said" through the wait:** `TextBlock variant="S"` with a scripted per-term transcript above the `thinking` mascot on Processing and above the reply on Result, replacing the inline typed-echo block.

Overlap to note: ambition's Summary findings and UX's findings 1–4 describe the same defect from two directions. They were reached in separate contexts, so I count them as corroboration, not as double-counting; ambition's score did not enter the total.

## What this run does and does not show

- What moved: Craft up a point on real motion (the breathing mic, reduced-motion respected, press scale). System down two on the eyebrow token, primitives inside library components, and the screen-local components that never got promoted. UX and Accessibility unchanged.
- The two dimensions worth the most points are the same two as last run: **UX judgment** (findings 1–9, mostly the Summary and Skip) and **System fidelity** (26–29).
- Not checked by anyone: pixel parity with the Figma frames (no frame PNGs in the repo), real iOS permission behaviour, VoiceOver, raised text size, the second topic route by route, a production build's Home nav.
