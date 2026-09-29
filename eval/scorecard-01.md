# Scorecard 01 — voice active recall prototype

Graded against `eval/rubric.md`, 2026-09-21. Rendered at 390px, dark mode, on `localhost:3000` (dev server). Four critics ran in separate contexts; each received only the routes, the screenshots in `eval/screens/`, the rubric and its own dimensions. None saw another critic's output. Nothing in the app was changed.

## Total

**6.42 / 10** — weighted, three adversarial critics, `Σ(score × weight) / 18`.

**Hard gates: 2 of 4 failed** (contrast, touch targets). The rubric says a gate failure caps the submission but gives no cap value, so none is applied here; the total is the uncapped figure and the gate failures are reported separately, as the rubric requires.

| Dimension | Weight | Score | Points | Critic | What the score rests on |
| --- | --- | --- | --- | --- | --- |
| System fidelity | High ×4 | 7.5 | 30.0 | critic-system | Computed styles on the live app: body `rgb(9,12,24)` = `--color-background-page`, ActionSheet `rgb(34,36,47)` = `--color-background-surface`, sheet radius 32px, h1 21px. `--primitive` appears 0 times in `app/` and `stories/components/`; 0 `var(--x, fallback)` |
| Coherence | High ×4 | 6.5 | 26.0 | critic-craft | Frame l=0/w=390, header 64, progress t=20/h=24, trigger zone t=585/h=259 identical on prompt, processing and hint; `aria-valuenow` 75 on all four term-2 screens. Bubble left/top, gap, and bottom-CTA row differ between routes |
| Craft | High ×4 | 5.5 | 22.0 | critic-craft | Computed-style sweep: 0 animated or transitioned elements on every state (0/71 on `/processing/0`, 0/80 on `/prompt/0` idle, listening and stopped). Recorded-state mic disc is 0 px different from idle |
| UX judgment | High ×4 | 5.0 | 20.0 | critic-ux | Full session clicked three times, including miss → hint → re-record, typed and denied paths. Tapped Difficult / Easy / Easy; summary returned Easy / Difficult / Medium and "33%" regardless |
| Accessibility | Medium ×2 | 5.5 | 11.0 | critic-ux | Every text pair computed from rendered colours (lowest body 5.16:1) except the placeholder at 3.69:1. Escape-hatch links are 20pt tall |
| Structure | Low ×1 | 6.5 | 6.5 | critic-system | 16 routes at 390×844, `scrollWidth === clientWidth === 390` on all; `npm run build` passes; back/forward and mid-flow reload survive. `npm run lint` fails |
| **Total** | | | **115.5 / 18** | | **6.42** |

**Reconciliation notes**

- The three critics' dimension sets do not overlap, so no averaging was needed and no score was adjusted. Where two critics measured the same thing, the numbers agree (see Findings: F3, F5, F17).
- **Structure sits generous against the rubric.** Its 6-band requires `npm run lint` to pass, and it does not (F25, re-run by me: 1 error, 2 warnings). Structure at 5 would give 6.33. I kept the critic's 6.5 and am flagging it rather than editing it.
- **Ceilings.** No dimension reached 8; System fidelity's 7.5 is the highest. The rubric's 8+ rule also asks for `verify-screen.mjs --figma`, and no critic had Figma PNGs (see Blind spots).
- **One conflict between critics:** the stock 404 page's body colour. critic-system measured `rgb(255,255,255)` on `rgb(0,0,0)` text; critic-craft and critic-ux measured `rgb(0,0,0)` with white text. Next's default 404 follows `prefers-color-scheme`, so both are right for their emulation. Either way it is outside `Scaffold`, off the app's `rgb(9,12,24)`, and has no link back (F5).

## Hard gates

