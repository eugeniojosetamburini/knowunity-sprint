"use client";

import { useState } from "react";
import { notFound, useParams, useSearchParams } from "next/navigation";

import { Scaffold } from "@/stories/components/Scaffold/Scaffold";
import { ChatBubble } from "@/stories/components/ChatBubble/ChatBubble";
import { Chips } from "@/stories/components/Chips/Chips";
import { ProgressIndicator } from "@/stories/components/ProgressIndicator/ProgressIndicator";
import { Mascot } from "@/stories/components/Mascot/Mascot";
import { ButtonIcon } from "@/stories/components/ButtonIcon/ButtonIcon";
import { PlusIcon } from "@/stories/components/ButtonIcon/PlusIcon";
import { getTopic } from "../../due-terms";
import { BackButton } from "./BackButton";
import { MicTrigger, type MicState } from "./MicTrigger";
import { MoreHorizontalIcon } from "./icons";
import styles from "./page.module.css";

// Entry / recap screen (SPEC.md #3). Granted state matches the Figma frame
// "Voice Review Screen" 15783:6710 1:1; the permission-denied state has no
// frame (SPEC.md #12: decided, not designed). ?mic=denied forces that look
// on load for presenting it without an actual OS-level denial; a real
// denial from the live getUserMedia permission gate (MicTrigger) takes over
// the same way once the student actually taps the mic.
//
// Content notes against the frame:
// - The "+" beside the chips is buttonIcon variant=Brand size=XS (the
//   add-topic control, per its own Figma description), not the Tertiary/S
//   SPEC.md lists — that pair is the bar's back/more buttons.
// - The progress bar reads 25% with no count label in the frame; matched.
// - The eyebrows are typed uppercase in Figma; the copy here is sentence
//   case (design-system.md rule) and CSS text-transform renders it the same.
// - "Or tap next →" and the "+" have no destination yet (Idle screen #4 and
//   the add-topic flow aren't built); both are real tap targets left inert.

const DENIED_BUBBLE =
  "I can't hear you yet — the microphone is off for Knowunity. You can still do this by typing your answers.";

export default function Recap() {
  const { topicId } = useParams<{ topicId: string }>();
  const searchParams = useSearchParams();
  const forcedDenied = searchParams.get("mic") === "denied";

  const topic = getTopic(topicId);
  const [micState, setMicState] = useState<MicState>(forcedDenied ? "denied" : "idle");

  if (!topic) {
    notFound();
  }

  const denied = micState === "denied";

  return (
    <Scaffold
      topBar={
        <div className={styles.appBar}>
          <BackButton />
          <div className={styles.progress}>
            <ProgressIndicator
              variant="primary"
              thickness="24"
              progress="25"
              aria-label="Review session progress"
            />
          </div>
          <ButtonIcon variant="tertiary" size="s" icon={<MoreHorizontalIcon />} aria-label="More options" />
        </div>
      }
    >
      <div className={styles.body}>
        <p className={styles.eyebrow}>✓ {topic.title}</p>
        <h1 className={styles.headline}>Check what you remember</h1>

        <section className={styles.chatRow}>
          <Mascot state="standby" />
          <ChatBubble state="default" neutralText={denied ? DENIED_BUBBLE : undefined} />
        </section>

        <section className={styles.recap}>
          <p className={styles.recapLabel}>You&rsquo;ll recap</p>
          <div className={styles.chipsWrap}>
            {topic.terms.map((term) => (
              <Chips key={term} size="M" color="brand" Text={term} />
            ))}
            <ButtonIcon variant="brand" size="xs" icon={<PlusIcon />} aria-label="Add a topic" />
          </div>
        </section>
      </div>

      <div className={styles.triggerZone}>
        <MicTrigger state={micState} onStateChange={setMicState} />
        {/* Destination screens (#4 Idle prompt, #14 Text fallback) aren't
            built yet — real tap targets, nowhere to go. */}
        <button type="button" className={styles.nextLink}>
          {denied ? "Type instead" : "Or tap next →"}
        </button>
      </div>
    </Scaffold>
  );
}
