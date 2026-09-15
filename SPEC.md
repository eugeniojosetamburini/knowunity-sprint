# Voice Recall Prototype — Spec

## What we're building

A voice-in/text-out active-recall step for Knowunity: the student speaks a due term aloud, Knowie judges it (mocked) and replies in text, then the student grades their own recall difficulty. Mobile iOS, 390px, dark mode only, single-turn per term — presentation-only clickthrough, not wired to real STT or judging.

## Screen list, build order (easiest first)

Ordered by how much is already real in Figma/Storybook vs. still needs building. "Built" means a real, instantiated Figma frame with real component instances exists (verified directly, not inferred from the old text-only flow annotations).

1. **Home screen** — built (`home-screen-knowie`)
2. **Due list** — built (`Direction C1 – Due list, delinearized`)
3. **Entry / recap screen (Idle)** — built, granted-permission variant only (Voice Review Screen, node 15783:6710)
4. **Idle / prompt shown, with Skip** — built but internally inconsistent, see flag below (Voice Review Screen, node 15783:7103)
5. **Recording / Listening** — built (Voice Review Screen, node 15783:6833)
6. **Processing** — built (Voice Review Screen, node 15783:7209)
7. **Result: Pass + review interval** — built (Voice Review Screen, node 15783:7408)
8. **Result: Incorrect + review interval + Hint** — built (Voice Review Screen, node 15783:7640)
9. **Hint nudge** — built (Voice Review Screen, node 15868:631)
10. **Summary** — built, missing the "Try again" secondary button and XP (`knowledge-check-results`)
11. **Result: Partial + review interval** — not built. `ChatBubble` has a `partial` variant now (`stories/components/ChatBubble/ChatBubble.tsx`); no screen composition exists yet.
12. **Entry / recap screen, permission-denied variant** — not built. Decided behavior only (see below).
13. **Reveal (second miss, terminal)** — not built, not even stubbed. No Figma frame of any kind exists for this — not among the real screens, not among the old text-only annotation cards either.
14. **Text fallback (typing) screen** — not built. The "Type instead" link exists on three screens (7103, 6833, 631) but points nowhere.
15. **Exit-session confirm dialog** — not built. No modal/dialog component exists in the library at all; the Scaffold's bottom-sheet slot (`docs/design-system.md`, "Scaffold composition") is the closest existing pattern to build it into.

---

## Per-screen detail

### 1. Home screen
**States:** one.
**Components:** `Badge` (variant=`recall`/`streak`/`fire`/`pro`), `Pill` (variant=`scan`/`flashcards`/`quiz`/`summarize`), `Mascot` (state=standby — used in Figma, not yet a Storybook entry).
**Student can:** tap the `recall` `Badge` → Due list (now a real tap target — see `stories/components/Badge/Badge.tsx`). Tap a `Pill` → other tools, out of scope for this feature.

### 2. Due list
**States:** one.
**Components:** `Card` (title/topicCountText/durationText), `Badge` (all four variants), `Mascot` (standby).
**Student can:** tap a `Card` → opens the entry/recap screen for that topic's terms, or tap the "Choose your own topics" link below the list — confirms `sprint-context.md`'s decision ("a quiet secondary link... sits below it at all times") is actually built, not just documented.

### 3. Entry / recap screen (Idle)
**States:** granted (built) / denied (decided, not designed — see Open).
**Components:** `ChatBubble` (state=default), `Chips` (size=M, color=brand, one per topic), `VoiceInput` (state=Idle), `ButtonIcon` (variant=Tertiary, size=S), `ProgressIndicator` (variant=Primary, thickness=24), `Mascot` (standby).
**Student can:** tap `VoiceInput` → starts recording. First-run explanation copy lives on this screen (no separate primer screen, per `sprint-context.md`). On the denied variant: `VoiceInput` shows disabled, with a re-enable note — not yet built. **Gap:** unlike #4, #5, and #9, this screen has no "Type instead" link — a student who never gets past this first screen has no visible way to reach text fallback.

### 4. Idle / prompt shown, with Skip
**States:** one (recurs per term).
**Components:** `ChatBubble` (default), `Button` (variant=tertiary, size=m, "Skip"), `VoiceInput` (state=Idle), `ProgressIndicator`, `Mascot` (standby), a "Type instead" text link, and a "Submit" button.
**Student can:** tap `VoiceInput` to speak, tap Skip (ungraded, term stays due unchanged — no interval effect), tap "Type instead" → text fallback (not built), tap Submit.

**Flag — this screen needs a decision, not just a build:** the "Submit" button is not an instance of the real `button` component — its main component sits outside any component set (`button/Default/s/default`), the same orphaned component reused as "Refer" on the Home screen. And the copy sitting next to `VoiceInput` reads "Recording paused. Tap again to resume." even though that instance's own variant is set to Idle, not Listening, and even though `sprint-context.md`'s Not Building list explicitly excludes "pause and resume within one take." This reads like leftover copy from a different exploration rather than an intentional feature, but it contradicts a logged decision, so it needs confirming before this screen is treated as done.

