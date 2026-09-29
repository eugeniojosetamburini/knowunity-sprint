import type { ButtonHTMLAttributes } from 'react';

import styles from './TextLink.module.css';

export type TextLinkProps = {
  /**
   * Give the tap padding back to the layout, so the link occupies exactly
   * the box its text does. For a link whose position is traced from a
   * frame — the voice screens' "Type instead" / "Use voice instead", which
   * sit on a measured row inside the 259px trigger zone — the 44pt tap
   * area must not push anything around it. Off by default: in normal flow
   * the taller box is the right answer.
   */
  flush?: boolean;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & { children: React.ReactNode };

/**
 * The underlined text link — "Type instead", "Use voice instead", "Choose
 * your own topics", "Change review time".
 *
 * Promoted to a component 2026-09-21. It had been hand-drawn in five page
 * CSS modules under four class names (`nextLink` twice, `voiceLink`,
 * `chooseOwnLink`, `drillDownLink`), which is what component-gaps.md's own
 * "a gap hit by a second screen gets promoted" rule exists to stop. The
 * five copies had already drifted into two different paddings, so the same
 * control had two different tap boxes depending on the screen.
 *
 * No Figma component or frame covers it; the type is `linkCondensed`,
 * which is the style every copy already used.
 */
export function TextLink({ flush = false, className, type = 'button', children, ...rest }: TextLinkProps) {
  return (
    <button
      type={type}
      className={[styles.root, flush ? styles.flush : '', className].filter(Boolean).join(' ')}
      {...rest}
    >
      {children}
    </button>
  );
}