| Gate | Result | Evidence |
| --- | --- | --- |
| Contrast ≥ 4.5:1 body text | **FAIL** | Text-fallback screen: placeholder "Type your answer", 18px/400, `rgba(255,255,255,0.4)` over `rgb(34,36,47)` = `rgb(122,124,130)` → **3.69:1** (critic-ux). I recomputed it from those RGB values and get 3.70. The disabled Submit label uses the same token (exempt as disabled). Every other pair on all screens clears: lowest body 5.16:1, chips 6.61:1 |
| Touch targets ≥ 44pt | **FAIL** | Measured hit boxes (critic-ux): "Type instead" 81.9×20; "Use voice instead" 113.3×20; recap chips 40 tall (105.3, 158.2, 128.1 wide); TopNav badges 40 tall (Pro 41, "2" 43.9, "3" 44.2, "5+" 54 wide); home pills 40 tall; avatar 24×24. Passing: back and ⋯ 48×48, mic 112×112, grade rows 342×64, Skip 61.8×48, Repeat question 133.3×48 |
| No raw hex in source | **PASS** | `npm run check:tokens` exit 0, re-run by me. `--primitive` 0 hits; fallback `var(--x, …)` 0 hits |
| No two states that should differ render identically | **PASS on the letter, with two near-misses** | Full-screen diffs (critic-craft, threshold 8/255): idle vs listening 6.43%, pass vs incorrect 28.9%, incorrect vs partial 37.3%, hint vs prompt 4.98%. Near-misses I found on the mic disc: idle vs recorded **0 px** (F10), processing vs denied **0 px** (F10). Each screen still differs elsewhere (Submit pill and callout; bubble, mascot, eyebrow), so neither pair is identical as a whole |

## State comparison (orchestrator, before the critics ran)

44 captures: every route, all three terms, prompt idle / listening / stopped / denied / text-empty / text-filled, ⋯ menu open, exit sheet on prompt and result, processing (voice and typed), all three results, result graded, typed-answer echo, hint (voice, denied, text, back to voice), both summaries, both due-list states, both 404s, hint → `?record=1`. Screenshots are in `eval/screens/`, contact sheets in `eval/sheets/`. No horizontal overflow on any route. Flagged, not fixed:

- **Identical hashes, expected:** `06-prompt-t2-listening` = `13-hint-to-prompt-record1`; `08-processing-t1` = `24-processing-typed`; `10-hint-t2` = `27-hint-t2-back-to-voice`; `12-404-topic` = `12b-404-term`. Same state reached by two routes.
- **Identical hash, my harness's fault:** `09-result-t2` = `09b-result-t2-graded-easy`. My selector `getByText('Easy').first()` hit the wrong node. Re-shot with an exact match: `aria-checked` moves from Difficult to Easy and the row re-renders, so grading works.
- **Mic disc pixel-identical across states:** idle = recorded/stopped (0 px in the 112px band), and processing = denied (0 px). Only the callout string and the pill differ (F10).
- **Mic permission on entry:** `getUserMedia` called 0 times on `/recap/…`, `/prompt/0`, `/prompt/1`, `/hint/1`. The gate holds.
- **Two Summary screens differ only by topic and term names:** both read 33% · 1 right / 1 partial / 1 incorrect, because both topics script the same outcomes (F2).
- **Screenshots include the Next.js dev-tools "N" badge** at bottom-left, overlapping the bottom nav. Dev-only.
- Console: LCP image warnings on `/due-list` and `/processing/*`; the 404 route logs a 404 (expected).

## Findings

Merged across critics; "raised by" shows who found it independently. Severity is mine, ordered by what a student hits.

### Breaks the recall loop

**F1. The grade the student taps is discarded; the Summary shows the pre-selected one.** Raised by critic-ux (finding 1) and critic-ambition. Click-through: tapped Difficult, Easy, Easy on results 1–3; Summary rendered Easy / Difficult / Medium. `result/[termIndex]/page.tsx:213` (`setGrade`, local `useState`) vs `summary/page.tsx:75-77` (`GRADE_FOR_OUTCOME[term.outcome]`). I read both lines. Rubric UX-9 says "last-tap-wins".

**F2. The Summary's "33% explained unaided" is asserted, not earned.** critic-ux 2, critic-ambition. Identical after a clean voice run, after a hint, after typing, and for the other topic (`summary/page.tsx:71`, `tallyTopic` reads `term.outcome` only). The Summary subtitle says "You just said 3 terms back out loud" even after a typed session.

