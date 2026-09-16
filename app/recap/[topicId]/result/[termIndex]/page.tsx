"use client";

import { useState } from "react";
import { notFound, useParams, useRouter } from "next/navigation";

import { Scaffold } from "@/stories/components/Scaffold/Scaffold";
import { AppBar } from "@/stories/components/AppBar/AppBar";
import { ActionSheet } from "@/stories/components/ActionSheet/ActionSheet";
import { ChatBubble, type ChatBubbleState } from "@/stories/components/ChatBubble/ChatBubble";
import { Mascot, type MascotState } from "@/stories/components/Mascot/Mascot";
import { Button } from "@/stories/components/Button/Button";
import { Radio } from "@/stories/components/Radio/Radio";
import {
  GRADE_FOR_OUTCOME,
  INTERVAL_FOR_GRADE,
  getTopic,
  progressForTerm,
  type Grade,
  type TermOutcome,
} from "../../../../due-terms";
import { useTypedAnswer } from "../../textMode";
import { ExitSessionSheet, useExitSession } from "../../ExitSession";
import styles from "./page.module.css";

// The result screen, in its three outcomes — one route, the term's scripted
// judgement deciding which it shows:
//   pass      15783:7408  ChatBubble correct,   Mascot excited,  Easy preselected
//   incorrect 15783:7640  ChatBubble incorrect, Mascot confused, Difficult preselected
//   partial   no frame    ChatBubble partial,   Mascot standby,  Medium preselected
// Everything else — bar, eyebrow, the grade set, the Retry/Continue sheet —
// is identical across all three, which is what the frames draw.
//
// Notes:
// - **Partial has no Figma frame.** SPEC.md #11 says its composition mirrors
//   Incorrect exactly, so it is built from that description rather than
//   traced. Three things had to be decided rather than read: the mascot
//   (standby, per SPEC.md #11), the pre-selected grade (Medium, sitting
//   between Pass's Easy and Incorrect's Difficult — decided 2026-09-15),
//   and whether Hint appears (it does, because SPEC.md gives Partial the
//   same hint route as Incorrect).
// - **Hint is Secondary, not the frame's Primary.** Figma draws it
//   primary/s next to Continue primary/l — two Primaries on one screen,
//   which CLAUDE.md forbids. Continue keeps the Primary bottom-CTA slot.
//   Logged in SPEC.md and sprint-context.md; wants fixing at source.
// - Hint only appears on incorrect and partial. On a pass there is nothing
//   to hint at, and the frame has no Hint button.
// - Grading is offered on every outcome, misses included, and the last tap
//   wins (SPEC.md). Selection is local; nothing downstream consumes it,
//   since the spaced-repetition engine is mocked.
// - Retry re-records the same term, so it returns to that term's prompt
//   screen at idle. It is *not* part of the hint loop.
// - Continue advances to the next term's prompt. On the last term it goes
//   to the Summary (#10), which is now routed.
// - The bubble copy is real per-term text for every outcome, not the
//   frames' placeholder sentences. Decided 2026-09-15; see app/due-terms.ts.
// - The progress bar reads this term's value and does not advance here —
//   Continue advances it by changing term (see progressForTerm).
// - **If the term was answered by typing (#14), the student's own words are
//   echoed above Knowie's reply** (decided 2026-09-15 with the user).
//   docs/voice-ux.md calls showing the answer back a transparency pattern;
//   in text mode it costs nothing, because the words are real rather than
//   mocked STT. **This is a deliberate departure from the measured frames**,
//   which have no slot for it — it appears only on a typed term, so a spoken
//   walkthrough looks exactly as it did. There is no component for a
//   student's own utterance (ChatBubble is Knowie's dialogue only, per
//   design-system.md), so the block is built inline here and logged in
//   component-gaps.md.

// Interval copy is the frames', verbatim. It lives in app/due-terms.ts
// because the Summary (#10) shows the same three strings on its own due
// pills, and the two screens must not drift.
const GRADES: { grade: Grade; title: string; subtitle: string }[] = [
  { grade: "easy", title: "Easy", subtitle: INTERVAL_FOR_GRADE.easy },
  { grade: "medium", title: "Medium", subtitle: INTERVAL_FOR_GRADE.medium },
  { grade: "difficult", title: "Difficult", subtitle: INTERVAL_FOR_GRADE.difficult },
];

