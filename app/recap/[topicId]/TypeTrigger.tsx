"use client";

import { TextField } from "@/stories/components/TextField/TextField";
import { Button } from "@/stories/components/Button/Button";
import styles from "./TypeTrigger.module.css";

// The text fallback's trigger zone (SPEC.md #14) — what replaces the mic
// and its callout once the student taps "Type instead". A field, a Submit,
// and the way back to voice.
//
// Screen-local and shared by the prompt and hint screens, exactly like its
// sibling `MicTrigger`: both screens draw an identical zone, and this is
// screen composition rather than a design-system component (no Figma frame
// or component covers it). Logged in component-gaps.md.
//
// It occupies the same 259px zone the mic does on every voice screen, so
// swapping modes doesn't move anything above it — the eyebrow, mascot,
// bubble and Skip stay exactly where they were, which is what "swaps in
// place" means in SPEC.md.
//
// Submit is disabled while the field is empty: there is nothing to judge,
// and a scripted result arriving from an empty answer would read as a bug
// in a walkthrough. The student is never stuck by it — Skip and "Use voice
// instead" are both still there.

export function TypeTrigger({
  value,
  onValueChange,
  onSubmit,
  onUseVoice,
}: {
  value: string;
  onValueChange: (value: string) => void;
  onSubmit: () => void;
  onUseVoice: () => void;
}) {
  const isEmpty = value.trim().length === 0;

  return (
    <div className={styles.zone}>
      <TextField
        multiline
        rows={3}
        value={value}
        onValueChange={onValueChange}
        placeholder="Type your answer"
        aria-label="Your answer"
      />

      <Button
        variant="primary"
        size="s"
        state={isEmpty ? "disabled" : "default"}
        onClick={isEmpty ? undefined : onSubmit}
      >
        Submit
      </Button>

      {/* The way back. docs/sprint-context.md requires a route to re-enable
          the mic ("so no student is trapped by a 'no'"), while SPEC.md #14
          makes text mode sticky — both hold if stickiness is a default, not
          a one-way door. Sits exactly where "Type instead" sits in voice
          mode, so the toggle is in one place in both directions. */}
      <button type="button" className={styles.voiceLink} onClick={onUseVoice}>
        Use voice instead
      </button>
    </div>
  );
}