**F6. Skip is inert on the last term.** critic-ux 3. `/prompt/2`: Skip renders (61.8×48) and clicking leaves the URL unchanged; `prompt/[termIndex]/page.tsx:157` `onClick={isLastTerm ? undefined : …}` (I read this line). Only exit is ⋯ → End session, which discards everything. Breaks "never trap the student".

**F8. The miss loop cannot resolve.** critic-ux 6. Result → Hint → re-record → Submit returns the same Incorrect; the Summary is unchanged, so hinting can never change an outcome.

**F7. Denied mic dead-ends toward voice, and there's no primer.** critic-ux 4, 5. Denied: mic is `disabled`, no retry, callout "Microphone is off", text mode not switched on (`prompt/…/page.tsx:106, 198-203`). The denial is per-screen, so `/prompt/1` offers a mic that fails again. Entry screen text never mentions the mic or speaking.

**F5. Unknown routes leave the product.** critic-system 5, critic-craft 5, critic-ux 10. No `app/not-found.tsx`; `/recap/nope` and `/recap/renaissance-philosophy/prompt/9` render Next's stock 404 outside `Scaffold`, no controls (`querySelectorAll('a,button').length === 0`). A stale term index after a mid-flow refresh lands here. Colour conflict between critics explained above.

### Gate failures and accessibility

**F3. Touch targets under 44pt** — see gate table. The 20pt "Type instead" / "Use voice instead" links are the non-voice path, which the rubric calls the accessibility requirement (A-9). The link treatment also exists in five modules with two padding values: `prompt/…/page.module.css:105` (0 padding, 81.9×20) vs `summary/page.module.css:81` (143.5×44) (critic-system 1, critic-ux).

**F4. Placeholder contrast 3.69:1** — see gate table. `stories/components/TextField/TextField.module.css` placeholder token.

**F19. Desktop resize grabber on the answer field.** critic-craft 10. `TextField.module.css:68` `resize: vertical`; visible in `23-prompt-t1-text-filled.png`.

### States and motion

**F9. No motion anywhere.** critic-craft 1, critic-ux 7, critic-ambition. 0 animated elements on every state; the only `@keyframes` is Button's spinner (`Button.module.css:195`). Processing is a static "Thinking..." bubble and a dead disc for ~1.8s — `docs/voice-ux.md` §6 and rubric Craft-6.

**F10. Recorded state is the idle state plus a pill.** critic-craft 2. `prompt/…/page.tsx` maps `stopped` onto `idle`; disc band 0 px different (my measurement agrees); screen-reader label reverts to "Start speaking". `VoiceInput` has only `idle | disabled | listening`; no gap logged in `component-gaps.md`. Same disabled `VoiceInput` is used for processing and for denied, also 0 px apart in the mic band.

**F13. Partial has no status icon.** critic-craft 3. `ChatBubble.tsx:44-45` renders icons for correct and incorrect only; the chip slot is empty on `09-result-t3.png`. Partial is carried by colour plus the word "Almost!".

**F11. The voice path never shows what was heard; the typed path does.** critic-ux 8, critic-ambition. `result/[termIndex]/page.tsx:166-171`. `docs/voice-ux.md` §4.

**F12. Four visible controls do nothing.** critic-ux 9. Summary ⋯ (no `menuItems`, `summary/page.tsx:82-86`), "Change review time", both due-list card ⋯ buttons, "Choose your own topics".

### Coherence and craft

**F14. "Partial / Medium" renders in three colours across adjacent screens.** critic-craft 4, critic-system 4. Result bubble and Medium row `#fb7e5b` (`--color-accent-coral-bold`, described "not errors or warnings"); Summary bar and dot `#f5b53d` (`--color-pro-bold`, "not warnings"); Summary table label `#fcd34d` (`--color-text-warning`). Radio Difficult fill is `--color-interactive-destructiveActive`, a pressed-state token (`Radio.module.css:54`).

