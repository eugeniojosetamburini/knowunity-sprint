"use client";

import { useState } from "react";

import { VoiceInput } from "@/stories/components/VoiceInput/VoiceInput";
import styles from "./page.module.css";

export type MicState = "idle" | "listening" | "denied";

const COPY: Record<MicState, { title: string; hint: string }> = {
  idle: { title: "Tap to start", hint: "approx. 2-3 min · speak naturally" },
  listening: { title: "Listening…", hint: "Tap the mic to stop" },
  denied: { title: "Microphone is off", hint: "Turn it on in Settings, or type your answers" },
};

// Real getUserMedia permission gate on first tap — presentation-only until
// now (per docs/voice-ux.md: mic permission fires on tap, never on entry).
// No audio is recorded or sent anywhere; a granted stream is stopped
// immediately since real STT/judging stays out of scope (CLAUDE.md).
export function MicTrigger({ state, onStateChange }: { state: MicState; onStateChange: (next: MicState) => void }) {
  async function handleTap() {
    if (state === "denied") return;

    if (state === "listening") {
      onStateChange("idle");
      return;
    }

    if (!navigator.mediaDevices?.getUserMedia) {
      onStateChange("denied");
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach((track) => track.stop());
      onStateChange("listening");
    } catch {
      onStateChange("denied");
    }
  }

  const denied = state === "denied";
  const copy = COPY[state];

  return (
    <div className={styles.trigger}>
      <VoiceInput
        state={denied ? "disabled" : state}
        label={denied ? "Microphone is off" : undefined}
        onClick={handleTap}
      />
      <div className={styles.callout}>
        <p className={styles.calloutTitle}>{copy.title}</p>
        <p className={styles.calloutHint}>{copy.hint}</p>
      </div>
    </div>
  );
}
