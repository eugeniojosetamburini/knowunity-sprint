"use client";

import { Suspense, useState } from "react";
import { notFound, useParams, useRouter, useSearchParams } from "next/navigation";

import { Scaffold } from "@/stories/components/Scaffold/Scaffold";
import { AppBar } from "@/stories/components/AppBar/AppBar";
import { ChatBubble } from "@/stories/components/ChatBubble/ChatBubble";
import { Button } from "@/stories/components/Button/Button";
import { TextLink } from "@/stories/components/TextLink/TextLink";
import { Mascot } from "@/stories/components/Mascot/Mascot";
import { getTopic, progressForTerm } from "../../../../due-terms";
import { MicTrigger, requestMicAccess } from "../../MicTrigger";
import { TypeTrigger } from "../../TypeTrigger";
import { saveTypedAnswer, setMicDenied, useMicDenied, useTextMode } from "../../sessionState";
import { ExitSessionSheet, useExitSession } from "../../ExitSession";
import styles from "./page.module.css";

// The prompt screen, in its three Figma states — one screen, one route, the
// mic tap moving between them:
//   idle      16023:6960  Skip, no action button,   "Tap to start"
//   listening 15783:6833  no Skip, Cancel,          "Listening. Speak now (tap to pause)"
//   stopped   15783:7103  Skip, Submit,             "Recording paused.  Tap again to resume."
// The mic itself is Idle / Listening / **Paused** across those three. The
// stopped frame reuses Idle for it; this build doesn't (see the MicTrigger
// note below and docs/design-system.md's voiceInput entry).
// Everything else — bar, eyebrow, mascot, bubble, "Type instead" — is
// identical across all three, and the Cancel and Submit pills occupy the
// same slot (both sit at y=518 in their frames).
//
// Copy is verbatim from the frames. Two of those lines describe pausing and
// resuming a take, which docs/sprint-context.md's "Not building" list
// excludes — CLAUDE.md says match Figma 100%, so the frames win here and the
// contradiction is reported rather than quietly resolved.
//
// Component notes:
// - Submit and Cancel are the real `Button` (primary/s and destructive/s).
//   Figma's Submit layer is a detached, off-component-set duplicate (the one
//   also used as "Refer" on Home) positioned by absolute coordinates; its
//   look matches Button primary/s exactly. Cancel's layer is a real
//   destructive/s instance.
// - Primary and Destructive never appear together: Submit only shows when
//   stopped, Cancel only while listening (design-system.md's rule holds).
// - Only term 1 (Humanism) has frames. Terms 2 and 3 reuse this composition
//   with prompt copy invented to match its tone (see app/due-terms.ts).
// - The progress bar reads this term's value (25 / 75 / 100), not a
//   fixed 25. Every frame draws 25 because every frame was drawn for
//   term 1; the per-term rule is in progressForTerm (app/due-terms.ts).
// - ?record=1 opens this screen already Listening, for the Hint screen's
//   mic tap: permission was requested there, so a second tap would be
//   friction. Without the param it opens Idle, as the frames draw it.
// - Submit routes to Processing (#6, frame 15783:7209).
// - **"Type instead" now works (#14, built 2026-09-15).** It swaps the mic
//   and its callout for a field and a Submit *in place*: the bar, eyebrow,
//   mascot, bubble and Skip all stay exactly where they are, and the zone
//   keeps its 259px so nothing above it moves. The choice is sticky for the
//   session (sessionStorage — see ../../sessionState.ts), and "Use voice
//   instead" sits in the same spot to switch back. No Figma frame covers
//   any of this; it is composed, and the decisions are listed in SPEC.md.
// - The denied branch has no frame either. Since the entry screen lost its
//   mic (frame 16031:7075), **this screen is where permission is actually
//   requested**, so a refusal lands here on the first tap. **A refusal
//   switches to the text field** (changed 2026-09-21) and says why, in the
//   slot above it — it used to leave a disabled mic and "Microphone is
//   off", a control that could never work and no way forward but a link
//   the student had to find (voice-ux.md §3: "don't dead-end them";
//   sprint-context.md: "permission denied routes to text-first mode").
//   "Use voice instead" is still there, so a student who allows the mic in
//   Settings can come back; a second refusal just lands here again.

type RecordState = "idle" | "listening" | "stopped";

const CALLOUT: Record<RecordState, string> = {
  idle: "Tap to start",
  listening: "Listening. Speak now (tap to pause)",
  stopped: "Recording paused.  Tap again to resume.",
};

export default function PromptPage() {
  // useSearchParams needs a Suspense boundary to avoid opting the whole
  // route into client-side rendering (Next.js).
  return (
    <Suspense>
      <Prompt />
    </Suspense>
  );
}

