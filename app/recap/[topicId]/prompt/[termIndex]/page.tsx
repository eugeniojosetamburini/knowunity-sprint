"use client";

import { Suspense, useState } from "react";
import { notFound, useParams, useRouter, useSearchParams } from "next/navigation";

import { Scaffold } from "@/stories/components/Scaffold/Scaffold";
import { AppBar } from "@/stories/components/AppBar/AppBar";
import { ChatBubble } from "@/stories/components/ChatBubble/ChatBubble";
import { Button } from "@/stories/components/Button/Button";
import { Mascot } from "@/stories/components/Mascot/Mascot";
import { getTopic, progressForTerm } from "../../../../due-terms";
import { MicTrigger, requestMicAccess } from "../../MicTrigger";
import styles from "./page.module.css";

// The prompt screen, in its three Figma states — one screen, one route, the
// mic tap moving between them:
//   idle      16023:6960  Skip, no action button,   "Tap to start"
//   listening 15783:6833  no Skip, Cancel,          "Listening. Speak now (tap to pause)"
//   stopped   15783:7103  Skip, Submit,             "Recording paused.  Tap again to resume."
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
// - Submit now routes to Processing (#6, frame 15783:7209). "Type instead"
//   (#14) still has nowhere to go — a real, inert target.
// - The denied branch has no frame at all: permission is asked for on the
//   entry screen, so it is only reachable if access is revoked mid-session.

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
  const [denied, setDenied] = useState(false);

  if (!topic || !term || !Number.isInteger(index)) {
    notFound();
  }

  async function handleMicTap() {
    if (denied) return;

    // Listening → stopped, and stopped → listening again, which is what the
    // frame's own "tap again to resume" copy describes.
    if (state === "listening") {
      setState("stopped");
      return;
    }

    if (await requestMicAccess()) {
      setState("listening");
    } else {
      setDenied(true);
    }
  }

  const isLastTerm = index === topic.terms.length - 1;
  const showSkip = state !== "listening";

  return (
    <Scaffold
      topBar={<AppBar backHref={`/recap/${topicId}`} backLabel="Back to recap" progress={progressForTerm(index)} />}
    >
      <div className={styles.body}>
        <p className={styles.eyebrow}>
          Term {index + 1} of {topic.terms.length} · {term.name}
        </p>

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
                  (SPEC.md #4). Inert on the last term: Summary isn't routed. */}
              <Button
                variant="tertiary"
                size="m"
                onClick={isLastTerm ? undefined : () => router.push(`/recap/${topicId}/prompt/${index + 1}`)}
              >
                Skip
              </Button>
            </div>
          )}
        </div>

        <div className={styles.actionSlot}>
          {state === "listening" && (
            // Discards instantly, back to idle, never counts as an attempt
            // (SPEC.md #5).
            <Button variant="destructive" size="s" onClick={() => setState("idle")}>
              Cancel
            </Button>
          )}
          {state === "stopped" && (
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

      <div className={styles.triggerZone}>
        <MicTrigger
          state={denied ? "disabled" : state === "listening" ? "listening" : "idle"}
          label={denied ? "Microphone is off" : undefined}
          onTap={handleMicTap}
        >
          <p className={styles.callout}>
            {denied ? "Microphone is off" : CALLOUT[state]}
          </p>
        </MicTrigger>
        <button type="button" className={styles.nextLink}>
          Type instead
        </button>
      </div>
    </Scaffold>
  );
}
