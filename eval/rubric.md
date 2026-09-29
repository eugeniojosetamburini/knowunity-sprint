# Prototype grading rubric — voice active recall

Grades the built prototype in this repo: Home → recall badge → due list →
recap → prompt (idle / recording / recorded) → processing → result
(pass / incorrect / partial) → hint → summary, at 390px, dark mode, iOS.

Six dimensions, each scored 0–10. Read the scoring rules and the hard gates
before scoring anything — a gate failure caps the whole submission regardless
of the dimension scores.

| Dimension | What it asks | Weight |
| --- | --- | --- |
| System fidelity | Does every value trace back to a token, and every component to the library | High |
| Coherence | Does it read as one product, or as screens that arrived separately | High |
| Craft | Spacing, rhythm, states, the small deliberate decisions | High |
| UX judgment | Are the states handled, the hierarchy clear, the failure paths designed | High |
| Accessibility | Contrast, touch targets, whether meaning ever rests on color alone | Medium |
| Structure | Does the layout hold together and the thing render | Low |

Weighted score: High = 4×, Medium = 2×, Low = 1× → `Σ(score × weight) / 18`.

---

## Scoring rules

1. **"Looks good" is a 6, not a 9.** A 6 is competent work with nothing
   obviously broken. A 9 survives a senior critique untouched — someone who
   knows this system looks for the seam and doesn't find one.
2. **A dimension scores 8 or above only if it was verified by rendering,
   measuring or testing.** `node scripts/verify-screen.mjs <route> --figma
   <png>` on `localhost:3000`, a computed-style read, a contrast calculation,
   a hit-box measurement, a click-through of the real flow. **Never from
   reading code.** Code that looks correct scores 7 at most. Storybook alone
   does not count as rendering a screen — its preview doesn't load
   `app/globals.css`, so screen layout measured there is not evidence.
3. **Cite the evidence.** Every score of 8+ names what was rendered, measured
   or run, and the number that came back. A score without that citation is
   rewritten down to 7.
4. **Score the worst representative screen, not the best.** These are seven
   screens of one flow; the grade reflects what a student would hit, not the
   hero frame.
5. **Half points are allowed.** 0–3 is broken or absent.

---

## 1. System fidelity — High

**Scoring:** whether every color, size, spacing and type value resolves to a
path in `tokens/tokens.json` through the semantic layer, and every piece of UI
is an instance of a component in `stories/components/` rather than something
re-drawn in a page's CSS module. Also whether the right component was chosen:
`textField` not `textBlock` for typed input, `actionSheet` (slot 4, persistent
footer) not `bottomSheet` (slot 5, dims), `appBar` on flow screens and `topNav`
only at home level, `chips` only for tappable things, `buttonGroup` never for
three or more options.

- **4** — `npm run check:tokens` passes, but the semantic layer is bypassed:
  primitives read straight into components (`--primitive-color-*` in a page
  module), or spacing and radii are raw px next to tokenized colors. Screen
  shells hand-rolled in page CSS instead of `Scaffold`. Components exist but
  a couple of screens re-draw a bar or a footer inline.
- **6** — Everything goes through semantic tokens and library components. The
  choices are defensible but not examined: a `Mascot` sits at a state that
  doesn't match the moment, a `Badge` carries the default `"5+"` where the
  frame says otherwise, `BottomNav`'s `chatActive` is left at default on a
  screen that should show it. One Primary per screen holds.
- **9** — Every value is a semantic path and every component is an instance
  with its variant deliberately set per screen and matching the frame —
  `Mascot` state, `Badge` count text, `Chips` color, `BottomNav` active item,
  `ProgressIndicator` color chosen by owning surface not by feature. No
  inline component anywhere; anything that wasn't in the library was flagged
  in `component-gaps.md` before being built, then promoted. `check:tokens`
  passes and a spot-check of computed styles on the rendered page confirms the
  values resolve to the intended tokens, not to inherited or fallback values.

## 2. Coherence — High

**Scoring:** whether the seven screens read as one product. Shell geometry,
bar positions, the mic's resting place, copy voice, the progress model, and
Knowie's character consistent across the whole flow — not each screen
internally tidy but differently built.

- **4** — Screens are individually plausible but arrive from different
  places: the frame or `AppBar` shifts a few px between routes, the mic sits
  at a different height on the prompt screen than on the hint screen, headings
  mix sentence case and title case, Knowie's tone swings between clinical and
  chatty across the six per-term replies.
- **6** — Consistent shell, consistent type scale, one voice. Nothing jars.
  But the seams show under pressure: the progress bar's meaning wobbles (a
  result screen advances it instead of Continue), or the copy is consistent in
  register yet plainly templated term to term.
- **9** — Navigating prompt → processing → result → hint, nothing moves that
  shouldn't: frame, `AppBar`, progress bar and trigger zone land on the same
  pixel row on every screen (the 259px trigger zone rule), verified by
  measurement across routes. Progress belongs to the term, so every screen for
  term 2 reads 75% and only Continue moves it. Copy is written per term and
  per outcome, in one recognisable Knowie voice, sentence case throughout, and
  the flow reads as authored rather than assembled.

## 3. Craft — High

**Scoring:** spacing rhythm, optical alignment, state completeness, motion,
and the decisions that only show up when someone looks hard. Judged against
this project's own craft standard: the trigger zone is one height everywhere
*on purpose*, partial mirrors incorrect *on purpose* with three stated
choices, "Repeat question" beats the frame's "Repeat Question" *on purpose*.

- **4** — Spacing is eyeballed: gaps that should be one step apart differ by
  3px, text baselines drift against the mascot, the recorded state is the
  recording state with a different label. Transitions are instant or default
  browser ease. Deviations from the frame exist but aren't recorded anywhere.
