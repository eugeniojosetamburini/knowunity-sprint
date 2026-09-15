"use client";

import { useState } from "react";
import { notFound, useParams, useRouter, useSearchParams } from "next/navigation";

import { Scaffold } from "@/stories/components/Scaffold/Scaffold";
import { AppBar } from "@/stories/components/AppBar/AppBar";
import { ButtonIcon } from "@/stories/components/ButtonIcon/ButtonIcon";
import { ChatBubble } from "@/stories/components/ChatBubble/ChatBubble";
import { Chips } from "@/stories/components/Chips/Chips";
import { Mascot } from "@/stories/components/Mascot/Mascot";
import { PlusIcon } from "@/stories/components/ButtonIcon/PlusIcon";
import { getTopic } from "../../due-terms";
import { MicTrigger, requestMicAccess } from "./MicTrigger";
import styles from "./page.module.css";

// Entry / recap screen (SPEC.md #3), matching the Figma frame
// "Voice Review Screen" 15783:6710 1:1.
//
// Tapping the mic asks for real mic permission (never on entry — CLAUDE.md)
// and then opens term 1's prompt screen, which is where recording actually
// happens. There is no Listening state on this screen: the frame has none,
// and the flow goes Entry → prompt (16023:6960) → recording (15783:6833).
//
// The permission-denied state has no frame of its own (SPEC.md #12: decided,
// not designed) — its copy is the decided behavior, not traced pixels.
// ?mic=denied forces that look on load for presenting it without an actual
// OS-level denial; a real denial on tap lands in the same place.
//
// Content notes against the frame:
// - The "+" beside the chips is buttonIcon variant=Brand size=XS (the
//   add-topic control, per its own Figma description), not the Tertiary/S
//   SPEC.md lists — that pair is the bar's back/more buttons.
// - The progress bar reads 25% with no count label in the frame; matched.
// - The eyebrow is typed uppercase in Figma; the copy here is sentence case
//   (design-system.md rule) and CSS text-transform renders it identically.
// - The "+" add-topic control has no destination (that flow isn't built) and
//   stays a real, inert tap target.

const DENIED_BUBBLE =
  "I can't hear you yet — the microphone is off for Knowunity. You can still do this by typing your answers.";

export default function Recap() {
  const { topicId } = useParams<{ topicId: string }>();
  const router = useRouter();
  const searchParams = useSearchParams();

  const topic = getTopic(topicId);
  const [denied, setDenied] = useState(searchParams.get("mic") === "denied");

  if (!topic) {
    notFound();
  }

  async function handleMicTap() {
    if (denied) return;

    if (await requestMicAccess()) {
      router.push(`/recap/${topicId}/prompt/0`);
    } else {
      setDenied(true);
    }
  }

  return (
    <Scaffold
      topBar={<AppBar progress="25" />}
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
              <Chips key={term.name} size="M" color="brand" Text={term.name} />
            ))}
            <ButtonIcon variant="brand" size="xs" icon={<PlusIcon />} aria-label="Add a topic" />
          </div>
        </section>
      </div>

      <div className={styles.triggerZone}>
        <MicTrigger
          state={denied ? "disabled" : "idle"}
          label={denied ? "Microphone is off" : undefined}
          onTap={handleMicTap}
        >
          <div className={styles.callout}>
            <p className={styles.calloutTitle}>{denied ? "Microphone is off" : "Tap to start"}</p>
            <p className={styles.calloutHint}>
              {denied ? "Turn it on in Settings, or type your answers" : "approx. 2-3 min · speak naturally"}
            </p>
          </div>
        </MicTrigger>
        {/* #14 Text fallback isn't built, so "Type instead" is a real but
            inert target; "Or tap next →" skips the mic and opens term 1. */}
        <button
          type="button"
          className={styles.nextLink}
          onClick={denied ? undefined : () => router.push(`/recap/${topicId}/prompt/0`)}
        >
          {denied ? "Type instead" : "Or tap next →"}
        </button>
      </div>
    </Scaffold>
  );
}
