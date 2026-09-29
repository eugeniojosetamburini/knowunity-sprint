"use client";

import { useEffect, useState } from "react";
import { notFound, useParams, useRouter } from "next/navigation";

import { Scaffold } from "@/stories/components/Scaffold/Scaffold";
import { AppBar } from "@/stories/components/AppBar/AppBar";
import { ChatBubble } from "@/stories/components/ChatBubble/ChatBubble";
import { Mascot } from "@/stories/components/Mascot/Mascot";
import { Button } from "@/stories/components/Button/Button";
import { TextLink } from "@/stories/components/TextLink/TextLink";
import { getTopic, progressForTerm } from "../../../../due-terms";
import { MicTrigger, requestMicAccess } from "../../MicTrigger";
import { TypeTrigger } from "../../TypeTrigger";
import { saveTypedAnswer, setMicDenied, useMicDenied, useTextMode, markHinted } from "../../sessionState";
import { ExitSessionSheet, useExitSession } from "../../ExitSession";
import styles from "./page.module.css";

// The Hint nudge — "Voice Review Screen" frame 15868:631 (SPEC.md #9).
// One state. Reached from Hint on a miss or a partial, and the screen that
// closes the miss loop: from here the student re-records, or goes back to
// the question. There is no second hint and no Reveal.
//
// Composition, as the frame draws it: the same bar and eyebrow, a standby
// mascot beside a default ChatBubble carrying the nudge, "Repeat question"
// tucked under the bubble's right edge, and the prompt screen's trigger
// zone below — mic, callout, "Type instead".
//
// Notes:
// - The frame labels the button "Repeat Question". It is built sentence
//   case, as CLAUDE.md requires of every label — the frame's title case is
//   the only one in the prototype and wants fixing at source. Decided
//   2026-09-15.
// - "Repeat question" is the one Primary here, which is why the mic's own
//   affordance stays a VoiceInput rather than competing as a button.
// - The trigger zone is 259px, matching every other screen in the flow
//   rather than this frame's own 232px, so the mic doesn't move between
//   screens. Same call, and same reason, as on prompt and processing.
// - Tapping the mic re-records: it goes to that term's prompt screen in
//   its listening state, which is where recording actually happens, rather
//   than duplicating the recorder here.
// - **"Type instead" now works (#14, built 2026-09-15).** Same swap as the
//   prompt screen: the mic and callout become a field and a Submit, the
//   bubble and "Repeat question" stay put, and the zone keeps its 259px.
//   Text mode is sticky across the session, so a student who chose typing on
//   the prompt screen arrives here already typing and never meets a mic.
//
//   **One rule had to be resolved here (decided 2026-09-15):** in text mode
//   this screen would otherwise carry two Primaries — "Repeat question"
//   (primary/s per the frame) and the field's Submit — which CLAUDE.md
//   forbids. Submit takes the Primary, because in text mode it is the
//   forward action; "Repeat question" drops to Secondary for as long as the
//   student is typing, and is Primary again in voice mode, as the frame
//   draws it. Nothing else about the frame changes.
// - The bubble copy is real per-term hint text, not the frame's
//   placeholder sentence. Decided 2026-09-15; see app/due-terms.ts.

export default function Hint() {
  const { topicId, termIndex } = useParams<{ topicId: string; termIndex: string }>();
  const router = useRouter();

  const topic = getTopic(topicId);
  const index = Number(termIndex);
  const term = topic?.terms[index];

  const [textMode, setTextMode] = useTextMode();
  const micDenied = useMicDenied();
  const [typed, setTyped] = useState("");

  // ⋯ → End session → confirm → Home (SPEC.md #15/#16). Terms left
  // counts the current term too, since leaving abandons it as well.
  const exit = useExitSession((topic?.terms.length ?? 0) - index);

  // Opening this screen is what "taking the hint" means: the result the
  // student reaches after answering again reads as a second attempt, and
  // Hint is not offered on it (no second hint — sprint-context.md).
  useEffect(() => {
    if (term) markHinted(topicId, index);
  }, [term, topicId, index]);

  if (!topic || !term || !Number.isInteger(index)) {
    notFound();
  }

  function handleTextSubmit() {
    saveTypedAnswer(topicId, index, typed.trim());
    router.push(`/recap/${topicId}/processing/${index}`);
  }

  async function handleMicTap() {
    if (await requestMicAccess()) {
      setMicDenied(false);
      router.push(`/recap/${topicId}/prompt/${index}?record=1`);
    } else {
      // Refused: the field takes over, as on the prompt screen.
      setMicDenied(true);
      setTextMode(true);
    }
  }

  return (
    <Scaffold
      topBar={
        <AppBar menuItems={exit.menuItems}
          backHref={`/recap/${topicId}/result/${index}`}
          backLabel="Back to the result"
          progress={progressForTerm(index)}
        />
      }
    >
      <div className={styles.body}>
        {/* The screen's heading. An <h1> rather than a <p>: prompt,
            processing and hint rendered no heading at all, so the flow's
            three main screens were headingless to a screen reader while
            every other screen had one. The term is what this screen is
            about, and .eyebrow carries all of the styling, so nothing
            moves. Added 2026-09-21. */}
        <h1 className={styles.eyebrow}>
          Term {index + 1} of {topic.terms.length} · {term.name}
        </h1>

        <div className={styles.replyGroup}>
          <div className={styles.mascotChatRow}>
            <Mascot state="standby" />
            <ChatBubble state="default" neutralText={term.hint} />
          </div>

          {/* Back to where the question was first asked (SPEC.md #9).
              Secondary while typing so the field's Submit can be the
              screen's one Primary — see the header note. */}
          <Button
            variant={textMode ? "secondary" : "primary"}
            size="s"
            onClick={() => router.push(`/recap/${topicId}/prompt/${index}`)}
          >
            Repeat question
          </Button>
        </div>

        {textMode && micDenied && (
          <p className={`${styles.callout} ${styles.notice}`} role="status">
            Microphone is off. Type your answer, or allow it again in Settings.
          </p>
        )}
      </div>

      {textMode ? (
        <TypeTrigger
          value={typed}
          onValueChange={setTyped}
          onSubmit={handleTextSubmit}
          onUseVoice={() => setTextMode(false)}
        />
      ) : (
        <div className={styles.triggerZone}>
          <MicTrigger state="idle" onTap={handleMicTap}>
            <p className={styles.callout}>Tap to try again</p>
          </MicTrigger>
          <TextLink flush onClick={() => setTextMode(true)}>
            Type instead
          </TextLink>
        </div>
      )}

      <ExitSessionSheet {...exit.sheetProps} />
    </Scaffold>
  );
}