### 5. Recording / Listening
**States:** one.
**Components:** `ChatBubble` (default), `VoiceInput` (state=Listening), `Button` (variant=destructive, size=s — Cancel), `Mascot` (standby).
**Student can:** tap `VoiceInput` again to stop and send (tap-to-start/tap-to-stop, not press-and-hold). Tap Cancel → discards instantly, back to Idle, never counts as an attempt.

### 6. Processing
**States:** one.
**Components:** `ChatBubble` (default, "Thinking..."), `VoiceInput` (state=Disabled), `Mascot` (thinking).
**Student can:** nothing — fixed ~1.5–2s delay, not tappable.

### 7. Result: Pass + review interval
**States:** one.
**Components:** `ChatBubble` (state=correct), `Mascot` (excited), `Radio` (state=Easy/Default × 3 rows), `Button` (variant=secondary, size=l, "Retry") + `Button` (variant=primary, size=l, "Continue") in a footer actions row.
**Student can:** pick a grade, tap Retry to re-attempt the same term even after an unaided pass, or tap Continue → next term or Summary.

### 8. Result: Incorrect + review interval + Hint
**States:** one (this is the first-miss screen — distinct from Reveal, which doesn't exist yet).
**Components:** `ChatBubble` (state=incorrect), `Mascot` (confused), `Button` (variant=primary, size=s, "Hint") next to the chat bubble, plus the same footer pair as #7 — `Button` (variant=secondary, size=l, "Retry") + `Button` (variant=primary, size=l, "Continue").
**Student can:** pick a grade (grading happens at every result, including this first miss — last grade tapped for a term wins), tap Hint → Hint nudge screen, tap Retry to re-attempt directly without a hint, or tap Continue to move on. Three distinct actions on one screen.

### 9. Hint nudge
**States:** one.
**Components:** `ChatBubble` (state=default, hint copy), `Mascot` (standby), `Button` (variant=primary, size=s, "Repeat Question"), `VoiceInput` (state=Idle).
**Student can:** tap `VoiceInput` to re-attempt by speaking, or tap "Repeat Question" for Knowie to restate the prompt. This screen is the entirety of the brief's "say it back" idea — there's no separate repeat-the-full-answer screen.

### 10. Summary
**States:** one.
**Components:** `ResultCard`, `ResultTable`, `Chips` (size=S, color=Primary, one per term showing the chosen interval), a `Button` (variant=primary, size=l, "Continue").
**Student can:** tap Continue → exits the flow. **Gaps:** the brief specifies Continue (primary) *and* Try again (secondary) — only Continue exists on this frame. XP is decided to show here (summary-only) but no XP element appears on the built frame. `ResultTable` has no "not attempted" row status yet (only `Default` and `Single row` stories exist in Storybook) for terms left over from an early exit. One thing that *is* already consistent: the legend text on this frame reads "2 right / 1 partial / 1 incorrect" — Partial is already flowing through the real content here, not just a Storybook variant in isolation.

### 11. Result: Partial + review interval — not built
Composition should mirror #8: `ChatBubble` (state=partial, now real — see `stories/components/ChatBubble/ChatBubble.tsx`), `Mascot` (state=standby), `Radio`, `Button` ("Hint") + the Retry/Continue footer pair. Goes through the hint ladder the same way Incorrect does. No Figma frame built yet.

### 12. Entry / recap screen, denied variant — not built
Decided: sticky denial, this same screen (#3) reflects it with a disabled `VoiceInput` and a re-enable note, CTA leads with text. No Figma frame for it yet.

### 13. Reveal (second miss, terminal) — not built
Decided: ends the loop, shows the full answer, a grade picker, and a Continue button; no further re-attempt offered. Nothing exists for this in Figma — not a real frame, not even a stub annotation card, unlike every other state in this list.

### 14. Text fallback (typing) — not built
Sticky for the rest of the session once chosen (not per-term). The "Type instead" link is real and present on three screens (#4, #5, #9), so the entry point exists — but there's no destination screen behind it. `docs/design-system.md` says the correct component for a student's own free-text entry is `textBlock`, but `textBlock` isn't in Storybook yet — this screen is blocked on both a Figma design and a missing component.

### 15. Exit-session confirm dialog — not built
"End session now? X terms left," required before discarding remaining terms. No modal/dialog/sheet component exists in the library yet. The Scaffold's bottom-sheet slot (`docs/design-system.md`) is the intended home for this kind of thing, but nothing has been built against it.

---

## Explicitly out of scope

From `docs/sprint-context.md`'s "Not building" list:
- Multi-turn tutoring or open conversation branches
- A standalone first-run primer screen (folded into the entry screen instead)
- Auto-endpointing
- Real speech-to-text or real judging (both mocked)
- Full-fidelity designs for the badge and chat entry points (due list is the fidelity target; badge/chat stay annotated only)
- Language switching mid-answer
- Pause and resume within one take
- Mic-busy handling (student on a call, etc.)
- Switching between voice and multiple-choice mode mid-round (the *Practice round voice flow* Figma exploration is not the committed concept)

If-time, not guaranteed (`docs/voice-ux.md`): a single consolidated "something went wrong with the recording, please try again" state, covering empty/silent recording, garbled transcript, judge timeout, and dropped network. Not built.

## How the mocked recall behaves

- **Judging is scripted per term** — each due term has a pre-set outcome baked in; stopping the recording always advances to that term's scripted result regardless of what was said. Fully deterministic.
- **Gesture is tap-to-start / tap-to-stop**, not press-and-hold.
- **Cancel is always free** — never counts as an attempt against the hint ladder.
- **Processing is a fixed ~1.5–2s delay**, not variable.
- **Grading happens at every result, including misses**, and the last grade tapped for a term is what's recorded — a term can be graded on the first miss, re-graded after a hint, and re-graded again on an eventual pass; only the final tap sticks. This is a deliberate departure from the brief's own spec (grade once, at the end, after the hint ladder finishes) — flagged, not silently followed.
- **Skip is ungraded** — the term stays due at its existing interval, unchanged.
- **The hint ladder is decided to be "full, live"** (hint → re-attempt → second hint → re-attempt → Reveal), but only one Hint-nudge screen composition exists (#9) and Reveal doesn't exist at all (#13) — so "full ladder" isn't actually buildable yet as specified.
- **Text fallback, once chosen, is sticky for the rest of the session.**
- **Session state doesn't persist** — backgrounding mid-recording/processing resumes at Idle for that term; exiting early is a fresh start next time, not a true resume, even though `docs/design-brief.md`'s kickoff spec says "leaving, progress saves, returning resumes."
- **XP is summary-only**, not a live counter during the loop (not yet present on the built Summary frame).
- **The summary's language is meant to react** to the unaided/hinted/revealed ratio (the brief's "was it earned?" problem) — not yet implemented copy, just a decision.
- **This is presentation-only** — mocked data doesn't need to be shaped like a real STT/judge API response; nothing here is meant to be a handoff contract for engineering.

## Open — undecided, not picked for you

- Result: Pass and Result: Incorrect both carry a "Retry" button that lets the student re-attempt a term directly, without going through Hint first (discovered on closer inspection of nodes 15783:7408 and 15783:7640, not called out before). Whether Retry is meant to bypass the hint ladder entirely, or should be disabled/hidden once a hint has been shown, was never decided.
- Whether Badge variants other than `recall` (`streak`, `fire`, `pro`) are meant to be tap targets too, or `recall` alone.
- Whether a student reaching a from-scratch fresh session after an early exit sees the previously "not attempted" terms folded back into the same due list, or something else — "fresh start, same due list" was decided, but the resulting due-list content logic wasn't spelled out.

## Verification — how to check this is done and correct, end to end

1. **State coverage.** Every row in `docs/voice-ux.md`'s states table maps to either a built screen above, a listed gap, or an explicit out-of-scope/if-time entry. None should be unaccounted for.
2. **Happy path click-through.** Home → tap `recall` Badge → Due list → tap a Card → Entry/recap → tap mic → Idle → tap mic → Recording → tap mic → Processing → Result: Pass → pick a grade → Continue → repeats for each due term → Summary → Continue.
3. **Failure paths, each walked explicitly:** permission denied at entry, Cancel during Recording, Skip at Idle, Incorrect → Hint → re-attempt → (second miss) → Reveal, Partial, "Type instead" fallback, exit mid-session via the confirm dialog.
4. **No invented components or props.** Every instance used should match a real story in Storybook — check with `docs-show` per component (`mcp__storybook__docs-list` / `docs-show`) rather than trusting memory of what a component "should" have.
5. **No invented token values.** Every color/size/type value traces to a path in `tokens/tokens.json`; no `var(--x, #fallback)`, nothing hand-set that has a token.
6. **Design-system hard rules spot-check:** one Primary button max per screen, Destructive never paired with Primary on the same screen, sentence case on every label.
7. **Storybook test-run** across the touched components (`ChatBubble`, `Badge`, `VoiceInput`, `Radio`, `ResultCard`, `ResultTable`) — component tests and accessibility checks both need to pass, not just the visual review.
8. **Not-building list check.** Confirm nothing from `docs/sprint-context.md`'s "Not building" section has crept back in (multi-turn branching, a standalone primer screen, MCQ↔voice switching, etc.) — including the "Recording paused. Tap again to resume." copy on screen #4, which currently contradicts the "no pause/resume within one take" decision and needs a resolution before this is called done.
9. **Component provenance.** Spot-check that every button-shaped instance actually resolves to the real `button` component set, not a detached duplicate — screen #4's "Submit" and the Home screen's "Refer" both currently point to an orphaned component (`button/Default/s/default`) outside any component set.
