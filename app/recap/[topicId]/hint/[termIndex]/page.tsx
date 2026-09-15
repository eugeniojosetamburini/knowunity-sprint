"use client";

import { useState } from "react";
import { notFound, useParams, useRouter } from "next/navigation";

import { Scaffold } from "@/stories/components/Scaffold/Scaffold";
import { AppBar } from "@/stories/components/AppBar/AppBar";
import { ChatBubble } from "@/stories/components/ChatBubble/ChatBubble";
import { Mascot } from "@/stories/components/Mascot/Mascot";
import { Button } from "@/stories/components/Button/Button";
import { getTopic, progressForTerm } from "../../../../due-terms";
import { MicTrigger, requestMicAccess } from "../../MicTrigger";
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
// - "Type instead" (#14) still has nowhere to go — a real, inert target.
// - The bubble copy is real per-term hint text, not the frame's
//   placeholder sentence. Decided 2026-09-15; see app/due-terms.ts.

export default function Hint() {
  const { topicId, termIndex } = useParams<{ topicId: string; termIndex: string }>();
  const router = useRouter();

  const topic = getTopic(topicId);
  const index = Number(termIndex);
  const term = topic?.terms[index];

  const [denied, setDenied] = useState(false);

  if (!topic || !term || !Number.isInteger(index)) {
    notFound();
  }

  async function handleMicTap() {
    if (denied) return;

    if (await requestMicAccess()) {
      router.push(`/recap/${topicId}/prompt/${index}?record=1`);
    } else {
      setDenied(true);
    }
  }

  return (
    <Scaffold
      topBar={
        <AppBar
          backHref={`/recap/${topicId}/result/${index}`}
          backLabel="Back to the result"
          progress={progressForTerm(index)}
        />
      }
    >
      <div className={styles.body}>
        <p className={styles.eyebrow}>
          Term {index + 1} of {topic.terms.length} · {term.name}
        </p>

        <div className={styles.replyGroup}>
          <div className={styles.mascotChatRow}>
            <Mascot state="standby" />
            <ChatBubble state="default" neutralText={term.hint} />
          </div>

          {/* Back to where the question was first asked (SPEC.md #9). */}
          <Button
            variant="primary"
            size="s"
            onClick={() => router.push(`/recap/${topicId}/prompt/${index}`)}
          >
            Repeat question
          </Button>
        </div>
      </div>

      <div className={styles.triggerZone}>
        <MicTrigger
          state={denied ? "disabled" : "idle"}
          label={denied ? "Microphone is off" : undefined}
          onTap={handleMicTap}
        >
          <p className={styles.callout}>
            {denied ? "Microphone is off" : "Tap to try again"}
          </p>
        </MicTrigger>
        <button type="button" className={styles.nextLink}>
          Type instead
        </button>
      </div>
    </Scaffold>
  );
}