function Prompt() {
  const { topicId, termIndex } = useParams<{ topicId: string; termIndex: string }>();
  const router = useRouter();
  const searchParams = useSearchParams();

  const topic = getTopic(topicId);
  const index = Number(termIndex);
  const term = topic?.terms[index];

  // Arriving from the Hint screen's mic tap (?record=1) means the
  // student already tapped to record and permission was already granted
  // there, so this opens straight into Listening rather than making them
  // tap a second time.
  const [state, setState] = useState<RecordState>(searchParams.get("record") === "1" ? "listening" : "idle");
  const [textMode, setTextMode] = useTextMode();
  const micDenied = useMicDenied();
  const [typed, setTyped] = useState("");

  // ⋯ → End session → confirm → Home (SPEC.md #15/#16). Terms left
  // counts the current term too, since leaving abandons it as well.
  const exit = useExitSession((topic?.terms.length ?? 0) - index);

  if (!topic || !term || !Number.isInteger(index)) {
    notFound();
  }

  async function handleMicTap() {
    // Listening → stopped, and stopped → listening again, which is what the
    // frame's own "tap again to resume" copy describes.
    if (state === "listening") {
      setState("stopped");
      return;
    }

    if (await requestMicAccess()) {
      setMicDenied(false);
      setState("listening");
    } else {
      // Refused: nothing is listening, so the field takes over.
      setMicDenied(true);
      setTextMode(true);
    }
  }

  function handleTextSubmit() {
    // Judging is scripted, so the text isn't judged — it's kept so the
    // result screen can show the student their own words back.
    saveTypedAnswer(topicId, index, typed.trim());
    router.push(`/recap/${topicId}/processing/${index}`);
  }

  const isLastTerm = index === topic.terms.length - 1;
  // Skip stays in text mode (SPEC.md #14: "Skip stays put"); it only hides
  // while actually recording, which can't happen while typing.
  const showSkip = textMode || state !== "listening";

  return (
    <Scaffold
      topBar={<AppBar menuItems={exit.menuItems} backHref={`/recap/${topicId}`} backLabel="Back to recap" progress={progressForTerm(index)} />}
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

        <div className={styles.contentRow}>
          <div className={styles.mascotCell}>
            <Mascot state="standby" />
          </div>
          <div className={styles.bubbleCell}>
            <ChatBubble state="default" neutralText={term.prompt} />
          </div>
          {showSkip && (
            <div className={styles.skipCell}>
              {/* Ungraded — the term stays due at its existing interval
                  (SPEC.md #4). On the last term it ends the session at the
                  Summary, the same place Continue goes from the last
                  result: it used to be inert here, from back when Summary
                  wasn't routed, which left a student who couldn't answer
                  the last term with no way out but ⋯ → End session —
                  throwing away the two terms they had just done. A Skip
                  that renders and does nothing is worse than no Skip.
                  (The Summary still reports this term's scripted outcome
                  rather than counting it as skipped; that's the separate
                  "summary asserts its numbers" finding, not fixed here.) */}
              <Button
                variant="tertiary"
                size="m"
                onClick={() =>
                  router.push(
                    isLastTerm
                      ? `/recap/${topicId}/summary`
                      : `/recap/${topicId}/prompt/${index + 1}`,
                  )
                }
              >
                Skip
              </Button>
            </div>
          )}
        </div>

        {/* Empty in text mode: Cancel and Submit both belong to recording,
            and the text Submit sits under the field instead. */}
        <div className={styles.actionSlot}>
          {textMode && micDenied && (
            // Only while the mic is refused. role="status" so a screen
            // reader hears why the field appeared.
            <p className={styles.callout} role="status">
              Microphone is off. Type your answer, or allow it again in Settings.
            </p>
          )}
          {!textMode && state === "listening" && (
            // Discards instantly, back to idle, never counts as an attempt
            // (SPEC.md #5).
            <Button variant="destructive" size="s" onClick={() => setState("idle")}>
              Cancel
            </Button>
          )}
          {!textMode && state === "stopped" && (
            // → Processing (#6), where the mocked judge "thinks".
            <Button
              variant="primary"
              size="s"
              onClick={() => router.push(`/recap/${topicId}/processing/${index}`)}
            >
              Submit
            </Button>
          )}
        </div>
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
          {/* stopped → the mic's own Paused state, added 2026-09-21. The
              frame draws Idle here, so a student who had just recorded saw
              the same circle as one who had not; the pixels differed only
              in the Submit pill and one line of caption. Logged as a
              departure in SPEC.md #5b and docs/design-system.md. */}
          <MicTrigger
            state={state === "listening" ? "listening" : state === "stopped" ? "paused" : "idle"}
            onTap={handleMicTap}
          >
            {/* role="status" so idle → listening → paused is announced.
                It is the one thing on this screen that changes without a
                navigation, and docs/voice-ux.md §1 makes showing the
                current state the first principle — which has to hold for
                a student who can't see the mic change colour. */}
            <p className={styles.callout} role="status">
              {CALLOUT[state]}
            </p>
          </MicTrigger>
          {/* Switching discards any in-progress take — nothing was recorded
              anyway, and leaving the screen in "stopped" behind a text field
              would strand a Submit the student can no longer reach. */}
          <TextLink
            flush
            onClick={() => {
              setState("idle");
              setTextMode(true);
            }}
          >
            Type instead
          </TextLink>
        </div>
      )}

      <ExitSessionSheet {...exit.sheetProps} />
    </Scaffold>
  );
}
