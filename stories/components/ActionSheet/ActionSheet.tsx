import type { HTMLAttributes, ReactNode } from 'react';

import styles from './ActionSheet.module.css';

// ActionSheet — the sheet pinned to the bottom of a flow screen, carrying
// that screen's footer actions (the voice result frames' "Bottom Sheet",
// e.g. 15783:7467 on Pass and 15783:7697 on Incorrect). A rounded-top
// surface with a drag handle and a row of buttons.
//
// Goes in Scaffold's bottom-nav slot with `bottomNavFlush`, which is what
// pins it to the frame's bottom and lets it run edge to edge
// (design-system.md slot 4, "the primary action button(s) for a flow
// screen"). This component owns only its appearance; the positioning stays
// in the shell so it can't differ between routes.
//
// NOT design-system.md's slot 5, which is the *modal, scrimmed* sheet the
// exit-session confirm needs (SPEC.md #15). This one is a persistent
// footer, never dims the screen behind it and is never dismissed. The
// handle is drawn because the frames draw it, not because the sheet drags.
//
// Flagged: `actionSheet` is not a component design-system.md names. It was
// inlined on the Pass result first and promoted here when Incorrect and
// Partial needed the identical sheet (component-gaps.md's rule). Worth
// adding to the design system, or folding into slot 5's definition.

export type ActionSheetProps = {
  /** The footer's buttons, laid out in one equal-width row. */
  children: ReactNode;
} & Omit<HTMLAttributes<HTMLDivElement>, 'children'>;

export function ActionSheet({ children, className, ...rest }: ActionSheetProps) {
  return (
    <div className={[styles.root, className].filter(Boolean).join(' ')} {...rest}>
      <span className={styles.handle} aria-hidden="true" />
      <div className={styles.actions}>{children}</div>
    </div>
  );
}
