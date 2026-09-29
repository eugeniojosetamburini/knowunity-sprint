import type { ButtonHTMLAttributes } from 'react';

import styles from './VoiceInput.module.css';
import { MicButtonCoreIcon, MicIcon, PauseIcon } from './icons';

export type VoiceInputState = 'idle' | 'disabled' | 'listening' | 'paused';

const DEFAULT_LABEL: Record<VoiceInputState, string> = {
  idle: 'Start speaking',
  disabled: "Knowie's thinking",
  listening: 'Stop recording',
  // Tapping a paused take resumes it, which is what the prompt frame's own
  // "Tap again to resume" copy describes.
  paused: 'Resume recording',
};

export type VoiceInputProps = {
  state?: VoiceInputState;
  /** Accessible name. Defaults to a label matching the current state. */
  label?: string;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'disabled'>;

export function VoiceInput({ state = 'idle', label, className, type = 'button', ...rest }: VoiceInputProps) {
  return (
    <button
      type={type}
      className={[styles.root, styles[state], className].filter(Boolean).join(' ')}
      data-state={state}
      disabled={state === 'disabled'}
      aria-label={label ?? DEFAULT_LABEL[state]}
      {...rest}
    >
      {state === 'listening' ? (
        <MicButtonCoreIcon />
      ) : state === 'paused' ? (
        <PauseIcon />
      ) : (
        <span className={styles.innerCircle}>
          <MicIcon />
        </span>
      )}
    </button>
  );
}