**F15. Knowie's mascot/bubble row is built twice.** critic-craft 6. Prompt and processing: bubble left 104, width 262, gap 10. Result and hint: left 110, width 256, gap 16. Bubble top 131 on three screens, 145 on processing; mascot top 157.5 → 135.5 → 161.5 across prompt → processing → result.

**F16. Bottom primary CTA lands on three rows.** critic-craft 7. Recap "Ready" bottom 800, result "Continue" 812, Summary "Continue" 820 (844px viewport).

**F17. Progress steps 25 → 75 → 100.** critic-craft 8, critic-system 9. Bar is full on term 3's prompt before any answer; the reason for 75 is not written down. `ProgressIndicator` allows only 0/25/50/75/100.

**F18. Copy typography and templating.** critic-craft 9. Straight "God's" beside curly "Let’s"; hyphen "In your own words - " beside em dashes; "renaissance" lowercase inside a "Renaissance" topic; all six miss lines open "Not quite." (`app/due-terms.ts`).

**F20. "Repeat question" is Primary on hint, Secondary on result.** critic-craft 11. `hint/…/page.tsx:117` vs `result/…/page.tsx:186`; the louder button is the backwards one and the decision is not logged in `sprint-context.md`.

### System and structure

**F21. One underlined text link hand-drawn in five modules under four class names**, not in `component-gaps.md` (critic-system 1).
**F22. `MicTrigger` and `TypeTrigger` each used by two screens but left screen-local**, against the promote-on-second-use rule (critic-system 2).
**F23. Recap screen's Knowie line is `ChatBubble`'s default prop showing through** (`recap/[topicId]/page.tsx:79`; critic-system 3).
**F24. Radio "Medium" uses coral** whose description excludes warnings; unrecorded under `radio` in `design-system.md` (critic-system 4; overlaps F14).
**F25. `npm run lint` fails.** `stories/foundations/useTokenValue.ts:11` `react-hooks/set-state-in-effect` (error) plus 2 warnings. Re-run by me.
**F26. Two console warnings** during navigation: LCP image on `/due-list` (`card-image`) and `/processing/*` (`mascot-thinking`).
**F27. The 259px trigger zone is a literal in four modules** (`prompt` :88, `hint` :60, `processing` :76, `TypeTrigger` :29); it holds today (mic top 585 on all three routes) only by hand.

### Verified clean (measured, from the critics)

`Scaffold` wraps all 8 page files; `AppBar` on flow screens and `TopNav` only at home level; `ActionSheet` (slot 4, `bottomNavFlush`) on results and `BottomSheet` (slot 5) for the exit confirm; `TextField` not `TextBlock` for typed input; `Chips` only where tappable; `ButtonGroup` only for the two-option sheet; one Primary per screen, Cancel and Submit never together; text mode sticky across terms and hard refresh; exit-sheet count correct at each term; back steps one screen; mid-processing refresh lands on the result; grade rows carry `role="radio"`, `aria-checked` and a check icon; result outcomes carry words plus icons (except partial, F13).

## Addendum — Figma parity (2026-09-21, later the same day)

The "no Figma frames" blind spot shared by all three critics is now closed: see `eval/figma-parity-01.md`. Scores above are unchanged. Headline results: bars, radios, CTAs, mascot and bubble boxes match the frames to 0.0px; two of the craft critic's findings (F10, F15) and part of F16/F18 are frame-faithful rather than build defects; and the frame comparison surfaced deviations no critic caught (Summary layout, Skip width, prompt bubble width, back/⋯ glyph position, Home headline line-height) and stale frame IDs in `SPEC.md`.

## Addendum — hard gates re-checked after fixes (2026-09-21)

The scores and the gate table above are the record of the original run and are unchanged. After the fixes, the gates were re-measured on `localhost:3000`:

