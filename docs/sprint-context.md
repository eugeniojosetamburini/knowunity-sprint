# Sprint Context

Voice-based active recall for Knowunity. Student speaks a term out loud, Knowie replies in text. Mocked recall engine, mobile iOS prototype at 390px, dark mode.

**Committed concept:** A single-turn, voice-in/text-out recall loop entered from a due list of spaced-repetition terms, judged correct or incorrect, with a hint available on incorrect answers.

**Where the recall step lives:** Due list is the hero entry point and primary discovery trigger. It takes students to a list of concepts due for reviewing. Selecting one progresses to the voice chat with text fallback.

## Decisions logged

- Discovery does not anchor to the exam-plan roadmap row, because only 16.6% of daily users touch an exam plan at all. A post-quiz/revision completion prompt was the logged anchor for a while; it was never designed and is **not being built** — see below.
- **The prototype's entry is Home → recall badge → due list.** The badge is the demo's way in and is fully built, not annotated. The due list remains the hero *destination* — the screen that carries the spaced-repetition idea and where topics are chosen — but it isn't the first thing a student sees in this walkthrough.
- First-run explanation folds into the entry screen, no standalone primer screen, because a dedicated screen adds a tap before an already anxious moment.
- Returning users skip the explanation and land straight on the recap-style entry, because repeating it every session adds friction the brief wants gone.
- Mic permission fires on tap-to-record, not on screen entry, because priming before a tied action risks a denial that's expensive to recover from.
- Permission denied routes to text-first mode with a way to re-enable, so no student is trapped by a "no."
- Recall loop is single-turn per term (idle, recording, processing, result), not multi-turn back-and-forth, because the brief rules out branching into a conversation.
- Partial/miss recovery gets full design fidelity, not edge-case treatment, because "judge generously" is a hard constraint.
- Due list drops the roadmap's timeline connector and gives every card equal weight, because that connector means sequence there, and review terms aren't sequential.
- Summary uses a three-state segmented bar (correct, partial, incorrect) with a plain-language readout, not a simple pass count, because the claim has to be earned, not asserted.
- Typography uses Greed Standard-TRIAL directly, not Inter, because it's a real local font with no licensing block on this machine.

### Flow decisions, 2026-09-15

Settled by walking every contradiction and gap in these docs one at a time. These override anything above them that disagrees.

