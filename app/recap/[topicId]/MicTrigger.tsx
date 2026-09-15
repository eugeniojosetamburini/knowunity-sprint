"use client";

import type { ReactNode } from "react";

import { VoiceInput, type VoiceInputState } from "@/stories/components/VoiceInput/VoiceInput";
import styles from "./MicTrigger.module.css";

// Real mic permission, requested on tap-to-record and never on screen entry
// (CLAUDE.md / docs/voice-ux.md). No audio is recorded or sent anywhere: a
// granted stream is stopped immediately, since real STT/judging stays out of
// scope. Returns false for a denial and for a browser with no mic API, so
// callers land on the same "microphone is off" branch either way.
export async function requestMicAccess(): Promise<boolean> {
  if (!navigator.mediaDevices?.getUserMedia) return false;

  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    stream.getTracks().forEach((track) => track.stop());
    return true;
  } catch {
    return false;
  }
}

// The mic tap target plus whatever callout sits under it. The callout is a
// child, not a prop, because the two screens that use this render different
// callouts: the Entry/recap frame (15783:6710) has a bold title over a
// secondary hint, the Idle/prompt frames (16023:6960, 15783:6833,
// 15783:7103) have a single secondary line.
export function MicTrigger({
  state,
  onTap,
  label,
  children,
}: {
  state: VoiceInputState;
  onTap: () => void;
  label?: string;
  children: ReactNode;
}) {
  return (
    <div className={styles.trigger}>
      <VoiceInput state={state} label={label} onClick={onTap} />
      {children}
    </div>
  );
}
