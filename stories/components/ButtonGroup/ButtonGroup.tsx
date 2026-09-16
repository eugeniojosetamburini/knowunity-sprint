'use client';

import type { HTMLAttributes, ReactNode } from 'react';

import styles from './ButtonGroup.module.css';
import { Button } from '../Button/Button';
import { ButtonIcon } from '../ButtonIcon/ButtonIcon';

// ButtonGroup — exactly two actions, from the Figma component set
// `buttonGroup` (node 9003:8455). Its own description: "Exactly two
// buttons, Vertical or Horizontal, M or L. Confirmed use: this is what
// fills a bottom sheet's action slot, holding two buttons and nothing
// else." That is why it exists here: `BottomSheet` needs it.
//
// The two variants are *not* the same pair rotated, which the name
// suggests and the description doesn't say:
//
//   vertical    two full-width buttons stacked, primary above secondary.
//   horizontal  an icon button on the left, one primary button filling
//               the rest of the row.
//
// So `horizontal` is icon + action, not two labelled buttons. Built as
// drawn, and flagged in docs/design-system.md rather than smoothed over —
// "exactly two buttons" reads as if the variants are interchangeable.
//
// Composed from the real `Button` and `ButtonIcon`, exactly as the Figma
// set is (its own children are `button` and `buttonIcon` instances). This
// component owns only the row/column and its gap; nothing about a pill is
// restated here, so the buttons can't drift from their own component.
//
// Roles are props rather than children, unlike `ActionSheet`, which takes
// free children because its frames put an arbitrary row in it. Children
// here would let a caller put three things into a component whose entire
// definition is "exactly two".
//
// One Primary per screen still applies (CLAUDE.md): both variants draw
// exactly one primary, the other action being secondary or an icon.
//
// **`tone="destructive"` added 2026-09-15**, for the exit-session confirm
// (SPEC.md #15). The Figma set has no destructive variant, but
// design-system.md is explicit that abandon/cancel/delete actions use the
// Destructive variant and that it is never paired with a Primary — and a
// sheet asking "end this session?" is exactly that. So the leading action
// can render Destructive instead of Primary; the other stays Secondary, so
// the pairing rule holds either way. Additive: nothing that existed used
// it, and the default is unchanged. The Figma set wants the variant adding
// at source.
//
// **Flagged:** at size M, Figma's buttonGroup draws its secondary with
// `interactive.secondary` and `interactive.onSecondary`, where the
// standalone `button` component (and this, which uses it) draws
// `background.surface` + `text.primary`. At size L the two agree. Using
// the real Button is the right call — forking it for one size would put
// two different secondaries in the system — but the Figma set and the
// Figma button component disagree with each other at M, at source.

export type ButtonGroupVariant = 'vertical' | 'horizontal';
export type ButtonGroupSize = 'm' | 'l';
export type ButtonGroupTone = 'default' | 'destructive';

export type ButtonGroupProps = {
  variant?: ButtonGroupVariant;
  size?: ButtonGroupSize;
  /**
   * Whether the leading action is the Primary (default) or the Destructive
   * — for abandon/cancel/delete moments, per design-system.md. Destructive
   * is never paired with a Primary, and isn't here: the other action stays
   * Secondary in both tones.
   */
  tone?: ButtonGroupTone;
  /** The leading action's label. The group's only Primary (or Destructive — see `tone`). */
  primaryLabel: string;
  onPrimary?: () => void;
  /**
   * The secondary action's label. `vertical` only — `horizontal` draws an
   * icon button in this slot instead.
   */
  secondaryLabel?: string;
  onSecondary?: () => void;
  /** The icon button's glyph. `horizontal` only. */
  icon?: ReactNode;
  /** Accessible name for the icon button — say what it does, not "icon". */
  iconLabel?: string;
  onIcon?: () => void;
} & Omit<HTMLAttributes<HTMLDivElement>, 'children'>;

export function ButtonGroup({
  variant = 'vertical',
  size = 'm',
  tone = 'default',
  primaryLabel,
  onPrimary,
  secondaryLabel,
  onSecondary,
  icon,
  iconLabel,
  onIcon,
  className,
  ...rest
}: ButtonGroupProps) {
  return (
    <div
      className={[styles.root, styles[variant], styles[`size-${size}`], className].filter(Boolean).join(' ')}
      {...rest}
    >
      {/* Both `icon` and `iconLabel` are required to render the icon button:
          ButtonIcon makes its accessible name mandatory, and an icon-only
          control with no name is unusable by a screen reader. No label, no
          button — rather than a placeholder name that says nothing. */}
      {variant === 'horizontal' && icon && iconLabel && (
        <div className={styles.iconSlot}>
          <ButtonIcon variant="secondary" size={size} icon={icon} aria-label={iconLabel} onClick={onIcon} />
        </div>
      )}

      <Button variant={tone === 'destructive' ? 'destructive' : 'primary'} size={size} onClick={onPrimary}>
        {primaryLabel}
      </Button>

      {variant === 'vertical' && secondaryLabel && (
        <Button variant="secondary" size={size} onClick={onSecondary}>
          {secondaryLabel}
        </Button>
      )}
    </div>
  );
}
