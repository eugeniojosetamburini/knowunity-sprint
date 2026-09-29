'use client';

import { useEffect, useRef, type HTMLAttributes, type ReactNode } from 'react';

import styles from './BottomSheet.module.css';

// BottomSheet — design-system.md's **slot 5**: the modal sheet and its
// scrim. The exit-session confirm (SPEC.md #15) is its first consumer.
//
// **Not `ActionSheet`.** design-system.md is explicit that these are two
// different components with different jobs, and warns against bending one
// into the other:
//
//   ActionSheet  slot 4. A persistent footer. Never dims what's behind it,
//                never dismissed, its handle decorative.
//   BottomSheet  slot 5. Interrupts the student, dims the screen behind
//                it, and is dismissed — by the scrim, by Escape, or by an
//                action inside it.
//
// **No Figma frame or component exists for this**, so the composition is
// read off design-system.md's description of the slot rather than traced.
// Two things it says had to be interpreted, and both are flagged here
// rather than buried:
//
// 1. *"Collapsed to a sliver by default."* Taken as describing the Figma
//    slot's resting appearance on a canvas, not a runtime state — a
//    confirm dialog that peeked permanently above every screen would be
//    wrong, and nothing in the flow calls for a draggable sliver. So this
//    renders nothing at all while closed, and `open` drives it.
// 2. *"The dimming background is already wired to appear once a sheet's
//    content is placed in the slot."* Taken as: the scrim belongs to this
//    component, not to the caller. It is drawn here, and the same sentence
//    warns "don't hand-build a separate overlay for it."
//
// The surface itself deliberately reuses `ActionSheet`'s measured geometry
// (32px top radius, 32/24 padding, the drag handle, effect.elevation.sheet)
// — those came off real frames, and a modal sheet that didn't match the
// footer sheet's shape would look like a different system.
//
// Dismissal is `onDismiss`, which fires on scrim tap and on Escape. A
// sheet with no `onDismiss` can only be closed by an action inside it —
// which is a real choice for a destructive confirm, but never leaves the
// student stuck, since the confirm carries its own cancel.

export type BottomSheetProps = {
  /** Whether the sheet is shown. Closed renders nothing at all. */
  open: boolean;
  /**
   * Called on scrim tap and on Escape. Omit only for a sheet that must be
   * answered by one of its own actions — the student still always has a
   * way out, via that sheet's own cancel.
   */
  onDismiss?: () => void;
  /** The sheet's content: usually a TextBlock and a ButtonGroup. */
  children: ReactNode;
  /**
   * Accessible name for the dialog. Say what is being asked, e.g. "End
   * session?" — a screen reader announces this when the sheet opens.
   */
  'aria-label'?: string;
} & Omit<HTMLAttributes<HTMLDivElement>, 'children'>;

// Everything that can take focus inside the sheet. Kept as one list so the
// trap and any future consumer agree on what counts.
const FOCUSABLE =
  'a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])';

export function BottomSheet({
  open,
  onDismiss,
  children,
  className,
  'aria-label': ariaLabel,
  ...rest
}: BottomSheetProps) {
  const surfaceRef = useRef<HTMLDivElement>(null);

  // Escape dismisses, matching the scrim. Bound only while open, so a
  // closed sheet never swallows the key from anything else on the screen.
  useEffect(() => {
    if (!open || !onDismiss) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onDismiss();
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open, onDismiss]);

  // Move focus into the sheet when it opens: it's a modal, so leaving
  // focus behind on the screen underneath would let a keyboard or screen
  // reader user keep operating the thing the sheet is interrupting.
  useEffect(() => {
    if (open) surfaceRef.current?.focus();
  }, [open]);

  // ...and keep it there. Moving focus in is only half of aria-modal:
  // without this, Tab past the last button walked straight back out into
  // the screen the sheet is dimming (the back arrow, ⋯ and Skip were all
  // still reachable), so a keyboard or screen-reader user could operate
  // the thing being interrupted while the confirm was still up. Added
  // 2026-09-21. Escape and the sheet's own actions are still the ways out,
  // so this traps focus, never the student.
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;

      const surface = surfaceRef.current;
      if (!surface) return;

      const focusable = [...surface.querySelectorAll<HTMLElement>(FOCUSABLE)].filter(
        (el) => !el.hasAttribute('disabled') && el.tabIndex !== -1,
      );
      if (focusable.length === 0) {
        // Nothing to land on: hold focus on the surface itself rather than
        // letting Tab escape to the screen underneath.
        event.preventDefault();
        surface.focus();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && (active === first || active === surface)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);

  if (!open) return null;

  return (
    <div className={[styles.root, className].filter(Boolean).join(' ')} {...rest}>
      {/* Decorative: the sheet is already dismissible by Escape and by its
          own actions, so exposing the scrim as a second button would just
          add a nameless control to the tab order. */}
      <div className={styles.scrim} onClick={onDismiss} aria-hidden="true" />
      <div
        ref={surfaceRef}
        className={styles.surface}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        tabIndex={-1}
      >
        <span className={styles.handle} aria-hidden="true" />
        {children}
      </div>
    </div>
  );
}
