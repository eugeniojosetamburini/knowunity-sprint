# Voice Recall Prototype — Spec

## What we're building

A voice-in/text-out active-recall step for Knowunity: the student speaks a due term aloud, Knowie judges it (mocked) and replies in text, then the student grades their own recall difficulty. Mobile iOS, 390px, dark mode only, single-turn per term — presentation-only clickthrough, not wired to real STT or judging.

## Screen list, build order (easiest first)

Ordered by how much is already real in Figma/Storybook vs. still needs building. "Built" means a real, instantiated Figma frame with real component instances exists (verified directly, not inferred from the old text-only flow annotations).

1. **Home screen** — built (`home-screen-knowie`)
2. **Due list** — built (`Direction C1 – Due list, delinearized`)
    - **2a. Due list, all caught up** — built in code (`/due-list?caughtUp=1`), **no frame**. Where the last Summary's Continue lands.
3. **Entry / recap screen** — built (Voice Review Screen, node **16031:7075**, which supersedes 15783:6710 — the mic was replaced by a primary "Ready" button, 2026-09-15)
4. **Prompt screen — idle, prompt shown, with Skip** — built (Voice Review Screen, node **16023:6960**)
5. **Recording / Listening** — built (Voice Review Screen, node 15783:6833)
    - **5b. Recorded — stopped, Submit shown** — built (Voice Review Screen, node 15783:7103). Lettered so #6–#15 keep the numbers other sections already cite.
