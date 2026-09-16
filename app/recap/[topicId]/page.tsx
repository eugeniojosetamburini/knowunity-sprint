"use client";

import { notFound, useParams, useRouter } from "next/navigation";

import { Scaffold } from "@/stories/components/Scaffold/Scaffold";
import { AppBar } from "@/stories/components/AppBar/AppBar";
import { ButtonIcon } from "@/stories/components/ButtonIcon/ButtonIcon";
import { ChatBubble } from "@/stories/components/ChatBubble/ChatBubble";
import { Chips } from "@/stories/components/Chips/Chips";
import { Mascot } from "@/stories/components/Mascot/Mascot";
import { Button } from "@/stories/components/Button/Button";
import { PlusIcon } from "@/stories/components/ButtonIcon/PlusIcon";
import { getTopic } from "../../due-terms";
import styles from "./page.module.css";

// Entry / recap screen (SPEC.md #3), matching the Figma frame
// "Voice Review Screen" **16031:7075** 1:1.
//
// **Revised 2026-09-15 to that new frame.** The screen used to end in a
// mic: a `VoiceInput`, a two-line callout under it ("Tap to start" /
// "approx. 2-3 min · speak naturally"), and an "Or tap next →" link. The
// new frame replaces all three with a single primary "Ready" button. Above
// the trigger zone nothing changed — eyebrow, headline, mascot + bubble and
// the "You'll recap" chips are identical in both frames.
//
// **What moved with it: mic permission.** This screen used to ask for
// getUserMedia on its mic tap. With no mic here, nothing on this screen
// asks, and the first permission prompt is now the prompt screen's own mic
// tap — which already requests it and already handles a denial. That is a
// closer reading of CLAUDE.md's "mic permission fires on tap-to-record,
// never on screen entry", not a looser one: this screen never recorded
// anything, so asking here was always early.
//
// **The denied state was dropped from this screen** (decided 2026-09-15).
// Three of its four elements — the disabled mic, the "Microphone is off"
// callout and the "Type instead" link — lived in the zone this frame
// replaces, and with nothing here requesting permission a real denial can
// no longer land here either. What was left was a bubble saying "I can't
// hear you" above a button saying "Ready", which is a half-state. So the
// `?mic=denied` param, the can't-hear-you copy and the `denied` branch are
// all gone from this file.
//
// **This does not drop the denied state from the flow**, which
// docs/voice-ux.md marks a **Must** ("permission denied → route to text").
// It lives where permission is actually asked for: the prompt screen
// (#4/#5) and the hint screen, both of which request `getUserMedia` on
// their mic tap, disable the mic on a refusal, and show "Type instead".
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

export default function Recap() {
  const { topicId } = useParams<{ topicId: string }>();
  const router = useRouter();

  const topic = getTopic(topicId);

  if (!topic) {
    notFound();
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
          <ChatBubble state="default" />
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

      {/* The new frame's whole trigger zone: one primary button, centred,
          138×56 (node 16031:7175). The only action on the screen, so it is
          the screen's one Primary. */}
      <div className={styles.triggerZone}>
        <Button variant="primary" size="l" onClick={() => router.push(`/recap/${topicId}/prompt/0`)}>
          Ready
        </Button>
      </div>
    </Scaffold>
  );
}