| Gate | Before | After | Measured |
| --- | --- | --- | --- |
| Contrast ≥ 4.5:1 | Fail | **Pass** | 260 text items on 20 states; the placeholder went 3.69:1 → clears (lowest remaining live pair 5.16:1). The one pair still under 4.5:1 is the disabled Submit label at 3.69:1, a disabled control, which is exempt |
| Touch targets ≥ 44pt | Fail | **Pass** | 131 of 131 interactive controls across 19 states hit ≥ 44 in both dimensions, measured by probing `elementFromPoint` outward from each control's centre, not by bounding box. 14 of 14 real taps at the edges of the enlarged areas landed on the right control |
| No raw hex | Pass | **Pass** | `npm run check:tokens` exit 0 |
| No identical states | Pass | **Pass** | 34 of 40 screens pixel-identical to before; the rest are the placeholder (intended), the badge end-caps below, and a capture-harness artifact |

Fixing the touch-target gate exposed one defect the original box-based measurement could not see: while listening, the mic's glow overlapped the bottom 16px of Cancel and took its taps, so Cancel was ~32pt tall in practice, not 48. Fixed with `pointer-events: none` on the glow.

Not fixed, and not gates: lint (F25), the 404 page (F5), and everything else under Findings.

## Addendum — findings fixed (2026-09-21)

Scores above are the record of the original run and are unchanged; re-grading would mean re-running the critics. What changed in the app since:

| Finding | Fix | Verified by |
| --- | --- | --- |
| Contrast gate (placeholder 3.69:1) | Fixed **at the token layer**, not in the component. `text.disabled` named two jobs — disabled labels (exempt from 4.5:1) and placeholders (not exempt). Split: new `semantic.color.text.placeholder` → `alpha.light-52`, the same step `text.tertiary` was bumped to for the same reason; `text.disabled`'s description narrowed to disabled labels only | 260 text items across 20 states: placeholder now 4.86:1. Only sub-4.5 pair left is the disabled Submit label, which is exempt |
| Touch-target gate | `hitArea.module.css` on Chips/Pill/Badge/Avatar, padding on the three text links, and `pointer-events: none` on the mic glow that was swallowing Cancel's bottom 16px | 131/131 controls ≥44pt by `elementFromPoint` probing; 14/14 real taps at the enlarged edges |
| **F1** grade discarded | The tapped grade is written to the session store (`textMode.ts`, the same `sessionStorage` pattern that already held typed answers) and read by the Summary and the result screen itself. Ungraded terms still fall back to the recommendation | Clicked through: tapped Difficult/Easy/Easy → Summary reads Difficult/Easy/Easy with matching intervals; returning to a result keeps the tap; last tap wins across navigation |
| **F5** stock 404 | `app/not-found.tsx` inside `Scaffold` — confused mascot, headline, one line of copy, one primary button to the due list. A root not-found covers both unmatched URLs and the five routes that call `notFound()` | `/recap/nope` and `/prompt/9` both render at `rgb(9,12,24)` with a working way out |
| **F6** Skip inert on the last term | Routes to the Summary, the same place Continue goes from the last result | Clicking Skip on `/prompt/2` now lands on `/summary` |
| **F19** desktop resize grabber | `resize: none` | Gone from the rendered field |
| **F25** lint error | `useTokenValue` rewritten onto `useSyncExternalStore` | `npm run lint` 0 errors (2 pre-existing warnings) |
| **F18** copy | The one straight apostrophe in rendered copy, and the six identical "Not quite." openers | Both incorrect bubbles still measure 256×160, matching their frames |

Regression check: 28 of 40 screens pixel-identical to the original run; all 12 diffs accounted for (the new 404, the placeholder colour, the removed grabber, the new miss copy, the badge end-caps the old clip was shaving, and one capture-harness artifact). `npm run build` passes, `check:tokens` 0, `tsc` 0, all 194 Storybook stories pass including a11y.