6. **Processing** — built in code (Voice Review Screen, node 15783:7209)
7. **Result: Pass + review interval** — built in code (Voice Review Screen, node 15783:7408)
8. **Result: Incorrect + review interval + Hint** — built in code (Voice Review Screen, node 15783:7640)
9. **Hint nudge** — built in code (Voice Review Screen, node 15868:631)
10. **Summary** — built in code (`knowledge-check-results`, node 15731:3960). Still missing the "Try again" secondary button and XP, neither of which the frame draws.
11. **Result: Partial + review interval** — built in code, **no Figma frame**. Composed from #8's layout as this doc specifies, not traced pixels.
12. **Entry / recap screen, permission-denied variant** — **dropped 2026-09-15.** The denied state now lives only where permission is actually requested: the prompt screen (#4/#5) and the hint screen.
13. **Reveal (second miss, terminal)** — **not in the flow.** Dropped: the hint loop (#9) replaces it. See the detail below.
14. **Text fallback (typing)** — **built in code 2026-09-15, no Figma frame.** Swaps in place on the prompt screen and the hint screen; sticky for the session, with "Use voice instead" to switch back.
15. **Exit-session confirm** — **built in code 2026-09-15, no Figma frame.** Reached from the ⋯ menu on the four mid-session screens; confirming exits to Home.
16. **⋯ menu** — **built in code 2026-09-15, no Figma frame.** One item, "End session", carried by `AppBar`.

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

### 2a. Due list, all caught up — built in code, **no Figma frame**
**Route:** `/due-list?caughtUp=1`. Where the last topic's Summary → Continue lands. The bars, the greeting, the mascot and the footer link stay exactly where the list puts them; the card list is replaced by one reassurance line and the recall badge clears to "0".

**Everything on it was decided, not read** (2026-09-15) — nothing about this state is drawn anywhere:
- Headline "You're all caught up", replacing "Let's review what you've learned so far".
- Body copy: "Nothing is due right now. Come back tomorrow, or pick a topic to review early."
- The recall badge shows "0" rather than being hidden — `TopNav` takes a `dueCount` string and has no prop to drop the badge, and clearing the count says the same thing without editing a shared component.
- The query-param entry (`?caughtUp=1`), so the state can be presented without walking two whole sessions first. (This pattern was borrowed from the entry screen's old `?mic=denied`, which has since been removed with that screen's denied state — `?caughtUp=1` is now the only query-param state in the prototype.)
- The way forward is the existing (inert) "Choose your own topics" link plus the bottom nav — the student isn't trapped, but the only *live* exit is the nav.

**Structural note:** `/due-list` is statically prerendered, so `useSearchParams` in it fails the build. The flag is read from the Page's own `searchParams` prop (Next's documented alternative) and passed down; the screen itself moved to `app/due-list/DueListScreen.tsx`. The entry screen keeps `useSearchParams` because its route is dynamic.

### 3. Entry / recap screen
**Frame:** **16031:7075** (supersedes 15783:6710). **States:** one.
**Components:** `ChatBubble` (state=default), `Chips` (size=M, color=brand, one per topic), `ButtonIcon` (variant=Tertiary, size=S for the bar; variant=Brand, size=XS for the "+"), `ProgressIndicator` (variant=Primary, thickness=24), `Mascot` (standby), `Button` (variant=primary, size=l, "Ready").
**Student can:** tap "Ready" → term 1's prompt screen (#4), which is where recording actually happens. First-run explanation copy lives here (no separate primer screen, per `sprint-context.md`).

> **Revised 2026-09-15 — the mic left this screen.** The old frame ended in a `VoiceInput`, a two-line callout under it ("Tap to start" / "approx. 2-3 min · speak naturally") and an "Or tap next →" link. The new frame replaces all three with a single primary "Ready" button (node 16031:7175, a fixed 138×56). Everything above the trigger zone is identical in both frames and was left untouched.

**Mic permission moved with it.** This screen used to call `getUserMedia` on its mic tap; nothing here asks now. The first permission prompt is the **prompt screen's** own mic tap (#4/#5), which already requested it and already handled a denial. This is a closer reading of the "on tap-to-record, never on screen entry" rule, not a looser one — nothing was ever recorded on this screen, so asking here was always early.

**Two consequences, flagged not resolved:**
- **#12's denied state was dropped from this screen** (decided 2026-09-15). Three of its four elements (disabled `VoiceInput`, "Microphone is off" callout, "Type instead" link) lived in the zone this frame replaces, and with nothing here requesting permission a real denial can't land here either — what was left was a bubble saying "I can't hear you" above a button saying "Ready". The `?mic=denied` param and the can't-hear-you copy are gone from the code. See #12.
- **The old "no visible route to text fallback" gap is gone from this screen.** It used to be that a student who wasn't denied saw "Or tap next →" rather than "Type instead". Now there is no link at all — but "Ready" always leads to #4, which carries its own "Type instead", so the student is never stuck.

### 4. Prompt screen — idle, prompt shown, with Skip
**Frame:** 16023:6960. **State 1 of 3** (recurs per term).
**Components:** `Mascot` (standby), `ChatBubble` (default, carrying the term's question), `Button` (variant=tertiary, size=m, "Skip"), `VoiceInput` (state=Idle), `ProgressIndicator` (Primary/24/25), `ButtonIcon` (Tertiary/S ×2 in the bar), a "Type instead" text link. **No Submit on this state** — Submit belongs to #5b.
**Copy:** eyebrow "TERM 1 OF 3 · HUMANISM"; callout under the mic is a single secondary line, "Tap to start" — not the bold-title-plus-hint pair the entry screen uses.
**Student can:** tap `VoiceInput` to start recording (→ #5), tap Skip (ungraded, term stays due unchanged — no interval effect), tap "Type instead" → text fallback (not built, inert).

**Built-state notes:** Skip advances to the next term's prompt screen and is inert on the last term, since Summary isn't routed yet. Only term 1 (Humanism) has frames — terms 2 and 3 reuse this composition with question copy invented to match its tone (recorded in `app/due-terms.ts`). The progress bar reads this term's value, not a fixed 25 — see "How the mocked recall behaves". The route also accepts `?record=1`, which opens it already Listening; that is how the Hint screen's mic re-records without asking for a second tap.

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
**Student can:** tap Submit → Processing (#6, built and routed). Tap `VoiceInput` again → back to #5. Tap Skip, or "Type instead", as in #4.

**Open — the frame's copy contradicts a logged decision.** This state's callout, and #5's, both describe pausing and resuming a take. `docs/sprint-context.md`'s "Not building" list explicitly excludes "pause and resume within one take," and `CLAUDE.md`'s Never list points at that doc. `CLAUDE.md` also requires matching Figma 100%, including the exact copy of every text node. The build follows Figma — the copy is verbatim and the third tap returns to Listening — and the conflict is logged here rather than quietly resolved either way. Settling it means either changing the frames' copy or changing the Not-building list.

**Resolved — the "Submit" provenance flag.** Figma's Submit layer is a detached duplicate sitting outside any component set (`button/Default/s/default`, the same orphan reused as "Refer" on Home), positioned by absolute coordinates. It is built as the real `Button` (variant=primary, size=s), which matches its look exactly; the absolute position was an artifact of the detached layer, so the pill is placed in normal flow and measured onto the frame's y. The Figma layer still wants fixing at source.

### 6. Processing
**Frame:** 15783:7209. **States:** one. **Route:** `/recap/[topicId]/processing/[termIndex]`.
**Components:** `ChatBubble` (default, "Thinking..."), `VoiceInput` (state=Disabled), `Mascot` (thinking), `AppBar`.
**Student can:** nothing — a fixed 1.8s delay, and the only screen in the flow with nothing tappable in its body. `VoiceInput` is a genuinely disabled button, not just a dimmed one.
**Then:** routes (via `replace`, so Back doesn't land in the wait again) to this term's result, whichever outcome the term is scripted to.

**Built-state note:** the trigger zone is 259px here, not this frame's 262px, so the mic doesn't hop when Submit is tapped — see Open.

### 7. Result: Pass + review interval
**Frame:** 15783:7408. **States:** one. **Route:** `/recap/[topicId]/result/[termIndex]` — one route for all three outcomes; the term's scripted `outcome` picks which is shown.
**Components:** `ChatBubble` (state=correct), `Mascot` (excited), `Radio` (Easy preselected + 2 Default), `ActionSheet` holding `Button` (secondary, l, "Retry") + `Button` (primary, l, "Continue").
**Student can:** pick a grade, tap Retry → this term's prompt screen, or tap Continue → next term's prompt. **On the last term Continue closes the session at the Summary** (#10), which is now routed.
**No Hint on a pass** — there is nothing to hint at, and the frame has none.
**Retry** is on all three result screens (Pass, Partial, Incorrect). It is *not* part of the hint loop — it's for a student who wants to say the answer again before their next review interval, including after an unaided pass.

### 8. Result: Incorrect + review interval + Hint
**Frame:** 15783:7640. **States:** one. Same route as #7.
**Components:** `ChatBubble` (state=incorrect), `Mascot` (confused), `Radio` (Difficult preselected + 2 Default), `Button` (variant=**secondary**, size=s, "Hint") tucked under the bubble's right edge, plus the `ActionSheet` pair `Button` (secondary, l, "Retry") + `Button` (primary, l, "Continue").
**Student can:** pick a grade (grading is offered at every result including this first miss — **last tap wins**), tap Hint → #9, tap Retry to re-record without a hint, or tap Continue to move on.

> **Correction, 2026-09-15.** This entry previously claimed two states — "before a hint is requested, and after" — and said that on Hint "the footer container holding Retry and Continue disappears". That contradicted its own next line, which sends Hint to #9. Settled: **Hint navigates to #9**, and this screen has one state. Nothing disappears, because the student leaves.

**Departure from the frame:** Figma draws Hint as primary/s alongside Continue as primary/l — two Primaries on one screen, which `CLAUDE.md` forbids. Hint is built as **secondary**; Continue keeps the Primary bottom-CTA slot. Wants fixing at source.

### 9. Hint nudge
**Frame:** 15868:631. **States:** one. **Route:** `/recap/[topicId]/hint/[termIndex]`.
**Components:** `ChatBubble` (state=default, hint copy), `Mascot` (standby), `Button` (variant=primary, size=s, "Repeat question"), `VoiceInput` (state=Idle), a "Type instead" link.
**Student can:** tap `VoiceInput` to re-record from here (it asks for permission, then opens the prompt screen already Listening via `?record=1`), or tap "Repeat question" → returns to **that term's original prompt screen** (#4), the instance where the question was first asked.
**Departure from the frame:** the frame labels the button "Repeat Question" in title case. It is built **sentence case**, which `CLAUDE.md` requires of every label — the frame's is the only title-case label in the prototype. Wants fixing at source.
**This closes the loop.** There is no second hint and no reveal — a student can go round hint → re-record → result as many times as they like, or take Continue at any result. This screen is also the entirety of the brief's "say it back" idea.

### 10. Summary
**Frame:** 15731:3960 (`knowledge-check-results`). **States:** one. **Route:** `/recap/[topicId]/summary`. **No progress bar on this screen**, per the frame — `AppBar` centres the title "Summary" in the slot the other flow screens give the bar.
**Components:** `AppBar` (back / title / ⋯, no progress), `Mascot` (excited, peeking out from behind the card), `ResultCard`, `ResultTable`, a `Button` (variant=primary, size=l, "Continue") in Scaffold's bottom slot, and an underlined "Change review time" drill-down link.
**Student can:** tap Continue → **the next due topic's recap screen (#3)**, chaining sessions without passing back through the due list. After the last due topic, Continue goes to the due list in its **all-caught-up state** (#2a). The back arrow returns to the last term's result. "Change review time" is a real tap target with no destination.

**Four decided departures from the frame** (all settled with the user 2026-09-15, not resolved quietly):

1. **Three terms, not four.** The frame draws a four-row table (Humanism / Anthropocentrism / Link to antiquity / Medieval theocentrism) and a card reading 50% · "2 right / 1 partial / 1 incorrect". The built session is three terms and five screens are already measured against frames whose own copy says "TERM 1 OF 3". The layout is the frame's; the **content is derived from the session the student actually did** — the same call already made for the due list's second card. Row count, counts and percentage all read `app/due-terms.ts`, so term 1's topic shows 33% · 1 right / 1 partial / 1 incorrect.
2. **Real copy, not the frame's placeholders.** "Subtitle here about something.", "Something here" and "A quick three line review of how the student did this time around." are filler, replaced with written copy — the same precedent as the frames' placeholder Knowie lines. The review paragraph is where this doc's decided-but-never-written **reactive language** finally lands: `summaryReview` in `app/due-terms.ts` has three bands (all unaided / none unaided / mixed), each kept to the two lines the frame's paragraph is drawn at so the card stays 186px.
3. **No "Try again", no XP.** Both are gaps between the brief and this frame. The frame draws neither, XP still has no defined mechanic, component or token anywhere, and both stay open below.
4. **The grades shown are each result screen's pre-selected grade**, not what the student tapped — nothing stores that (see "Nothing consumes a grade"). `GRADE_FOR_OUTCOME` and `INTERVAL_FOR_GRADE` in `app/due-terms.ts` are shared with the result screens so the two can't drift.

**Frame differences that are the shell's, not this screen's:** the Summary frame draws its top bar 56px tall with 40px tap targets, where every other flow frame — and `AppBar` — uses 64px and 48px. The bar keeps 64px, because `CLAUDE.md` requires it sit in the same place on every route; the ⋯ glyph therefore lands ~3px left of the frame's. Flagged, wants fixing at source.

**Remaining gaps:** `ResultTable` has no "not attempted" row status (so a skipped term has no representation here). The topic title renders "Renaissance Philosophy" from the shared data, where this frame sentence-cases it — see Open.

### 11. Result: Partial + review interval — built in code, **no Figma frame**
Composition mirrors #8 exactly, as this entry specified: `ChatBubble` (state=partial, "Almost!"), `Mascot` (standby), `Radio` × 3, `Button` ("Hint", secondary) → #9, plus the same `ActionSheet` Retry/Continue pair. Same route as #7 and #8.

**Three things were decided rather than read, since no frame exists** (2026-09-15): the mascot is standby (per this entry), the pre-selected grade is **Medium** (sitting between Pass's Easy and Incorrect's Difficult), and Hint appears here as it does on #8. Everything else is #8's measured layout.

### 12. Entry / recap screen, denied variant — **dropped 2026-09-15**
This described screen #3 reflecting a denial with a disabled `VoiceInput`, "Microphone is off" copy, the can't-hear-you bubble, and a "Type instead" link. Three of those four lived in the mic zone that frame 16031:7075 replaced with a "Ready" button, and with nothing on #3 requesting permission, a real denial could no longer land there. What remained was a bubble saying "I can't hear you" above a button saying "Ready" — a half-state with no affordance attached.

**Decided: dropped.** The `?mic=denied` param, the can't-hear-you copy and the `denied` branch are all removed from `app/recap/[topicId]/page.tsx`. Screen #3 now has exactly one state.

**The flow still covers denial**, which `docs/voice-ux.md`'s states table marks a **Must** ("Permission denied → route to text"). It lives where permission is actually asked for:
- **Prompt screen (#4/#5)** — requests `getUserMedia` on the mic tap, disables the mic and shows "Microphone is off" on a refusal, with "Type instead" beneath it.
- **Hint screen (#9)** — the same handling, for a re-record from there.

That is a better place for it than #3 ever was: the state now appears at the moment the student is actually refused, rather than one screen early.

**Closed since:** "Type instead" was inert when this was written, so a denied student was dead-ended at the prompt screen. #14 was built 2026-09-15 and that route now works.

### 13. Reveal — **not in the flow**
Previously logged as a decided, terminal second-miss screen. It isn't being built and isn't part of the loop: #9's hint → re-record → "Repeat question" cycle replaces it. A student is never shown the answer outright. Removed from scope rather than left as a gap.

### 14. Text fallback (typing) — **built in code 2026-09-15, no Figma frame**
**Not a screen of its own — it swaps in place.** "Type instead" replaces the mic and its callout with a `TextField` (multiline) and a Submit, on the **prompt screen** (#4/#5/#5b) and the **hint screen** (#9). The bar, eyebrow, mascot, chat bubble and Skip all stay exactly where they are, and the zone keeps the flow's standard 259px — verified by measurement: every element above the zone sits at an identical position in both modes, on both screens.

**Components:** `TextField` (multiline, rows=3, placeholder "Type your answer"), `Button` (variant=primary, size=s, "Submit"), and a "Use voice instead" text link in the `linkCondensed` style — the same link slot "Type instead" occupies in voice mode. Shared by both screens as `app/recap/[topicId]/TypeTrigger.tsx`, the sibling of `MicTrigger`.

**Student can:** type an answer and Submit → Processing (#6) → that term's scripted result, exactly as the voice path does. Tap Skip, which stays put. Tap "Use voice instead" to go back to the mic.

**Five things were decided rather than read** — no frame covers any of this (settled with the user, 2026-09-15):

1. **Sticky, but not a one-way door.** `SPEC.md` said text mode is "sticky for the rest of the session once chosen", while `docs/sprint-context.md` said a denied student gets "a way to re-enable, so no student is trapped by a 'no'". Both hold if stickiness is a *default* rather than a trap: the mode persists across terms, and "Use voice instead" sits exactly where "Type instead" did.
2. **It persists in `sessionStorage`** (`app/recap/[topicId]/textMode.ts`), not a threaded query param or React context. A param can be silently dropped by any link in the flow that forgets to pass it, which would hand a microphone back to someone who can't use one; context doesn't survive a hard reload, which matters when the reason you are typing is that the mic was refused. It clears with the tab, so a new session starts at voice. This is a deliberate exception to "session state doesn't persist" below — that line is about review progress, and this is an accessibility setting.
3. **The typed answer is echoed on the result screen**, above Knowie's reply, under a "You typed" label. `docs/voice-ux.md` calls showing the answer back a transparency pattern, and in text mode the words are real rather than mocked STT. **This departs from the result screens' measured frames**, which have no slot for it — it renders only on a typed term, so a spoken walkthrough is unchanged. No component covers a student's own utterance (`ChatBubble` is Knowie's dialogue only), so the block is built inline and logged in `component-gaps.md`.
4. **Submit is disabled while the field is empty.** Nothing to judge, and a scripted result arriving from an empty answer reads as a bug in a walkthrough. Skip and "Use voice instead" are both still available, so this never traps anyone.
5. **On the hint screen, "Repeat question" drops to Secondary while typing.** In text mode that screen would otherwise carry two Primaries — "Repeat question" (primary/s per frame 15868:631) and the field's Submit — which `CLAUDE.md` forbids. Submit takes the Primary, being the forward action; in voice mode "Repeat question" is Primary again, exactly as the frame draws it.

**Also decided:** switching to text from the prompt screen's *stopped* state discards the take first. Nothing was recorded anyway, and leaving the screen stopped behind a text field would strand a Submit the student can no longer reach.

**This closes the "never trap the student" breach.** A student refused the mic on the prompt or hint screen now has a working route forward.

### 15. Exit-session confirm, and 16. the ⋯ menu — **built in code 2026-09-15, no Figma frame**
Reached from the **⋯ menu**, not the back arrow. ⋯ opens a one-item menu ("End session"), which opens a modal sheet: "End session now? / X terms left. They stay due, so you can pick this up again later." Confirming exits all the way to **Home**; the abandoned topic reappears in the due list untouched, as though never started — which costs nothing to honour, since no progress is stored anywhere.

**Components:** `BottomSheet` (design-system.md's slot 5 — the modal, scrimmed sheet, *not* `ActionSheet`), holding a `TextBlock` (variant=M) over a `ButtonGroup` (variant=vertical, size=l, **tone=destructive**). The menu itself is part of `AppBar` (`menuItems`). Wired through one shared screen-local module, `app/recap/[topicId]/ExitSession.tsx`, so the four screens can't drift.

**Where it appears:** the four **mid-session** screens — prompt (#4/#5/#5b), processing (#6), result (#7/#8/#11) and hint (#9). Deliberately **not** on the entry/recap screen (nothing has started; the back arrow already leaves) or the Summary (the session is already over; Continue is the way on). ⋯ stays inert on those two, as it was everywhere before.

**Five things were decided rather than read** — no frame covers any of this (settled with the user, 2026-09-15):

1. **The menu is real, with one item.** SPEC said "the ⋯ menu carries the exit", and the exit is the only item any doc has ever named. Built as an actual menu rather than wiring ⋯ straight to the sheet, so there is somewhere obvious for a second item to go.
2. **"End session" is Destructive, not Primary.** Abandoning a session is an abandon action, and design-system.md says those are Destructive and never paired with a Primary. `ButtonGroup` had no destructive option, so **`tone="destructive"` was added to it** — additive, nothing else used it, and the Figma set wants the variant adding at source. The sheet therefore carries no Primary at all, which that rule explicitly allows.
3. **"X terms left" counts the current term.** On term 2 of 3 it reads "2 terms left": leaving mid-term abandons the one being answered too, so counting it out would understate what the student walks away from. Singular is handled ("1 term left").
4. **The menu lives in `AppBar`, not on each screen.** Four screens carry it; four copies would drift, which is the same reasoning that made `AppBar` a component in the first place. A screen with no items gets the inert ⋯ it always had.
5. **Both the menu and the sheet are dismissible without choosing.** Escape or a tap outside closes the menu; Escape, the scrim, or "Keep going" closes the sheet. A confirm you can't back out of is a trap, and "never trap the student" applies to leaving as much as to answering.

**Flagged, not fixed:** `Button`'s Secondary fill is `background.surface`, which is also the sheet's fill — so "Keep going" reads as a label rather than a pill against it. This is **pre-existing and systemic**, not introduced here: the result screens' "Retry" sits on `ActionSheet` with the same two colours and looks the same. Fixing it means changing a shared component, which `CLAUDE.md` says to flag first — so it is flagged.

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

- **Judging is scripted per term** — each due term has a pre-set `outcome` in `app/due-terms.ts`; submitting always advances to that term's scripted result regardless of what was said. Fully deterministic. **Term 1 passes, term 2 is incorrect, term 3 is partial** (decided 2026-09-15), so one session walks all three result screens without replaying. Knowie's reply is written per term *per outcome* (`answer` / `miss` / `partial`), plus a `hint` line for #9.
- **Gesture is tap-to-start / tap-to-stop**, not press-and-hold. A third tap on the stopped state resumes the same take — **pause and resume within one take is in scope**, settled in the frames' favour and removed from the Not-building list.
- **Progress belongs to the term, not the screen.** Term 1 reads 25%, term 2 75%, term 3 100% (it skips 50 by design), and *every* screen for a given term — prompt, processing, result, hint — reads the same value. A result therefore never advances the bar: Continue does, by moving to the next term. Stepping back with the back arrow moves it back to that term's value, and it never resets between terms. One source: `progressForTerm` in `app/due-terms.ts`. The bar is **absent from the Summary**. Every voice frame draws 25 because every frame was drawn for term 1 — they don't contradict this, they just don't cover terms 2 and 3.
- **Back steps, ⋯ ends.** The back arrow walks back one screen with no confirmation. The ⋯ menu carries the exit → "End session now? X terms left" → confirming goes to **Home**, and the abandoned topic returns to the due list untouched.
- **Summary → Continue chains** into the next due topic's recap screen; after the last, into the due list's all-caught-up state (#2a). Both built and walked 2026-09-15.
- **The Summary reports the recommended grade, not the tapped one.** Nothing stores a grade, so the Summary reads each term's scripted outcome back through `GRADE_FOR_OUTCOME` — the same value its result screen opened on. Honest for a clickthrough, wrong the moment grading becomes real.
- **Mic permission is real**, requested with `getUserMedia` on the **prompt screen's** mic tap (and the hint screen's) — never on screen entry, and no longer on the entry screen at all, which has had no mic since frame 16031:7075. Nothing is recorded: a granted stream is stopped immediately, since real STT/judging stays out of scope. A denial disables that screen's mic and surfaces "Type instead".
- **Cancel is always free** — never counts as an attempt against the hint ladder.
- **Processing is a fixed 1.8s delay**, not variable.
- **Grading happens at every result, including misses**, and the last grade tapped for a term is what's recorded — a term can be graded on the first miss, re-graded after a hint, and re-graded again on an eventual pass; only the final tap sticks. This is a deliberate departure from the brief's own spec (grade once, at the end, after the hint ladder finishes) — flagged, not silently followed.
- **Skip is ungraded** — the term stays due at its existing interval, unchanged.
- **The miss recovery is a loop, not a ladder.** Incorrect (or Partial) → Hint → **navigates to #9**, where the student re-records or taps "Repeat question" to return to that term's original prompt screen. Repeatable indefinitely; Continue at any result moves on. **No second hint, no Reveal.** (An earlier version of this line said Hint removed the Retry/Continue container in place — it doesn't; the student leaves the screen. Corrected 2026-09-15.)
- **Retry is not part of that loop** — it sits on all three result screens for a student who wants to say the answer again before the next review interval. Requesting a hint doesn't remove it; the student simply leaves the result screen for #9, and Retry is there again if they come back.
- **Text fallback, once chosen, is sticky for the rest of the session**, and swaps in place on the same screen rather than opening one of its own. Built 2026-09-15: the mode lives in `sessionStorage` (`app/recap/[topicId]/textMode.ts`), persists across terms, and is reversible via "Use voice instead". The typed answer is kept per term and echoed on that term's result screen.
- **Session state doesn't persist** — backgrounding mid-recording/processing resumes at Idle for that term; exiting early is a fresh start next time, not a true resume, even though `docs/design-brief.md`'s kickoff spec says "leaving, progress saves, returning resumes."
- **XP is summary-only**, not a live counter during the loop — and still not present on the built Summary, since the frame draws no XP element and nothing defines how it's earned.
- **The summary's language is meant to react** to the unaided/hinted/revealed ratio (the brief's "was it earned?" problem) — not yet implemented copy, just a decision.
- **This is presentation-only** — mocked data doesn't need to be shaped like a real STT/judge API response; nothing here is meant to be a handoff contract for engineering.

## Open — undecided, not picked for you

*Settled 2026-09-15 — the miss loop, Retry's role, pause/resume, grading, progress values, exit behaviour, the post-Summary destination, text fallback's shape, the two-Primary conflict, the entry point, the topic picker, and the duplicate topics. See `docs/sprint-context.md`'s "Flow decisions" block. Also settled since: the scripted per-term outcomes (pass/incorrect/partial), what the progress bar does on a result, what Hint does on #8, Partial's composition and pre-selected grade, and the "Repeat Question" casing. What's left:*

- Whether Badge variants other than `recall` (`streak`, `fire`, `pro`) are meant to be tap targets too, or `recall` alone.
- What the XP mechanic actually is (the brief's own open question 2) — decided to be summary-only, but no element exists on the frame and nothing defines how it's earned.
- ~~What the Summary's reactive language actually says at each unaided/hinted ratio.~~ **Written** as three bands in `summaryReview` (`app/due-terms.ts`). What's still open is whether three bands is the right granularity, and whether it should name the weakest term rather than only count.
- **The topic title's casing disagrees across frames.** The Summary frame sets it sentence case ("Renaissance philosophy"); the due list frame sets it title case ("Renaissance Philosophy"), which is what `app/due-terms.ts` holds and what all three screens render. `CLAUDE.md`'s sentence-case rule agrees with the Summary frame, so the due list's frame is the outlier — but casing the same topic two ways inside one session is worse than either choice, so it is rendered from the shared data everywhere and left for one decision at source.
- **"Change review time" has no destination.** A real tap target on the Summary with no reschedule screen behind it, and none in scope — the same shape of gap as the due list's "Choose your own topics".
- **`ChatBubble` is 6px narrower than the frames.** All the voice frames run the bubble to x=366, the 24px page gutter; the shared component caps at `max-width: 256px`, so it stops at 360 and sits ~4px left of the frame's edge. Fixing it means editing a Storybook component that the entry screen uses too, which `CLAUDE.md` says to flag before doing — so it's flagged, not done.
- **The frames disagree with each other about the trigger zone, five ways.** #4 and #5b pin it at 259px (mic top y=585); #5 uses 263px (y=581); #6 uses 262px; #9 uses 232px and insets the zone by the body's 24px padding. Matching each exactly would make the mic hop between screens, so the build uses **259 everywhere** — mic at y=585, 147px above the frame's bottom edge, verified identical on every voice screen. Worth fixing at source.
- ~~**Flow-screen `appBar` is inlined.**~~ **Done.** Built as `AppBar` (`stories/components/AppBar`) after a fourth screen copied it; `BackButton.tsx` and the screen-local `icons.tsx` were absorbed into it. The result screens' footer was promoted the same way, as `ActionSheet`; both are now named in `docs/design-system.md`.
- ~~**The ⋯ menu does nothing on any screen.**~~ **Done.** Built 2026-09-15 as `AppBar`'s `menuItems`, carrying the session exit (#15/#16) on the four mid-session screens. "Back steps, ⋯ ends" is now true in the build. ⋯ remains deliberately inert on the entry and Summary screens, where there is nothing to put in it.
- **Secondary buttons disappear on a sheet.** `Button`'s Secondary fill is `background.surface`, the same colour as both `ActionSheet` and `BottomSheet`, so "Retry" on a result screen and "Keep going" on the exit confirm read as bare labels rather than pills. Pre-existing and systemic; fixing it means editing the shared `Button` (or giving the sheets a different surface), which `CLAUDE.md` says to flag before doing.
- **No destructive *text* token exists.** The ⋯ menu's destructive item is tinted with `interactive.destructive`, which is defined as a *fill*; the two text-ish alternatives rule themselves out in their own descriptions (`feedback.error.bold` says "not destructive buttons", `text.error` says "not destructive button labels"). Worth adding at source.
- **Hint's Figma layer is still primary/s, and #9's button is still "Repeat Question".** Both are built against the rules instead (secondary, and sentence case); the frames want fixing at source.
- **Nothing consumes a grade.** The `Radio` selection is local to each result screen and resets on navigation — there is no session state, so a term re-graded after a hint doesn't "remember" the earlier tap. "Last tap wins" is true within one visit to one screen only. Fine for a clickthrough, wrong if this ever becomes real.

## Verification — how to check this is done and correct, end to end

1. **State coverage.** Every row in `docs/voice-ux.md`'s states table maps to either a built screen above, a listed gap, or an explicit out-of-scope/if-time entry. None should be unaccounted for.
2. **Happy path click-through.** Home → tap `recall` Badge → Due list → tap a Card → Entry/recap → tap mic (grants permission) → prompt idle (#4) → tap mic → Recording (#5) → tap mic → stopped, Submit shown (#5b) → Submit → Processing (#6) → Result (#7/#8/#11 by scripted outcome) → pick a grade → Continue → repeats for each due term → Summary (#10) → Continue → the next topic's recap, and after the last topic the due list's all-caught-up state (#2a). **Walkable end to end**, verified 2026-09-15: result/2 → summary → /recap/the-reformation, and the-reformation's summary → /due-list?caughtUp=1 with the recall badge cleared.
3. **Miss loop click-through.** Term 2 → Result: Incorrect (#8) → Hint → Hint nudge (#9) → either the mic (re-records, opening #4 already Listening) or "Repeat question" (back to #4 idle) → round again as many times as wanted, or Continue at the result to move on. Walkable end to end; term 3 reaches Partial (#11) the same way.
4. **Failure paths, each walked explicitly:** permission denied at the prompt screen's mic tap (the entry screen no longer asks), Cancel during Recording, Skip at #4 or #5b, Incorrect → Hint → re-attempt (there is no second hint and no Reveal — see #13), Partial, "Type instead" fallback, exit mid-session via the confirm dialog. **"Type instead" is built and walked** (2026-09-15: prompt → type → Submit → Processing → result with the answer echoed → Continue → next term still in text mode → hint screen in text mode → "Use voice instead" back to the mic). **The exit confirm is built and walked too** (⋯ → End session → sheet reading the right count on each screen → "Keep going" returns, "End session" goes to Home; ⋯ inert on entry and Summary). Every failure path in this list is now walkable.
5. **No invented components or props.** Every instance used should match a real story in Storybook — check with `docs-show` per component (`mcp__storybook__docs-list` / `docs-show`) rather than trusting memory of what a component "should" have.
6. **No invented token values.** Every color/size/type value traces to a path in `tokens/tokens.json`; no `var(--x, #fallback)`, nothing hand-set that has a token.
7. **Design-system hard rules spot-check:** one Primary button max per screen, Destructive never paired with Primary on the same screen, sentence case on every label.
8. **Storybook test-run** across the touched components (`ChatBubble`, `Badge`, `VoiceInput`, `Radio`, `ResultCard`, `ResultTable`) — component tests and accessibility checks both need to pass, not just the visual review.
9. **Not-building list check.** Confirm nothing from `docs/sprint-context.md`'s "Not building" section has crept back in (multi-turn branching, a standalone primer screen, MCQ↔voice switching, etc.). One item is knowingly contested rather than clean: the pause/resume copy on #5 and #5b, built to match the frames. That is a decision waiting on a person, not a check that can pass or fail.
10. **Component provenance.** Spot-check that every button-shaped instance actually resolves to the real `button` component set, not a detached duplicate. In code this is settled — #5b's Submit is a real `Button` (primary/s) — but the *Figma* layer is still the orphaned `button/Default/s/default`, as is the Home screen's "Refer".
11. **Measure, don't look.** Every screen's positions are verified with `node scripts/verify-screen.mjs <route> --figma <png>` against an exported frame, on `localhost:3000`. Three bugs on #4/#5/#5b were invisible by eye and only fell out of measurement: the trigger zone sitting 27px low, the action pill 24px high, and `VoiceInput`'s Listening mark rendering at 68px instead of 112px (a 182×184 SVG being flex-shrunk — fixed in the component, which is shared, so it changes that Storybook story too).
