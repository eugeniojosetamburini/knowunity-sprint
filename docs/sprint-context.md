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

- **The miss loop is a loop, not a ladder to a reveal.** Incorrect → the result screen offers Hint alongside the grade rows → tapping Hint swaps the Retry/Continue container out, because the hint screen carries its own retry logic → from there the student re-records, or taps "Repeat question" to return to that term's original prompt screen. There is **no Reveal screen and no second hint**.
- **Pause and resume within one take is in scope**, and the recording frames' copy stands as drawn. Removed from Not building.
- **Grading is offered at every result and the last tap wins**, including after a hint and after an eventual pass. A deliberate departure from the brief's "grade once at the end"; the brief is annotated to match.
- **Retry appears on Pass, Partial and Incorrect** — it is for a student who wants to say the answer again before the next review interval, not part of the hint ladder. It disappears with the rest of its container once a hint is requested.
- **Back steps, ⋯ ends.** The back arrow walks back one screen with no confirmation. The ⋯ menu carries the exit, which opens the "End session now? X terms left" confirm. Confirming exits all the way to Home, and the abandoned topic reappears in the due list untouched, as if never started.
- **Progress reads 25% on term 1, 75% on term 2, 100% on term 3**, and the bar is absent from the Summary.
- **Summary → Continue chains into the next due topic's recap screen.** After the last one, it lands on the due list in an all-caught-up state.
- **Text fallback swaps in place**: "Type instead" replaces the mic and its callout with a text field and Submit on the same screen, leaving eyebrow, mascot, bubble and Skip intact. Sticky for the rest of the session, and the destination a denied student is routed to.
- **Hint is a Secondary button**, so Continue keeps the single Primary slot the design system reserves for the bottom CTA.
- **The two due-list cards get different topics.** The frame repeats one card twice; the content is deliberately varied so a chained session doesn't ask the same three questions twice.
- **The "+" on the recap screen and "Choose your own topics" on the due list stay inert**, recorded as known dead ends. No topic picker is being built.

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
