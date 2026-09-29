# Figma parity 01 — closes the "no Figma frames" caveat in scorecard-01

2026-09-21. File: "Yummy Knowie Design System" (`QMYw9i1SQf9ZnOoFpajlbt`), read through the Desktop Bridge (`figma_execute`, read-only; nothing in Figma was modified). App: `localhost:3000` at 390×844, dark mode, dev server.

## Method, and what it can and can't do

- The bridge returns screenshots inline only; it does not write PNGs to disk, so `verify-screen.mjs --figma <png>` (a pixel scan) could not be fed. Instead I read every frame's node tree directly: text characters, instance variant properties, and each box's position relative to the frame. That is stronger than a pixel scan for the questions the rubric asks (exact copy, instance counts, variant state, position), and weaker for anything only visible in pixels (colour, glyph shape, shadows).
- Figma frames include a 48px status bar the app doesn't render. For each element I computed the delta both ways (top-anchored: `app_y − (figma_y − 48)`; bottom-anchored: `app_y − figma_y`) and report the one that lands nearest zero. Top-anchored elements match with the −48 shift; the mic, callouts, "Type instead" and the result/recap CTAs match without it, because the app anchors them to the bottom of the viewport.
- Scripts: `parity.mjs`, `parity2.mjs` in the session scratchpad (not in the repo).
- Frames read: recap (Ready) `16088:1317`, prompt idle `16088:1346`, listening `15783:6833`, stopped `15783:7103`, processing `15783:7209`, pass `15783:7408`, incorrect `15783:7640`, hint `15868:631`, summary `15731:3960`, due list `15734:4996`, home `15702:3864`. Partial has no frame. Recap-with-mic `15783:6710` is the superseded one.

## The frame IDs in SPEC.md are stale

`16031:7075` (recap) and `16023:6960` (idle prompt) do not resolve in the file, and `SPEC.md`, `CLAUDE.md`'s file map and several code comments cite them. The frames the app follows now live on the **Archive** page as `16088:1317` and `16088:1346`. Meanwhile the **Flow** page still holds the superseded recap `15783:6710` (mic, "Tap to start"). So Figma's Flow page and the app disagree about the entry screen, and anyone opening SPEC.md's node IDs finds nothing. Needs a decision from you about which page is authoritative; I have not touched either.

## Result: what matches exactly (delta 0.0px unless noted)

| Check | Result |
| --- | --- |
| Progress bar, all flow screens | x84 · w222 · h24 · top 20 (= frame 68 − 48). **Exact.** critic-craft's "l=76 / w=238" was a wrapper, not the bar |
| Eyebrow, headline, radios (Easy/Medium/Difficult), Retry/Continue, Ready, Hint, mic, callouts, "Type instead" | Exact, on idle, stopped, result pass and result incorrect (see caveat under Deviations for listening / processing / hint mic) |
| Mascot and chat bubble boxes | Exact on recap, processing, result pass, result incorrect (4-line), hint; mascot ±0.5 on hint and recap |
| Recap chips | Three chips, `Humanism / Anthropocentrism / Theocentrism`, tops exact; widths +1.2–2.1px (text metrics) |
| Component variants | `mascot`: standby (idle, listening, stopped, hint, recap) · thinking (processing) · excited (pass) · confused (incorrect) ✓. `chatBubble`: Correct / Incorrect ✓. `radio`: Easy on pass, Difficult on incorrect ✓. `progressIndicator`: Primary / 24 / progress 25 on all frames ✓. `button`: Retry secondary/l, Continue primary/l, Repeat Question primary/s, Cancel destructive/s ✓ |
| Repeated instances | Recap 3 chips + plus icon ✓; due list 2 cards ✓; result 3 radios ✓ |
| Copy | Prompt copy is verbatim from the frame, including the frame's own `" - "` hyphen and lowercase "renaissance". "Repeat question" vs the frame's "Repeat Question" is the logged decision |

