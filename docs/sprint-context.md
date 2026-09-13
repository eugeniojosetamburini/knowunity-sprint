# Sprint Context

Voice-based active recall for Knowunity. Student speaks a term out loud, Knowie replies in text. Mocked recall engine, mobile iOS prototype at 390px, dark mode.

**Committed concept:** A single-turn, voice-in/text-out recall loop entered from a due list of spaced-repetition terms, judged correct or incorrect, with a hint available on incorrect answers.

**Where the recall step lives:** Due list is the hero entry point and primary discovery trigger. It takes students to a list of concepts due for reviewing. Selecting one progresses to the voice chat with text fallback.

## Decisions logged

- Discovery anchors to a post-quiz/revision completion prompt, not the exam-plan roadmap row, because only 16.6% of daily users touch an exam plan at all.
- Due list is the hero entry, badge and chat are footnotes, because it's the one entry that carries the spaced-repetition idea.
- First-run explanation folds into the entry screen, no standalone primer screen, because a dedicated screen adds a tap before an already anxious moment.
- Returning users skip the explanation and land straight on the recap-style entry, because repeating it every session adds friction the brief wants gone.
- Mic permission fires on tap-to-record, not on screen entry, because priming before a tied action risks a denial that's expensive to recover from.
- Permission denied routes to text-first mode with a way to re-enable, so no student is trapped by a "no."
- Recall loop is single-turn per term (idle, recording, processing, result), not multi-turn back-and-forth, because the brief rules out branching into a conversation.
- Partial/miss recovery gets full design fidelity, not edge-case treatment, because "judge generously" is a hard constraint.
- Due list drops the roadmap's timeline connector and gives every card equal weight, because that connector means sequence there, and review terms aren't sequential.
- Summary uses a three-state segmented bar (correct, partial, incorrect) with a plain-language readout, not a simple pass count, because the claim has to be earned, not asserted.
- Typography uses Greed Standard-TRIAL directly, not Inter, because it's a real local font with no licensing block on this machine.

## Not building

- Multi-turn tutoring or open conversation branches
- A standalone first-run primer screen
- Auto-endpointing (the app guessing when someone's done talking)
- Real speech-to-text or real judging, both mocked
- Full-fidelity designs for the badge and chat entry points, annotated only
- Language switching mid-answer
- Pause and resume within one take
- Mic-busy handling (student on a call, etc.)
