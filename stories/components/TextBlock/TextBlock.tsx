import type { HTMLAttributes } from 'react';

import styles from './TextBlock.module.css';

// TextBlock — a title with an optional caption beneath it, in four sizes.
// Figma component set `textBlock` (node 9003:9039), built exactly as drawn.
//
// **Read this before using it — the name is wrong in Figma, not here.**
// The component's own Figma description calls it a "Generic text *input*
// field", and docs/design-system.md repeats that ("an editable input, not
// a text-display container"). The drawn component is neither: all four
// variants are a bold title over a muted caption, with no field, border,
// placeholder or any other typing affordance. It is a display block.
//
// Settled 2026-09-15 with the user: this component is built as the artwork
// actually is, and the thing the docs were *describing* — a real typeable
// field, which the text fallback (SPEC.md #14) needs — is a separate
// component, `TextField`. Two honest components instead of one misnamed
// one. docs/design-system.md and CLAUDE.md were corrected to match; the
// Figma component's name and description still want fixing at source.
//
// So: use this for a title/caption pair. If the student is meant to type
// into it, you want `TextField`.

export type TextBlockVariant = 'XL' | 'L' | 'M' | 'S';

export type TextBlockProps = {
  variant?: TextBlockVariant;
  /** The title line. */
  title?: string;
  /** The supporting line under the title. Hidden while showCaption is false. */
  caption?: string;
  /** false drops the caption, leaving the title alone. */
  showCaption?: boolean;
} & Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'title'>;

export function TextBlock({
  variant = 'XL',
  title = 'Header',
  caption = 'Caption',
  showCaption = true,
  className,
  ...rest
}: TextBlockProps) {
  return (
    <div className={[styles.root, styles[`size${variant}`], className].filter(Boolean).join(' ')} {...rest}>
      <p className={styles.title}>{title}</p>
      {showCaption && <p className={styles.caption}>{caption}</p>}
    </div>
  );
}
