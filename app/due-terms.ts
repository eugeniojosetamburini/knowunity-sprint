// Mocked due-term data shared by Home, Due list, and the Entry/recap screen.
// The content mirrors the Figma frames exactly, not an invented dataset:
//   - Due list (node 15734:4996): two cards, both "Renaissance Philosophy",
//     "3 topics", "2-3 minutes" — the frame repeats one instance twice, with
//     two different illustrations (public/images/card-image.png and
//     card-image-variation.png, in that order).
//   - Entry/recap (node 15783:6710): chips Humanism / Anthropocentrism /
//     Theocentrism (the Idle screen 15783:6833 counts them as "TERM 1 OF 3").
//   - Home + Due list top bar: the recall badge reads "5+" — two topics ×
//     three terms = 6 due, capped at 5+.
// If a Figma frame and this file ever disagree, this file is what changes.

export type DueTopic = {
  id: string;
  title: string;
  terms: string[];
  durationText: string;
  illustration: "default" | "variation";
};

export const dueTopics: DueTopic[] = [
  {
    id: "renaissance-philosophy",
    title: "Renaissance Philosophy",
    terms: ["Humanism", "Anthropocentrism", "Theocentrism"],
    durationText: "2-3 minutes",
    illustration: "default",
  },
  {
    id: "renaissance-philosophy-2",
    title: "Renaissance Philosophy",
    terms: ["Humanism", "Anthropocentrism", "Theocentrism"],
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