**Deliberately not fixed:** F2 (the Summary's 33% is still derived from scripted outcomes, not from what the student did — needs hint/typed/skip tracking), F7 (denied mic doesn't auto-route to text; the text fallback is reachable, so it isn't a trap), F9 (no motion), F11 (voice path shows no read-back), F12 (dead controls), F13 (partial has no icon — wants drawn art, flagged rather than invented), F14/F17/F20, F26 (dev-only LCP console warnings; silencing them means adding `priority` props to two library components for a hint users never see).

## Each critic's blind spot

- **critic-system.** No Figma access, so it never ran `verify-screen.mjs --figma`; every "matches the frame" claim in the code comments (instance counts, copy, illustration per card, `Mascot` state per outcome, `Chips` colour, the 138px Ready button) is unchecked. Most likely miss: a variant or content mismatch against a frame it never saw — the partial mascot (`standby`), the Summary's three rows / 33% vs the frame's four / 50%. No contrast or full tap-target measurement, and it didn't exercise the ⋯ menu interactively.
- **critic-craft.** Same: no Figma exports, so every spacing claim is the live app against itself. Most likely miss: a per-screen deviation from a frame's own measurements. It measured only resting states, so hover, focus and pressed holes are open. It treated the build's self-assessments in `sprint-context.md` as claims to verify.
- **critic-ux.** No system text-size test (a 200% reflow break in the fixed 259px zone or the hard `<br />` at `result/…/page.tsx:202` would be invisible). No real VoiceOver pass and no genuine iOS "Don't Allow" dialog — denial was a rejected `getUserMedia`, the same branch but not the OS re-request behaviour. Its tab-order probe was swallowed by the Next dev overlay, so focus-visible styling and focus trap/restore in `BottomSheet` are unverified. No pixel-diff of state pairs (not its gate).
- **Shared by all three:** dev server (not a production build); no Figma-frame diff for any screen, which is what the rubric's 8+ bar asks for.
- **Orchestrator (mine).** Static screenshots can't show animation, though critic-craft's computed-style sweep covers that. The denied path used a `getUserMedia` override, not a browser permission dialog. Screenshots contain the dev-tools badge.

## critic-ambition — kept separate, advisory, not in the total

**Ambition: 6 / 10.** Two deliberate reaches past the frames, but the voice path is never made to feel voice-first. Its score does not enter the weighted total.

**Where it reaches**
1. The hint screen's mic tap carries the permission grant into the prompt already Listening (`hint/…/page.tsx:86` → `prompt/…/page.tsx:92`). The flow spends the second tap for a student who just missed.
2. The typed answer is echoed on the result screen, a logged departure from the frames (`result/…/page.tsx:59-67`, `component-gaps.md`).

**Where it settles**
1. Processing: `ChatBubble` "Thinking..." plus a disabled `VoiceInput` for 1.8s; the wait is one word.
2. Result, voice path: nothing the student said is shown; the echo appears only when typed.
3. Summary: percentage, readout and rows come from `GRADE_FOR_OUTCOME`, not from what the student did; hint use isn't counted.
4. Prompt idle / listening / stopped: `Mascot state="standby"` on all three; the only changes are the mic fill, callout string and pill.
5. Due list: two `Card` rows and an inert link; nothing about what is slipping or when a term was last recalled.

**Stronger patterns proposed (existing components only)**
1. **The wait is the read-back.** `TextBlock variant="M" title="You said" caption={term.heard}` above the processing `ChatBubble`, persisting onto the result on voice terms too; a scripted per-term `heard` string in `app/due-terms.ts`.
2. **A summary the student wrote.** `saveGrade` / `useGrade` modelled on `saveTypedAnswer` / `useTypedAnswer` in `textMode.ts`, plus hint visits, feeding `ResultCard` and `ResultTable`.
3. **Knowie leans in.** `Mascot state` driven by `RecordState`: `standby` idle, `excited` listening, `standby` paused.

**Its blind spot.** The ~550px between bubble and mic is the largest unspent surface and it found no legal use (`Chips` may not be non-tappable; surfacing key points would hand over the answer). It may have read the flat due list as a default when `sprint-context.md` made it a decision, and it judged the recording state from static PNGs.

Note: patterns 1 and 2 and observations 2 and 3 overlap with findings F11, F1 and F2 from the adversarial critics. That overlap is independent, since ambition saw none of their output.

## Files written

- `eval/scorecard-01.md` (this file)
- `eval/screens/` — 44 PNGs plus `_log.json` and `_errs-A.json`, `_errs-B.json` (hashes, console output)
- `eval/sheets/` — six contact sheets
