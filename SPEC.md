# Voice Recall Prototype — Spec

## What we're building

A voice-in/text-out active-recall step for Knowunity: the student speaks a due term aloud, Knowie judges it (mocked) and replies in text, then the student grades their own recall difficulty. Mobile iOS, 390px, dark mode only, single-turn per term — presentation-only clickthrough, not wired to real STT or judging.

## Screen list, build order (easiest first)

Ordered by how much is already real in Figma/Storybook vs. still needs building. "Built" means a real, instantiated Figma frame with real component instances exists (verified directly, not inferred from the old text-only flow annotations).

1. **Home screen** — built (`home-screen-knowie`)
2. **Due list** — built (`Direction C1 – Due list, delinearized`)
    - **2a. Due list, all caught up** — not built, no frame. Where the last Summary's Continue lands.
3. **Entry / recap screen** — built (Voice Review Screen, node 15783:6710); granted and denied both live in code
4. **Prompt screen — idle, prompt shown, with Skip** — built (Voice Review Screen, node **16023:6960**)
5. **Recording / Listening** — built (Voice Review Screen, node 15783:6833)
    - **5b. Recorded — stopped, Submit shown** — built (Voice Review Screen, node 15783:7103). Lettered so #6–#15 keep the numbers other sections already cite.
6. **Processing** — built (Voice Review Screen, node 15783:7209)
7. **Result: Pass + review interval** — built (Voice Review Screen, node 15783:7408)
8. **Result: Incorrect + review interval + Hint** — built (Voice Review Screen, node 15783:7640)
9. **Hint nudge** — built (Voice Review Screen, node 15868:631)
10. **Summary** — built, missing the "Try again" secondary button and XP (`knowledge-check-results`)
11. **Result: Partial + review interval** — not built. `ChatBubble` has a `partial` variant now (`stories/components/ChatBubble/ChatBubble.tsx`); no screen composition exists yet.
12. **Entry / recap screen, permission-denied variant** — built in code, no Figma frame. Composed from the decided behavior (see below), not traced pixels.
13. **Reveal (second miss, terminal)** — **not in the flow.** Dropped: the hint loop (#9) replaces it. See the detail below.
14. **Text fallback (typing) screen** — not built. The "Type instead" link exists on 16023:6960, 15783:6833, 15783:7103 and 15868:631 (and on the entry screen's denied state) but points nowhere.
15. **Exit-session confirm dialog** — not built, reached from the ⋯ menu. No modal/dialog component exists in the library at all; the Scaffold's bottom-sheet slot (`docs/design-system.md`, "Scaffold composition") is its intended home.
16. **⋯ menu** — not built, no frame. The only route to the exit confirm, so #15 is unreachable without it.

**#4, #5 and #5b are one screen in three states**, not three screens: one route (`/recap/[topicId]/prompt/[termIndex]`), the mic tap moving between them — idle → listening → stopped → listening… They are listed separately because the rest of this doc, and `docs/voice-ux.md`'s states table, reference them that way.

> **Correction, 2026-09-15.** This list previously named 15783:7103 as the idle "prompt shown, with Skip" screen. It isn't — 7103 is the state *after* the student stops recording, which is why Submit appears on it. The idle state is 16023:6960, a frame this doc had omitted entirely. The flag that used to sit under #4 followed from that mix-up: its "leftover pause/resume copy" reading assumed an idle screen, when the copy in fact belongs to a stopped one. See #5b for what replaced it.

---

## Per-screen detail

### 1. Home screen
**States:** one.
**Components:** `Badge` (variant=`recall`/`streak`/`fire`/`pro`), `Pill` (variant=`scan`/`flashcards`/`quiz`/`summarize`), `Mascot` (state=standby — used in Figma, not yet a Storybook entry).
**Student can:** tap the `recall` `Badge` → Due list (now a real tap target — see `stories/components/Badge/Badge.tsx`). Tap a `Pill` → other tools, out of scope for this feature.

### 2. Due list
**States:** two — the list (built), and an all-caught-up state (#2a, not built).
**Components:** `Card` (title/topicCountText/durationText), `Badge` (all four variants), `Mascot` (standby).
**Student can:** tap a `Card` → opens the entry/recap screen for that topic's terms, or tap the "Choose your own topics" link below the list — a real tap target with no destination, since no topic picker is being built.
**Content:** the frame repeats one card twice. The instance count is matched, but the **second card carries a different topic and terms** — a deliberate departure from the frame's content, so that a chained session (Summary → next topic) doesn't ask the same three questions twice.

### 2a. Due list, all caught up — not built
Where the last topic's Summary → Continue lands. Nothing due, recall badge cleared. No frame, no design yet — the one screen the chained-session flow needs and doesn't have.

### 3. Entry / recap screen
**States:** granted (frame 15783:6710) / denied (no frame — decided behavior only, see Open).
**Components:** `ChatBubble` (state=default), `Chips` (size=M, color=brand, one per topic), `VoiceInput` (state=Idle), `ButtonIcon` (variant=Tertiary, size=S for the bar; variant=Brand, size=XS for the "+"), `ProgressIndicator` (variant=Primary, thickness=24), `Mascot` (standby).
**Student can:** tap `VoiceInput` → asks for real mic permission (`getUserMedia`, on tap only, never on entry) and on grant opens term 1's prompt screen (#4), which is where recording actually happens. There is no Listening state on this screen — its frame has none. Tap "Or tap next →" to reach #4 without the mic. First-run explanation copy lives here (no separate primer screen, per `sprint-context.md`).
**Denied:** `VoiceInput` disabled, "Microphone is off" callout, chat bubble swaps to the can't-hear-you copy, and the bottom link becomes "Type instead". Reachable live (deny the browser prompt) or with `?mic=denied` for presenting it without an OS-level denial. Copy is the decided behavior, not traced pixels.
**Gap:** in the granted state this screen's bottom link is "Or tap next →", not "Type instead" — so a student who never gets past it, and who *hasn't* been denied, still has no visible route to text fallback. That is the frame's own composition, not an implementation shortcut.

### 4. Prompt screen — idle, prompt shown, with Skip
**Frame:** 16023:6960. **State 1 of 3** (recurs per term).
**Components:** `Mascot` (standby), `ChatBubble` (default, carrying the term's question), `Button` (variant=tertiary, size=m, "Skip"), `VoiceInput` (state=Idle), `ProgressIndicator` (Primary/24/25), `ButtonIcon` (Tertiary/S ×2 in the bar), a "Type instead" text link. **No Submit on this state** — Submit belongs to #5b.
**Copy:** eyebrow "TERM 1 OF 3 · HUMANISM"; callout under the mic is a single secondary line, "Tap to start" — not the bold-title-plus-hint pair the entry screen uses.
**Student can:** tap `VoiceInput` to start recording (→ #5), tap Skip (ungraded, term stays due unchanged — no interval effect), tap "Type instead" → text fallback (not built, inert).

**Built-state notes:** Skip advances to the next term's prompt screen and is inert on the last term, since Summary isn't routed yet. Only term 1 (Humanism) has frames — terms 2 and 3 reuse this composition with question copy invented to match its tone (recorded in `app/due-terms.ts`). The progress bar reads 25% on all three states in all three frames; nothing defines what it should read for terms 2 and 3.

### 5. Recording / Listening
**Frame:** 15783:6833. **State 2 of 3** — the same screen as #4.
**Components:** `Mascot` (standby), `ChatBubble` (default, same question), `VoiceInput` (state=Listening), `Button` (variant=destructive, size=s — Cancel), `ProgressIndicator`, a "Type instead" link. **Skip is absent on this state** — it is in #4 and #5b but not while recording.
**Copy:** callout reads "Listening. Speak now (tap to pause)".
**Student can:** tap `VoiceInput` again to stop (tap-to-start/tap-to-stop, not press-and-hold) → #5b. Tap Cancel → discards instantly, back to #4's idle state, never counts as an attempt.

**Note:** Cancel sits in the same slot #5b's Submit occupies (both at y=518 in their frames), so the two never appear together — Destructive and Primary are never on screen at once, which is what `design-system.md` requires.

### 5b. Recorded — stopped, Submit shown
**Frame:** 15783:7103. **State 3 of 3** — the same screen as #4 and #5.
**Components:** identical to #4 (Skip is back, `VoiceInput` returns to Idle) plus `Button` (variant=primary, size=s, "Submit") in the action slot.
**Copy:** callout reads "Recording paused.  Tap again to resume."
**Student can:** tap Submit → judging/Processing (#6, not built — inert). Tap `VoiceInput` again → back to #5. Tap Skip, or "Type instead", as in #4.

**Open — the frame's copy contradicts a logged decision.** This state's callout, and #5's, both describe pausing and resuming a take. `docs/sprint-context.md`'s "Not building" list explicitly excludes "pause and resume within one take," and `CLAUDE.md`'s Never list points at that doc. `CLAUDE.md` also requires matching Figma 100%, including the exact copy of every text node. The build follows Figma — the copy is verbatim and the third tap returns to Listening — and the conflict is logged here rather than quietly resolved either way. Settling it means either changing the frames' copy or changing the Not-building list.

**Resolved — the "Submit" provenance flag.** Figma's Submit layer is a detached duplicate sitting outside any component set (`button/Default/s/default`, the same orphan reused as "Refer" on Home), positioned by absolute coordinates. It is built as the real `Button` (variant=primary, size=s), which matches its look exactly; the absolute position was an artifact of the detached layer, so the pill is placed in normal flow and measured onto the frame's y. The Figma layer still wants fixing at source.

### 6. Processing
**States:** one.
**Components:** `ChatBubble` (default, "Thinking..."), `VoiceInput` (state=Disabled), `Mascot` (thinking).
**Student can:** nothing — fixed ~1.5–2s delay, not tappable.

### 7. Result: Pass + review interval
**States:** one.
**Components:** `ChatBubble` (state=correct), `Mascot` (excited), `Radio` (state=Easy/Default × 3 rows), `Button` (variant=secondary, size=l, "Retry") + `Button` (variant=primary, size=l, "Continue") in a footer actions row.
**Student can:** pick a grade, tap Retry, or tap Continue → next term, or Summary if this was the last term.
**Retry** is on all three result screens (Pass, Partial, Incorrect). It is *not* part of the hint ladder — it's for a student who wants to say the answer again before their next review interval, including after an unaided pass.

### 8. Result: Incorrect + review interval + Hint
**States:** two — before a hint is requested, and after.
**Components:** `ChatBubble` (state=incorrect), `Mascot` (confused), `Radio` × 3, `Button` (variant=**secondary**, size=s, "Hint") next to the chat bubble, plus the footer pair `Button` (secondary, l, "Retry") + `Button` (primary, l, "Continue").
**Student can:** pick a grade (grading is offered at every result including this first miss — **last tap wins**), tap Hint → #9, tap Retry to re-record without a hint, or tap Continue to move on.
**On Hint:** the footer container holding Retry and Continue **disappears**, because the hint screen carries its own retry logic. That is also what keeps this screen to one Primary.
**Departure from the frame:** Figma draws Hint as primary/s alongside Continue as primary/l — two Primaries on one screen, which `CLAUDE.md` forbids. Hint is built as **secondary**; Continue keeps the Primary bottom-CTA slot. Wants fixing at source.

### 9. Hint nudge
**States:** one.
**Components:** `ChatBubble` (state=default, hint copy), `Mascot` (standby), `Button` (variant=primary, size=s, "Repeat Question"), `VoiceInput` (state=Idle).
**Student can:** tap `VoiceInput` to re-record from here, or tap "Repeat Question" → returns to **that term's original prompt screen** (#4), the instance where the question was first asked.
**This closes the loop.** There is no second hint and no reveal — a student can go round hint → re-record → result as many times as they like, or take Continue at any result. This screen is also the entirety of the brief's "say it back" idea.

### 10. Summary
**States:** one. **No progress bar on this screen**, per the frame.
**Components:** `ResultCard`, `ResultTable`, `Chips` (size=S, color=Primary, one per term showing the chosen interval), a `Button` (variant=primary, size=l, "Continue").
**Student can:** tap Continue → **the next due topic's recap screen (#3)**, chaining sessions without passing back through the due list. After the last due topic, Continue goes to the due list in its **all-caught-up state** (#2a).
**Gaps:** the brief specifies Continue (primary) *and* Try again (secondary) — only Continue exists on this frame. XP is decided to show here (summary-only) but no XP element appears on the built frame. `ResultTable` has no "not attempted" row status. The legend text reads "2 right / 1 partial / 1 incorrect" — Partial already flows through the real content here.

### 11. Result: Partial + review interval — not built
Composition mirrors #8: `ChatBubble` (state=partial), `Mascot` (standby), `Radio`, `Button` ("Hint", secondary) + the Retry/Continue footer pair, which disappears on Hint exactly as #8's does. No Figma frame yet.

### 12. Entry / recap screen, denied variant — built, no frame
Sticky denial: screen #3 reflects it with a disabled `VoiceInput`, "Microphone is off" copy, the can't-hear-you bubble, and a "Type instead" link that routes into text mode (#14). No Figma frame — composed from the decided behavior.

### 13. Reveal — **not in the flow**
Previously logged as a decided, terminal second-miss screen. It isn't being built and isn't part of the loop: #9's hint → re-record → "Repeat question" cycle replaces it. A student is never shown the answer outright. Removed from scope rather than left as a gap.

### 14. Text fallback (typing) — not built
**Swaps in place.** "Type instead" replaces the mic and its callout with a text field and a Submit on the same screen; eyebrow, mascot, chat bubble and Skip all stay put. Sticky for the rest of the session once chosen (not per-term), and the route a permission-denied student takes. Blocked on `textBlock`, which `docs/design-system.md` names as the right component for a student's own free-text entry but which isn't in Storybook yet. Until it exists, a denied student is dead-ended — the one live breach of the brief's "never trap the student".

### 15. Exit-session confirm — not built
Reached from the **⋯ menu**, not the back arrow: "End session now? X terms left". Confirming exits all the way to **Home**; the abandoned topic reappears in the due list untouched, as though never started. Needs two things that don't exist: the ⋯ menu itself, and a bottom sheet in Scaffold's unbuilt sheet slot (the same slot #14 doesn't need, since text swaps in place).

---

## Explicitly out of scope

From `docs/sprint-context.md`'s "Not building" list:
- Multi-turn tutoring or open conversation branches
- A standalone first-run primer screen (folded into the entry screen instead)
- Auto-endpointing
- Real speech-to-text or real judging (both mocked)
- Full-fidelity designs for the chat entry point (the recall badge *is* built — it's the prototype's entry)
- Language switching mid-answer
- Mic-busy handling (student on a call, etc.)
- A post-quiz/revision completion prompt screen
- A topic-picker screen behind the "+" and "Choose your own topics"
- A Reveal screen, or a second hint (#13 — the miss loop replaces both)
- Switching between voice and multiple-choice mode mid-round (the *Practice round voice flow* Figma exploration is not the committed concept)

If-time, not guaranteed (`docs/voice-ux.md`): a single consolidated "something went wrong with the recording, please try again" state, covering empty/silent recording, garbled transcript, judge timeout, and dropped network. Not built.

## How the mocked recall behaves

- **Judging is scripted per term** — each due term has a pre-set outcome baked in; stopping the recording always advances to that term's scripted result regardless of what was said. Fully deterministic.
- **Gesture is tap-to-start / tap-to-stop**, not press-and-hold. A third tap on the stopped state resumes the same take — **pause and resume within one take is in scope**, settled in the frames' favour and removed from the Not-building list.
- **Progress reads 25% on term 1, 75% on term 2, 100% on term 3**, and the bar is **absent from the Summary**. It skips 50 by design.
- **Back steps, ⋯ ends.** The back arrow walks back one screen with no confirmation. The ⋯ menu carries the exit → "End session now? X terms left" → confirming goes to **Home**, and the abandoned topic returns to the due list untouched.
- **Summary → Continue chains** into the next due topic's recap screen; after the last, into the due list's all-caught-up state (#2a).
- **Mic permission is real**, requested with `getUserMedia` on the entry screen's mic tap and never on screen entry. Nothing is recorded: a granted stream is stopped immediately, since real STT/judging stays out of scope. A denial lands on the entry screen's denied state.
- **Cancel is always free** — never counts as an attempt against the hint ladder.
- **Processing is a fixed ~1.5–2s delay**, not variable.
- **Grading happens at every result, including misses**, and the last grade tapped for a term is what's recorded — a term can be graded on the first miss, re-graded after a hint, and re-graded again on an eventual pass; only the final tap sticks. This is a deliberate departure from the brief's own spec (grade once, at the end, after the hint ladder finishes) — flagged, not silently followed.
- **Skip is ungraded** — the term stays due at its existing interval, unchanged.
- **The miss recovery is a loop, not a ladder.** Incorrect → Hint (which removes the Retry/Continue container) → #9, where the student re-records or taps "Repeat question" to return to that term's original prompt screen. Repeatable indefinitely; Continue at any result moves on. **No second hint, no Reveal.**
- **Retry is not part of that loop** — it sits on all three result screens for a student who wants to say the answer again before the next review interval, and it vanishes with its container once a hint is requested.
- **Text fallback, once chosen, is sticky for the rest of the session**, and swaps in place on the same screen rather than opening one of its own.
- **Session state doesn't persist** — backgrounding mid-recording/processing resumes at Idle for that term; exiting early is a fresh start next time, not a true resume, even though `docs/design-brief.md`'s kickoff spec says "leaving, progress saves, returning resumes."
- **XP is summary-only**, not a live counter during the loop (not yet present on the built Summary frame).
- **The summary's language is meant to react** to the unaided/hinted/revealed ratio (the brief's "was it earned?" problem) — not yet implemented copy, just a decision.
- **This is presentation-only** — mocked data doesn't need to be shaped like a real STT/judge API response; nothing here is meant to be a handoff contract for engineering.

## Open — undecided, not picked for you

*Settled 2026-09-15 — the miss loop, Retry's role, pause/resume, grading, progress values, exit behaviour, the post-Summary destination, text fallback's shape, the two-Primary conflict, the entry point, the topic picker, and the duplicate topics. See `docs/sprint-context.md`'s "Flow decisions" block. What's left:*

- Whether Badge variants other than `recall` (`streak`, `fire`, `pro`) are meant to be tap targets too, or `recall` alone.
- What the XP mechanic actually is (the brief's own open question 2) — decided to be summary-only, but no element exists on the frame and nothing defines how it's earned.
- What the Summary's reactive language actually says at each unaided/hinted ratio — decided as a principle, never written.
- **`ChatBubble` is 6px narrower than the frames.** All the voice frames run the bubble to x=366, the 24px page gutter; the shared component caps at `max-width: 256px`, so it stops at 360 and sits ~4px left of the frame's edge. Fixing it means editing a Storybook component that the entry screen uses too, which `CLAUDE.md` says to flag before doing — so it's flagged, not done.
- **The frames disagree with each other by 4px.** #4 and #5b pin the trigger zone at 259px (mic top y=585); #5 uses 263px with no bottom padding (mic top y=581). Matching each state exactly would make the mic jump the moment recording starts, so the build uses 259 everywhere. Worth fixing at source.
- **Flow-screen `appBar` is now inlined twice.** `component-gaps.md` says to promote it to a real `AppBar` component on the second screen that needs it — the prompt screen is that second screen, and the bar is currently copied into its CSS module instead. Owed.

## Verification — how to check this is done and correct, end to end

1. **State coverage.** Every row in `docs/voice-ux.md`'s states table maps to either a built screen above, a listed gap, or an explicit out-of-scope/if-time entry. None should be unaccounted for.
2. **Happy path click-through.** Home → tap `recall` Badge → Due list → tap a Card → Entry/recap → tap mic (grants permission) → prompt idle (#4) → tap mic → Recording (#5) → tap mic → stopped, Submit shown (#5b) → Submit → Processing → Result: Pass → pick a grade → Continue → repeats for each due term → Summary → Continue. Built as far as #5b; Submit is inert from there on.
3. **Failure paths, each walked explicitly:** permission denied at the entry screen's mic tap, Cancel during Recording, Skip at #4 or #5b, Incorrect → Hint → re-attempt → (second miss) → Reveal, Partial, "Type instead" fallback, exit mid-session via the confirm dialog.
4. **No invented components or props.** Every instance used should match a real story in Storybook — check with `docs-show` per component (`mcp__storybook__docs-list` / `docs-show`) rather than trusting memory of what a component "should" have.
5. **No invented token values.** Every color/size/type value traces to a path in `tokens/tokens.json`; no `var(--x, #fallback)`, nothing hand-set that has a token.
6. **Design-system hard rules spot-check:** one Primary button max per screen, Destructive never paired with Primary on the same screen, sentence case on every label.
7. **Storybook test-run** across the touched components (`ChatBubble`, `Badge`, `VoiceInput`, `Radio`, `ResultCard`, `ResultTable`) — component tests and accessibility checks both need to pass, not just the visual review.
8. **Not-building list check.** Confirm nothing from `docs/sprint-context.md`'s "Not building" section has crept back in (multi-turn branching, a standalone primer screen, MCQ↔voice switching, etc.). One item is knowingly contested rather than clean: the pause/resume copy on #5 and #5b, built to match the frames. That is a decision waiting on a person, not a check that can pass or fail.
9. **Component provenance.** Spot-check that every button-shaped instance actually resolves to the real `button` component set, not a detached duplicate. In code this is settled — #5b's Submit is a real `Button` (primary/s) — but the *Figma* layer is still the orphaned `button/Default/s/default`, as is the Home screen's "Refer".
10. **Measure, don't look.** Every screen's positions are verified with `node scripts/verify-screen.mjs <route> --figma <png>` against an exported frame, on `localhost:3000`. Three bugs on #4/#5/#5b were invisible by eye and only fell out of measurement: the trigger zone sitting 27px low, the action pill 24px high, and `VoiceInput`'s Listening mark rendering at 68px instead of 112px (a 182×184 SVG being flex-shrunk — fixed in the component, which is shared, so it changes that Storybook story too).