- **6** — Clean spacing on a consistent scale, all the states drawn and
  distinct, a sensible transition between them. The processing state is a
  calm animated state rather than a dead spinner (voice-ux §6). What's missing
  is the deliberate layer: nothing here would surprise a reviewer in a good
  way, and the "why" behind the judgement calls isn't written down.
- **9** — Every deviation from the Figma frames is a decision with a reason
  logged in `sprint-context.md`, the way the 259px trigger zone and the
  Partial mascot/Medium-preselect calls are. Idle, recording, recorded,
  processing and each result are unmistakably different at a glance, with the
  state change carried by shape or motion and not only color (voice-ux §1).
  Measured spacing matches the frame to the pixel on the screens that have
  one, and follows the same rhythm on the three that don't (2a, 11, 14).
  Motion is short, physical, and consistent in direction with the navigation.

## 4. UX judgment — High

**Scoring:** the brief's and voice-ux's own standards — status visible at
every moment, the student in control of start and stop, mic permission in
context, generous judging, never trapped, the wait designed for, and a summary
claim that is earned rather than asserted.

- **4** — The happy path works. The miss path is thin: hint copy gives the
  answer away, or a state dead-ends (no skip on a prompt, no way back from
  hint to the question, exit with no confirm). Mic permission is implied on
  screen entry. Processing is a blank moment. Summary asserts a percentage
  with nothing behind it.
- **6** — All the Must states from voice-ux's checklist are present and
  behave: idle, recording, processing, pass/partial/incorrect, cancel and
  re-record, text fallback in one tap, skip, permission on tap-to-record,
  denial routed to text-first. Hierarchy is clear, one Primary per screen,
  Hint as Secondary. The loop is complete but conventional — the summary
  reports honestly without making the "I actually know this now" signal feel
  earned.
- **9** — Every failure path is designed, not just present: the miss loop
  closes (result → hint → re-record or repeat question, no second hint, no
  reveal), grading is offered at every result with last-tap-wins, back steps
  one screen and ⋯ carries the exit confirm with terms-left count, and
  abandoning returns the topic to the due list untouched. The text fallback
  swaps in place and stays sticky. Nothing branches into tutoring. The summary
  earns its claim — the three-state segmented bar plus a plain-language
  readout that a student who hinted twice would read as honest, not
  flattering. Verified by clicking the real flow end to end, including the
  miss and partial terms and the denied/typed path, not by reading the routes.

## 5. Accessibility — Medium

**Scoring:** contrast, target size, and whether any meaning is carried by
color alone — in a dark-mode-only, one-hand mobile context where the mic is
the primary control.

- **4** — Body text and captions on dark surfaces fall under 4.5:1 (the muted
  `semantic.color.text.*` tiers are where this breaks), some taps are under
  44pt, and pass/partial/incorrect are distinguished only by green/amber/red —
  in the result screens, the summary's segmented bar, or both.
- **6** — Body text clears 4.5:1 and targets clear 44pt on the main controls.
  Each result outcome carries an icon or a word alongside its color. Focus and
  pressed states exist. Not yet checked with the system text size raised, and
  the smaller secondary controls (⋯, back, chip-sized taps) haven't been
  measured.
- **9** — Every text/background pair measured against the actual rendered
  colors with a computed contrast ratio, body ≥ 4.5:1 and large text ≥ 3:1,
  including text over the mascot art and inside chips. Every tap target
  measured at ≥ 44×44pt including `ButtonIcon` XS instances and the segmented
  bar's legend rows. Recording state is signalled by shape/motion plus color.
  Every outcome and every state is readable in greyscale. The non-voice path
  is reachable in one tap from every prompt screen — which is the accessibility
  requirement here, not a fallback (voice-ux §5).

## 6. Structure — Low

**Scoring:** does it build and render, does every route hold its layout at
390px, does the shell behave.

- **4** — It builds, but something breaks on render: a route overflows
  horizontally at 390px, the sticky bottom nav detaches when the content
  scrolls, an image slot 404s, or a console error fires on navigation.
- **6** — `npm run build` and `npm run lint` pass, every route renders at
  390px with no horizontal scroll, `Scaffold` owns every shell, bottom nav
  sticks, images resolve from `public/images/`.
- **9** — All of the above, confirmed by loading each route on
  `localhost:3000` and running `scripts/verify-screen.mjs` against the Figma
  PNG for every screen that has one; frame, bars and nav measure identical
  across routes; no console warnings; the flow survives back/forward
  navigation and a mid-flow refresh without losing or corrupting state.

---

## Hard gates

These are pass/fail and scored separately from the six dimensions. Each must
be checked on the rendered app, not in source. Any failure is reported
explicitly, whatever the weighted score says.

- **Contrast ≥ 4.5:1 for body text.** Measured on rendered colors, every
  text-on-surface pair across all seven screens. Large text (≥ 24px, or
  ≥ 19px bold) may sit at 3:1.
- **Touch targets ≥ 44pt.** Measured hit boxes, not visual boxes. Includes
  back, ⋯, skip, "Type instead", grade rows, and every `ButtonIcon`.
- **No raw hex in component source.** `npm run check:tokens` exits clean over
  `app/` and `stories/`. A hex in a comment is fine; a hex in code is a gate
  failure, as is a `var(--token, #333)` fallback.
- **No two states that should differ render identically.** Screenshot idle vs
  recording vs recorded; pass vs partial vs incorrect; hint vs prompt. Any
  pair that comes back pixel-identical, or differs only in a string, fails.
