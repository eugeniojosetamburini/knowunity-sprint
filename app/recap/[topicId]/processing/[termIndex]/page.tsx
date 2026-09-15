"use client";

import { useEffect } from "react";
import { notFound, useParams, useRouter } from "next/navigation";

import { Scaffold } from "@/stories/components/Scaffold/Scaffold";
import { AppBar } from "@/stories/components/AppBar/AppBar";
import { ChatBubble } from "@/stories/components/ChatBubble/ChatBubble";
import { Mascot } from "@/stories/components/Mascot/Mascot";
import { VoiceInput } from "@/stories/components/VoiceInput/VoiceInput";
import { getTopic, progressForTerm } from "../../../../due-terms";
import styles from "./page.module.css";

// The Processing screen — "Voice Review Screen" frame 15783:7209 (SPEC.md
// #6). One state, and the only screen in the flow with nothing tappable in
// its body: the student has submitted and is waiting on the (mocked) judge.
//
// It is the same composition as the prompt screen (#4/#5/#5b) with the
// interactive parts taken away, exactly as the frame draws it:
//   - Mascot swaps standby → thinking
//   - the bubble carries "Thinking..." instead of the term's question
//   - VoiceInput is Disabled (a real disabled <button>, so it can't be
//     tapped or focused, not just dimmed)
//   - no Skip, no Cancel/Submit action slot, no callout under the mic, and
//     no "Type instead" link — none of the four are on this frame
// The bar (back / progress / more) and the eyebrow are unchanged, so the
// screen reads as the same term rather than a new one.
//
// Notes:
// - The trigger zone is 259px here, not this frame's 262px. The prompt
//   screens' three frames already disagree with each other by 4px and the
//   build standardised on 259 so the mic never jumps between states
//   (SPEC.md, "Open"); this frame is a fourth value in the same
//   disagreement. Matching it would make the mic hop 3px up the moment
//   Submit is tapped. Decided with the user; still wants fixing at source.
// - Knowie stays text-only here: "Thinking..." is the whole of the status
//   message, and docs/voice-ux.md's principle 6 (design for the wait) is
//   carried by the mascot's thinking state plus the bubble, not by a
//   spinner.
// - The progress bar reads this term's value, the same one its prompt
//   screen shows: processing never advances it (see progressForTerm).
// - No mic permission is touched on this screen — nothing is requested on
//   entry anywhere in this flow (CLAUDE.md), and by here it was already
//   asked for on the entry screen's mic tap.

// Fixed, not variable (SPEC.md, "Processing is a fixed ~1.5–2s delay").
const JUDGE_DELAY_MS = 1800;

export default function Processing() {
  const { topicId, termIndex } = useParams<{ topicId: string; termIndex: string }>();
  const router = useRouter();

  const topic = getTopic(topicId);
  const index = Number(termIndex);
  const term = topic?.terms[index];

  useEffect(() => {
    // Lands on this term's result once the mocked judge has "decided".
    // Every term currently resolves to Pass (#7) — the per-term scripted
    // outcome SPEC.md describes goes into app/due-terms.ts when Incorrect
    // (#8) is built, and this becomes a lookup rather than a fixed route.
    // replace(), not push(): the back arrow on the result should step to
    // the question, not back into a wait that would immediately re-fire.
    const timer = setTimeout(() => {
      router.replace(`/recap/${topicId}/result/${termIndex}`);
    }, JUDGE_DELAY_MS);

    return () => clearTimeout(timer);
  }, [router, topicId, termIndex]);

  if (!topic || !term || !Number.isInteger(index)) {
    notFound();
  }

  return (
    <Scaffold
      topBar={<AppBar backHref={`/recap/${topicId}/prompt/${index}`} backLabel="Back to the question" progress={progressForTerm(index)} />}
    >
      <div className={styles.body}>
        <p className={styles.eyebrow}>
          Term {index + 1} of {topic.terms.length} · {term.name}
        </p>

        <div className={styles.contentRow}>
          <div className={styles.mascotCell}>
            <Mascot state="thinking" />
          </div>
          <div className={styles.bubbleCell}>
            {/* Verbatim from the frame. aria-live so the wait is announced,
                since a student using a screen reader gets no mascot. */}
            <ChatBubble state="default" neutralText="Thinking..." aria-live="polite" />
          </div>
        </div>
      </div>

      <div className={styles.triggerZone}>
        {/* Disabled, so it renders dimmed *and* is genuinely not tappable.
            Its default accessible name for this state is "Knowie's
            thinking", which is what the wait means here. */}
        <VoiceInput state="disabled" />
      </div>
    </Scaffold>
  );
}
