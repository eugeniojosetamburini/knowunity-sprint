// Mocked due-term data shared by Home, Due list, and the voice-review flow
// (Entry/recap, Idle/prompt). The content mirrors the Figma frames exactly,
// not an invented dataset:
//   - Due list (node 15734:4996): two cards, "3 topics", "2-3 minutes", with
//     two different illustrations (public/images/card-image.png and
//     card-image-variation.png, in that order). The frame repeats one
//     instance twice, both reading "Renaissance Philosophy"; the instance
//     count is matched but the **second card's content deliberately differs**
//     (decided 2026-09-15, see docs/sprint-context.md). Summary → Continue
//     chains into the next due topic, so identical cards would ask a student
//     the same three questions twice in a row.
//   - Entry/recap (node 15783:6710): chips Humanism / Anthropocentrism /
//     Theocentrism (the Idle screen 15783:6833 counts them as "TERM 1 OF 3").
//   - Idle/prompt (node 15783:7103): "TERM 1 OF 3 · HUMANISM" with the
//     question "Let's start with the basics. In your own words - what is
//     humanism in the renaissance?" — the only term this screen has a Figma
//     frame for. Anthropocentrism's and Theocentrism's prompts below are
//     an invented match to that frame's tone (no frame exists for them);
//     flagged in the screen's own build notes, not just here.
//   - Home + Due list top bar: the recall badge reads "5+" — two topics ×
//     three terms = 6 due, capped at 5+.
// If a Figma frame and this file ever disagree, this file is what changes.

import type { ProgressIndicatorProgress } from "@/stories/components/ProgressIndicator/ProgressIndicator";

export type TermOutcome = "pass" | "incorrect" | "partial";

export type DueTerm = {
  name: string;
  prompt: string;
  /**
   * The scripted judgement for this term (SPEC.md, "judging is scripted per
   * term"): stopping the recording always reaches this outcome, whatever
   * was said. Term 1 passes, term 2 misses, term 3 is partial, so one
   * session walks all three result screens — decided 2026-09-15.
   */
  outcome: TermOutcome;
  /**
   * Knowie's reply on each result screen, one per outcome. The frames carry
   * placeholder copy ("Humanism means this and that, maybe a little more
   * detail here." on Pass, "Not quite, humanism means this and that..." on
   * Incorrect), so unlike `prompt`, term 1's text here is *not* the frames'
   * verbatim wording: real copy was written for every term and every
   * outcome instead, decided 2026-09-15, because the frames' filler would
   * otherwise sit next to genuine answers in the same session. A deliberate
   * content departure, the same call already made for the due list's second
   * card. Each is kept near the frames' line count so the bubble stays the
   * height it's drawn at.
   */
  answer: string;
  miss: string;
  partial: string;
  /**
   * The nudge on the Hint screen (SPEC.md #9, frame 15868:631), whose own
   * copy — "Think of the this and that thing and try again." — is
   * placeholder too. Points at the answer without giving it: there is no
   * Reveal in this flow, so a hint must leave something to recall. Kept to
   * two lines, the length the frame's bubble is drawn at.
   */
  hint: string;
};

export type DueTopic = {
  id: string;
  title: string;
  terms: DueTerm[];
  durationText: string;
  illustration: "default" | "variation";
};

export const dueTopics: DueTopic[] = [
  {
    id: "renaissance-philosophy",
    title: "Renaissance Philosophy",
    terms: [
      {
        name: "Humanism",
        prompt: "Let’s start with the basics. In your own words - what is humanism in the renaissance?",
        outcome: "pass",
        answer: "Right — humanism put human reason, dignity and the classics at the centre.",
        miss: "Not quite. Humanism centred human reason and the classics, not the divine.",
        partial: "Good start — you had the human focus, but the classical revival is missing.",
        hint: "Think about whose potential this era centred.",
      },
      {
        name: "Anthropocentrism",
        prompt: "How does anthropocentrism show up in Renaissance thinking?",
        outcome: "incorrect",
        answer: "Right — anthropocentrism makes human concerns the measure of things.",
        miss: "Not quite. Anthropocentrism puts human concerns, not God's order, at the centre.",
        partial: "Half there — you named the human focus, but not what it displaced.",
        hint: "Think about what sits at the centre, and why.",
      },
      {
        name: "Theocentrism",
        prompt: "What did theocentrism mean before the Renaissance, and how does it differ from humanism?",
        outcome: "partial",
        answer: "Yes — theocentrism placed God, not people, at the centre of life.",
        miss: "Not quite. Theocentrism is the God-centred view humanism moved away from.",
        partial: "Close — God at the centre is right, but the contrast with humanism is missing.",
        hint: "Think about what humanism replaced.",
      },
    ],
    durationText: "2-3 minutes",
    illustration: "default",
  },
  {
    id: "the-reformation",
    title: "The Reformation",
    terms: [
      {
        name: "Indulgences",
        prompt: "In your own words - what were indulgences, and why did they cause so much anger?",
        outcome: "pass",
        answer: "Right — indulgences were paid pardons, and selling them looked like buying grace.",
        miss: "Not quite. Indulgences were pardons sold for money, which is what caused the anger.",
        partial: "Partly — you had the payment, but not why it outraged people.",
        hint: "Think about what was being sold, and to whom.",
      },
      {
        name: "Predestination",
        prompt: "How would you explain predestination to someone who’s never heard the term?",
        outcome: "incorrect",
        answer: "Exactly — predestination holds that salvation is already decided by God.",
        miss: "Not quite. Predestination means salvation is settled in advance, not earned.",
        partial: "Close — you had God deciding, but not that it is decided beforehand.",
        hint: "Think about when the decision is made.",
      },
      {
        name: "Iconoclasm",
        prompt: "What was iconoclasm, and what were reformers trying to achieve by it?",
        outcome: "partial",
        answer: "Yes — iconoclasm tore out religious images to strip worship back down.",
        miss: "Not quite. Iconoclasm was the removal of religious images, not of the clergy.",
        partial: "Nearly — you had images being destroyed, but not what reformers wanted from it.",
        hint: "Think about what was removed from churches.",
      },
    ],
    durationText: "2-3 minutes",
    illustration: "variation",
  },
];

export const totalDueTerms = dueTopics.reduce(
  (sum, topic) => sum + topic.terms.length,
  0,
);

// Badge caps at "5+" (its own default), matching the frames' recall badge.
export const dueCountLabel = totalDueTerms > 5 ? "5+" : String(totalDueTerms);

export function getTopic(topicId: string): DueTopic | undefined {
  return dueTopics.find((topic) => topic.id === topicId);
}

// The card's meta row reads "3 topics" in Figma — its sub-items are called
// topics there, so the copy follows the frame.
export function topicCountText(topic: DueTopic): string {
  return topic.terms.length === 1 ? "1 topic" : `${topic.terms.length} topics`;
}

// Progress is a property of the *term*, not of the screen you're on: every
// screen for term N (prompt, processing, result) reads the same value, so a
// result never advances the bar. Continue advances it by moving to term
// N+1; stepping back with the back arrow moves it back to that term's
// value; it never resets between terms. 25 → 75 → 100 skips 50 by design
// (docs/sprint-context.md; decided 2026-09-15).
//
// The voice frames all draw 25 because they were all drawn for term 1 —
// they don't contradict this, they just don't cover terms 2 and 3.
const TERM_PROGRESS: ProgressIndicatorProgress[] = ["25", "75", "100"];

export function progressForTerm(index: number): ProgressIndicatorProgress {
  return TERM_PROGRESS[index] ?? "100";
}
