"use client";

import { notFound, useParams, useRouter } from "next/navigation";

import { Scaffold } from "@/stories/components/Scaffold/Scaffold";
import { AppBar } from "@/stories/components/AppBar/AppBar";
import { Mascot } from "@/stories/components/Mascot/Mascot";
import { ResultCard } from "@/stories/components/ResultCard/ResultCard";
import { ResultTable, type ResultTableRow } from "@/stories/components/ResultTable/ResultTable";
import { Button } from "@/stories/components/Button/Button";
import { TextLink } from "@/stories/components/TextLink/TextLink";
import {
  GRADE_FOR_OUTCOME,
  INTERVAL_FOR_GRADE,
  getTopic,
  nextTopic,
  outcomeAfterHint,
  summaryReview,
  summarySubtitle,
  tallyTopic,
} from "../../../due-terms";
import { useGrades, useHints } from "../sessionState";
import styles from "./page.module.css";

// Summary (SPEC.md #10, Figma `knowledge-check-results`, node 15731:3960) —
// the end of a topic's recall session: how it went, every term and when it
// comes round again, and Continue into the next due topic.
//
// Composition is the frame's, top to bottom: AppBar (back / "Summary" / ⋯,
// no progress bar — the Summary is the one flow screen without one), the
// excited mascot peeking out from behind the card, the topic title and a
// subtitle, `ResultCard`, `ResultTable`, an underlined "Change review time"
// link, and a single primary Continue in Scaffold's bottom slot.
//
// Four things depart from the frame, all decided with the user 2026-09-15
// rather than resolved quietly:
//
// 1. **Three terms, not four.** The frame draws a four-row table
//    (Humanism / Anthropocentrism / Link to antiquity / Medieval
//    theocentrism) and a card reading 50% · "2 right / 1 partial / 1
//    incorrect". The built session is three terms, and five screens are
//    already measured against frames whose own copy says "TERM 1 OF 3".
//    So the layout is the frame's and the *content is derived from the
//    session the student actually just did* — the same call already made
//    for the due list's second card. Row count, counts and percentage all
//    come from app/due-terms.ts.
// 2. **Real copy, not the frame's placeholders.** "Subtitle here about
//    something.", "Something here" and "A quick three line review of how
//    the student did this time around." are filler. Replaced with written
//    copy, the same precedent as the frames' placeholder Knowie lines
//    (see app/due-terms.ts). The review paragraph is where SPEC.md's
//    decided-but-never-written "reactive language" finally lands.
// 3. **No "Try again", no XP.** SPEC.md #10 lists both as gaps between the
//    brief and this frame. The frame draws neither, XP has no defined
//    mechanic, component or token anywhere, and both stay logged as open.
// 4. **The grades shown are the ones the student tapped**, read from the
//    session store (../textMode). Until 2026-09-21 nothing stored the tap,
//    so this table printed each outcome's *recommended* grade and the
//    review interval beside it was one the student had never chosen. A term
//    they never graded still falls back to GRADE_FOR_OUTCOME, which is what
//    that screen had pre-selected for them anyway.
//
// Continue chains into the next due topic's recap screen, and after the
// last topic into the due list's all-caught-up state (#2a, built alongside
// this screen — `/due-list?caughtUp=1`).

export default function Summary() {
  const { topicId } = useParams<{ topicId: string }>();
  const router = useRouter();

  const topic = getTopic(topicId);

  // Read before the notFound() below, which throws: a hook called after it
  // would be a conditional hook. Keyed on the route's own topicId rather
  // than topic.id for the same reason — it exists whether the topic does
  // or not. Same ordering the result screen uses.
  const grades = useGrades(topicId);
  const hints = useHints(topicId);

  if (!topic) {
    notFound();
  }

  const tally = tallyTopic(topic);
  const next = nextTopic(topic.id);

  const rows: ResultTableRow[] = topic.terms.map((term, index) => {
    // The student's own tap, falling back to what the result screen
    // pre-selected if they never changed it.
    const outcome = hints[index] === "retried" ? outcomeAfterHint(term.outcome) : term.outcome;
    const grade = grades[index] ?? GRADE_FOR_OUTCOME[outcome];
    return { term: term.name, difficulty: grade, dueText: INTERVAL_FOR_GRADE[grade] };
  });

  return (
    <Scaffold
      topBar={
        <AppBar
          backHref={`/recap/${topic.id}/result/${topic.terms.length - 1}`}
          backLabel="Back to the last result"
          title="Summary"
        />
      }
      bottomNav={
        <Button
          variant="primary"
          size="l"
          onClick={() =>
            router.push(next ? `/recap/${next.id}` : "/due-list?caughtUp=1")
          }
        >
          Continue
        </Button>
      }
    >
      <div className={styles.content}>
        {/* Decorative, and drawn *behind* the card in the frame — the card
            clips its lower half, which is what gives it the peeking look.
            `peeking` is public/images/mascot-peeking.png, uploaded for this
            slot; this used to render `excited` instead, which is the
            component's art for a different moment (changed 2026-09-21). */}
        <Mascot state="peeking" className={styles.mascot} />

        <div className={styles.titleBlock}>
          <h1 className={styles.title}>{topic.title}</h1>
          <p className={styles.subtitle}>{summarySubtitle(tally)}</p>
        </div>

        <ResultCard
          className={styles.resultCard}
          percentage={`${tally.percent}%`}
          subtitle="explained unaided"
          correctCount={tally.correct}
          partialCount={tally.partial}
          incorrectCount={tally.incorrect}
          summary={summaryReview(tally)}
        />

        <ResultTable rows={rows} />

        {/* A real tap target with nowhere to go — no reschedule screen
            exists and none is in scope, the same shape of gap as the due
            list's "Choose your own topics". Logged in component-gaps.md. */}
        <TextLink className={styles.drillDownLink}>Change review time</TextLink>
      </div>
    </Scaffold>
  );
}
