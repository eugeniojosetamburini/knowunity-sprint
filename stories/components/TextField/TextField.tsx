'use client';

import type { ChangeEvent, InputHTMLAttributes, TextareaHTMLAttributes } from 'react';

import styles from './TextField.module.css';

// TextField — a field the student types into.
//
// **No Figma component backs this one.** It is the thing
// docs/design-system.md and CLAUDE.md were describing when they said
// `textBlock` was "an editable input, not a text-display container" — but
// Figma's actual `textBlock` (node 9003:9039) is a title/caption display
// pair with no field, border or placeholder anywhere in it. The docs
// described a component that was never drawn.
//
// Settled 2026-09-15 with the user: rather than bend the drawn component
// into an input or leave the text fallback blocked, the two are separate
// and honestly named — `TextBlock` is the display pair Figma draws, and
// this is the input the docs meant. docs/design-system.md and CLAUDE.md
// were corrected to match.
//
// Because nothing is drawn, **every visual decision here is composed from
// tokens rather than traced**, and each one is named in the CSS:
// background.surface, border.default (whose own token description is
// "resting input borders"), border.focus for the ring, text.disabled for
// the placeholder (its description: "empty-field placeholders"), and
// radius.400 to match the surfaces it sits among. Nothing invented, but
// nothing measured either — it will want checking against a real frame if
// one is ever drawn.
//
// Its first consumer is the text fallback (SPEC.md #14), where the student
// types an answer instead of speaking it. That is a sentence or two, so
// `multiline` exists and the fallback uses it; single-line is the default
// for the "course name" sort of field design-system.md mentions.

export type TextFieldProps = {
  /** The current text. Controlled — pass `onValueChange` with it. */
  value?: string;
  /** Called with the new text on every keystroke. */
  onValueChange?: (value: string) => void;
  /** Shown while the field is empty. Sentence case, like every other label. */
  placeholder?: string;
  /**
   * Renders a <textarea> instead of an <input>, for answers longer than a
   * few words. The text fallback uses this; a short field shouldn't.
   */
  multiline?: boolean;
  /** Visible rows while multiline. Ignored otherwise. */
  rows?: number;
  /**
   * Accessible name. Required in practice — the field has no visible label
   * of its own, so without this a screen reader announces nothing useful.
   */
  'aria-label'?: string;
  disabled?: boolean;
} & Omit<
  InputHTMLAttributes<HTMLInputElement> & TextareaHTMLAttributes<HTMLTextAreaElement>,
  'value' | 'onChange' | 'rows' | 'children'
>;

export function TextField({
  value,
  onValueChange,
  placeholder,
  multiline = false,
  rows = 3,
  disabled = false,
  className,
  ...rest
}: TextFieldProps) {
  const shared = {
    className: [styles.field, multiline ? styles.multiline : styles.singleLine, className]
      .filter(Boolean)
      .join(' '),
    value,
    placeholder,
    disabled,
    onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      onValueChange?.(event.target.value),
  };

  if (multiline) {
    return <textarea {...shared} rows={rows} {...rest} />;
  }

  return <input type="text" {...shared} {...rest} />;
}