const BUBBLE_STATE: Record<TermOutcome, ChatBubbleState> = {
  pass: "correct",
  incorrect: "incorrect",
  partial: "partial",
};

const MASCOT_STATE: Record<TermOutcome, MascotState> = {
  pass: "excited",
  incorrect: "confused",
  partial: "standby",
};

// The grade each outcome opens on — voice-ux.md's states table asks for a
// recommended grade rather than an empty set. Pass and Incorrect are their
// frames'; Partial's is decided (see the note above). Shared with the
// Summary, which reads these same recommendations because nothing stores
// what the student actually tapped.
const PRESELECTED = GRADE_FOR_OUTCOME;

export default function Result() {
  const { topicId, termIndex } = useParams<{ topicId: string; termIndex: string }>();
  const router = useRouter();

  const topic = getTopic(topicId);
  const index = Number(termIndex);
  const term = topic?.terms[index];

  const [grade, setGrade] = useState<Grade | null>(null);
  const typedAnswer = useTypedAnswer(topicId, index);

  // ⋯ → End session → confirm → Home (SPEC.md #15/#16). Terms left
  // counts the current term too, since leaving abandons it as well.
  const exit = useExitSession((topic?.terms.length ?? 0) - index);

  if (!topic || !term || !Number.isInteger(index)) {
    notFound();
  }

  const outcome = term.outcome;
  const selected = grade ?? PRESELECTED[outcome];
  const isLastTerm = index === topic.terms.length - 1;
  const showHint = outcome !== "pass";

  const reply = outcome === "pass" ? term.answer : outcome === "incorrect" ? term.miss : term.partial;

  return (
    <Scaffold
      topBar={
        <AppBar menuItems={exit.menuItems}
          backHref={`/recap/${topicId}/prompt/${index}`}
          backLabel="Back to the question"
          progress={progressForTerm(index)}
        />
      }
      bottomNavFlush
      bottomNav={
        <ActionSheet>
          <Button
            variant="secondary"
            size="l"
            onClick={() => router.push(`/recap/${topicId}/prompt/${index}`)}
          >
            Retry
          </Button>
          {/* On the last term this closes the session at the Summary (#10);
              on any other, it advances to the next term's prompt. */}
          <Button
            variant="primary"
            size="l"
            onClick={() =>
              router.push(
                isLastTerm
                  ? `/recap/${topicId}/summary`
                  : `/recap/${topicId}/prompt/${index + 1}`,
              )
            }
          >
            Continue
          </Button>
        </ActionSheet>
      }
    >
      <div className={styles.body}>
        <div className={styles.intro}>
          <p className={styles.eyebrow}>
            Term {index + 1} of {topic.terms.length} · {term.name}
          </p>

          {typedAnswer && (
            <div className={styles.typedAnswer}>
              <p className={styles.typedAnswerLabel}>You typed</p>
              <p className={styles.typedAnswerText}>{typedAnswer}</p>
            </div>
          )}

          <div className={styles.replyGroup}>
            <div className={styles.mascotChatRow}>
              <Mascot state={MASCOT_STATE[outcome]} />
              <ChatBubble
                state={BUBBLE_STATE[outcome]}
                correctText={reply}
                incorrectText={reply}
                partialText={reply}
              />
            </div>

            {showHint && (
              <Button
                variant="secondary"
                size="s"
                onClick={() => router.push(`/recap/${topicId}/hint/${index}`)}
              >
                Hint
              </Button>
            )}
          </div>
        </div>

        <div className={styles.grading}>
          {/* The frames break this line after "to" rather than letting it
              wrap — at 342px there is room for "recall that" on line 1, so
              the break is deliberate, and matching it is part of matching
              the text node. Safe to hardcode on a 390px-only screen. */}
          <h1 className={styles.gradeHeadline}>
            Rate how easy it was to <br />
            recall that answer
          </h1>

          <div className={styles.gradeList} role="radiogroup" aria-label="Rate how easy it was to recall that answer">
            {GRADES.map(({ grade: value, title, subtitle }) => (
              <Radio
                key={value}
                state={selected === value ? value : "default"}
                title={title}
                subtitle={subtitle}
                onClick={() => setGrade(value)}
              />
            ))}
          </div>
        </div>
      </div>

      <ExitSessionSheet {...exit.sheetProps} />
    </Scaffold>
  );
}