- **The miss loop is a loop, not a ladder to a reveal.** Incorrect (or Partial) → the result screen offers Hint alongside the grade rows → **tapping Hint navigates to the Hint nudge screen** (#9) → from there the student re-records, or taps "Repeat question" to return to that term's original prompt screen. There is **no Reveal screen and no second hint**. *(Corrected later the same day: this line first said Hint swapped the Retry/Continue container out in place. It doesn't — the student leaves the screen, which is what both the frames and SPEC.md's #8 describe.)*
- **Pause and resume within one take is in scope**, and the recording frames' copy stands as drawn. Removed from Not building.
- **Grading is offered at every result and the last tap wins**, including after a hint and after an eventual pass. A deliberate departure from the brief's "grade once at the end"; the brief is annotated to match.
- **Retry appears on Pass, Partial and Incorrect** — it is for a student who wants to say the answer again before the next review interval, not part of the hint loop. Requesting a hint doesn't remove it: the student leaves the result screen for #9, and Retry is there again if they come back.
- **Back steps, ⋯ ends.** The back arrow walks back one screen with no confirmation. The ⋯ menu carries the exit, which opens the "End session now? X terms left" confirm. Confirming exits all the way to Home, and the abandoned topic reappears in the due list untouched, as if never started.
- **Progress belongs to the term, not the screen.** Term 1 reads 25%, term 2 75%, term 3 100%, and every screen for a given term — prompt, processing, result, hint — reads the same value. A result therefore never advances the bar; Continue does, by moving to the next term. Going back moves it back; it never resets between terms. The bar is absent from the Summary. *(The frames all draw 25% because they were all drawn for term 1 — they don't contradict this, they just don't cover terms 2 and 3.)*
- **Summary → Continue chains into the next due topic's recap screen.** After the last one, it lands on the due list in an all-caught-up state.
- **Text fallback swaps in place**: "Type instead" replaces the mic and its callout with a text field and Submit on the same screen, leaving eyebrow, mascot, bubble and Skip intact. Sticky for the rest of the session, and the destination a denied student is routed to.
- **Hint is a Secondary button**, so Continue keeps the single Primary slot the design system reserves for the bottom CTA.
- **The flow has motion (2026-09-21).** Every state in it was a still picture, including the two that exist because something is happening. `voiceInput`'s Listening and Disabled states now breathe on one shared loop, and every tappable component takes a press scale, since there is no hover on mobile. `semantic.motion` was added to carry it — the primitives had been there since the token import with nothing bound to them. All of it is off under `prefers-reduced-motion: reduce`, where fill and mark still tell every state apart.
- **The recorded take has its own mic state (2026-09-21).** The stopped frame draws `voiceInput` as `Idle`, so a student who had just recorded saw the same circle as one who had not — the pixels differed only by a Submit pill and a line of caption. Built as a `Paused` state: Listening's fill, no glow, a pause mark. A departure from the frame, which wants the state adding at source.
- **Knowie's bubble sits at one place on every screen (2026-09-21).** The frames disagree — the prompt and processing frames draw the mascot/bubble gap at 10px, the recap, result and hint frames at 16px — so the bubble slid 6px sideways on every prompt → result step. One value throughout (16px, `space-400`), which is both the majority of the frames and the only one of the two that is a token. Same reasoning as the 259px trigger zone below.
- **A hinted second attempt resolves one step kinder (2026-09-21).** Judging is still scripted and ignores what was said; the one new input is whether the student took the term's hint. Incorrect → Partial, Partial → Pass on the answer after the hint, using that term's existing copy for the new outcome, with no Hint button on it (no second hint). So the miss loop ends on a result that moved instead of the same verdict forever. Ready clears a topic's grades, typed answers and hint state.
- **A miss does not state the answer (2026-09-21).** The hint comes after the miss line and there is no reveal, so the line says the answer was off and points at the hint.
- **A refused mic switches to the text field and says why (2026-09-21)**, in place of the disabled mic. This is what "permission denied routes to text-first mode" above meant.
- **The two due-list cards get different topics.** The frame repeats one card twice; the content is deliberately varied so a chained session doesn't ask the same three questions twice.
- **The "+" on the recap screen and "Choose your own topics" on the due list stay inert**, recorded as known dead ends. No topic picker is being built.
- **The scripted outcomes are term 1 pass, term 2 incorrect, term 3 partial**, so one session walks all three result screens without replaying. Judging stays fully deterministic and ignores what was actually said.
- **Knowie's replies are written per term and per outcome**, not taken from the frames. Every result and hint frame carries placeholder copy ("Humanism means this and that, maybe a little more detail here."); real copy was written for all six terms across pass, miss, partial and hint, each kept to the frames' line count so the bubbles stay the height they're drawn at. Same call already made for the due list's second card.
- **Result: Partial has no frame and mirrors Incorrect.** Three things were decided rather than read: the mascot is standby, the pre-selected grade is **Medium** (between Pass's Easy and Incorrect's Difficult), and Hint appears on it exactly as on Incorrect.
- **Sentence case beats the frame when the two collide.** The Hint nudge frame labels its button "Repeat Question"; it is built "Repeat question". The design-system rule is about the system as a whole, a single frame isn't, and that frame's title case is the only instance in the prototype. The frame wants fixing at source.
- **The trigger zone is 259px on every voice screen.** The frames give it five different heights (259 / 262 / 263 / 232); matching each exactly would make the mic hop between screens, so one value is used throughout and the mic sits at the same place on all of them.

## Not building

- Multi-turn tutoring or open conversation branches
- A standalone first-run primer screen
- Auto-endpointing (the app guessing when someone's done talking)
- Real speech-to-text or real judging, both mocked
- Full-fidelity designs for the chat entry point, annotated only (the recall badge *is* built — it's the prototype's entry)
- Language switching mid-answer
- Mic-busy handling (student on a call, etc.)
- A post-quiz/revision completion prompt screen
- A topic-picker screen behind the "+" and "Choose your own topics"
- A Reveal screen, or a second hint (the miss loop replaces both)
- Switching between voice and multiple-choice mode mid-round (the Figma
  "Practice round voice flow" exploration is not the committed concept)