## Result: measured deviations from the frames

1. **Summary is laid out differently from its frame, and no header note records it.**
   - Frame: content starts 18px higher (h1 at y46 in app coordinates vs app 64), because the frame's bar is shorter than the flow `AppBar` (title centre y18 vs 32).
   - Frame: `Continue` is inline at y669–725, directly under "Change review time"; the app pins it in the bottom slot at 764–820 (Δ +95px from the frame's own y).
   - Row count, 33% vs 50% and copy are the logged departures; these two are not.
2. **Skip button is 61.8×48 in the app, 48×48 in the frame.** Label centre lands at x335 vs frame x342 (−6.9px). `prompt idle` and `stopped`.
3. **Prompt bubble is 256 wide, the idle frame draws 262.** Height (128) and wrapping match. The processing, result and hint frames all draw 256.
4. **Back and ⋯ glyphs sit 4px nearer the screen edge than the frame.** Frame buttons are 56×48 with glyph centres at x32 / x358; the app's are 48×48 with centres at x28 / x362. Every flow screen. Both hit boxes clear 44pt; glyph extents also differ (frame back glyph 13.3 wide, app 10.6), which may be stroke vs fill bounds, so treat the size as unconfirmed.
5. **Home headline: frame line-height 34px (unbound text, no text style), app 28px (Headline M).** Frame box is 68 tall, app 56 (Δ −12); the h1 sits +20px and Refer +12px lower than the frame. The due-list frame's headline is bound to `Greed/Headline M` at 28, and the app matches it in height.
6. **Due list headline is 3px higher than the frame** (114 vs 117).
7. **Listening, processing and hint mic sit 3–4px off their own frames** (listening +4 with the frame's 114px glow height, processing +3, hint −3). The frames disagree with each other here (mic top 581 / 582 / 585 / 588; "Type instead" 751 / 753 / 756). The app uses the idle frame's 585 / 753 everywhere, which is the logged 259px trigger-zone decision.

## How this revises scorecard-01 (scores not changed)

Scores are unchanged; a re-grade would need the critics re-run with this data. These findings change meaning:

| Finding | Was | Now |
| --- | --- | --- |
| **F10** recorded state = idle mic (critic-craft) | A build defect | **Frame-faithful.** The stopped frame `15783:7103` draws `voiceInput` as `Idle`. The app matches it exactly. The weakness is in the frame; fixing it is a deliberate departure to log |
| **F15** mascot/bubble row "built twice", bubble hops between screens | A build inconsistency | **Frame-faithful.** Bubble x104 (prompt, processing) vs x110 (result, hint), and the processing bubble at y145, are what the frames draw; app matches to 0.0 except the −6 width (deviation 3) |
| **F16** CTA on three rows | Build inconsistency | Recap (800) and result (812) **match their frames**. Only Summary deviates (deviation 1) |
| **F18** hyphen "In your own words - " and lowercase "renaissance" | Copy typos | **Verbatim from the frame**, which CLAUDE.md requires. Curly/straight apostrophes and the six "Not quite." openers are app-authored and stand |
| critic-craft's progress bar `l=76/w=238` | Coherence evidence | **Not a deviation** — the bar is 84/222 like the frame |
| "Hint is Secondary, not the frame's Primary" (result screen header, SPEC.md, sprint-context) | Logged departure | **Stale.** The incorrect frame now draws Hint as `secondary / s`. The app matches; the note should be removed |
| System critic's blind spot: partial mascot, Summary rows, Badge/Chips variants | Unchecked | Variants above checked ✓. Partial still has no frame (standby is the logged choice) |

Still unchecked: pixel-level colour and glyph shape; the ⋯ menu and sheets (no frames); the due-list card artwork slot; keyboard focus; system text size. The frame for partial does not exist.

## Not changed

Nothing in `app/`, `stories/`, `docs/`, `SPEC.md` or Figma. Dev server left running.
