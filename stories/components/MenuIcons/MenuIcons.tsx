/*
 * menuIcons — reuses `ButtonIcon` (variant="tertiary", size="m") rather
 * than a new component. Figma's own "menuIcons" instance is structurally
 * identical to buttonIcon — same "Button" layer, same circle/radius/emboss
 * pattern already documented in Badge.module.css and ButtonIcon.module.css
 * — just two new icon swaps (hamburger, clock) where the ButtonIcon stories
 * previously stood in with a placeholder SquareIcon under aria-label="Menu".
 * design-system.md's own buttonIcon entry already covers this: "An
 * icon-only tap (close, back, menu) → buttonIcon."
 *
 * Only `variant` (hamburger/clock — the icon choice) is exposed, matching
 * Figma's own single variant axis on this instance. ButtonIcon's ownstyle
 * `variant` is fixed to "tertiary" and `size` fixed to "m" — Figma's
 * menuIcons instance has no size axis of its own.
 *
 * Known gap against tokens/tokens.json — flagged, not silently invented:
 * this instance's real (unscaled) circle measures 40px, matching
 * ButtonIcon's "m" exactly, but its icon glyph is drawn at 24px
 * (icon.300) where "m"'s own iconSlot is sized to icon.250 (20px) — a
 * combination that doesn't match any of ButtonIcon's four existing
 * size/icon pairings (xs/s/m each pair 40|32|40 with 16|16|20, l pairs
 * 56 with 24). Shipped pixel-faithful to Figma's 24px glyph rather than
 * shrinking it to fit the existing 20px slot — same "ship pixel-faithful"
 * call already made for Chips' own contrast gap. The glyph overflows
 * iconSlot's flex box by ~2px per side as a result (iconSlot has no
 * overflow:hidden, so this is a visual overhang, not a clip).
 *
 * variant="clock"'s default aria-label ("Alarm") follows the only place
 * this glyph is named in the design system: appBar's own description
 * lists "alarm" as one of the home screen's five bar elements (hamburger /
 * PRO pill / XP / streak / alarm) that don't fit appBar's six layouts.
 */

import type { ReactNode } from 'react';

import { ButtonIcon, type ButtonIconProps } from '../ButtonIcon/ButtonIcon';
import { HamburgerIcon } from './HamburgerIcon';
import { ClockIcon } from './ClockIcon';

export type MenuIconsVariant = 'hamburger' | 'clock';

export type MenuIconsProps = {
  variant?: MenuIconsVariant;
  'aria-label'?: string;
} & Omit<ButtonIconProps, 'icon' | 'variant' | 'size' | 'aria-label'>;

const ICON: Record<MenuIconsVariant, ReactNode> = {
  hamburger: <HamburgerIcon />,
  clock: <ClockIcon />,
};

const DEFAULT_LABEL: Record<MenuIconsVariant, string> = {
  hamburger: 'Menu',
  clock: 'Alarm',
};

export function MenuIcons({ variant = 'hamburger', 'aria-label': ariaLabel, ...rest }: MenuIconsProps) {
  return (
    <ButtonIcon
      variant="tertiary"
      size="m"
      icon={ICON[variant]}
      aria-label={ariaLabel ?? DEFAULT_LABEL[variant]}
      {...rest}
    />
  );
}
