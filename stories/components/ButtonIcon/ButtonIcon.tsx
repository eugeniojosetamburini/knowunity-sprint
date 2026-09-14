import type { ButtonHTMLAttributes, ReactNode } from 'react';

import styles from './ButtonIcon.module.css';
import { LoadingIcon } from '../Button/LoadingIcon';

export type ButtonIconVariant = 'primary' | 'secondary' | 'tertiary' | 'brand';
export type ButtonIconSize = 'xs' | 's' | 'm' | 'l';
export type ButtonIconState = 'default' | 'pressed' | 'disabled' | 'loading';

const SPINNER_SIZE: Record<ButtonIconSize, number> = {
  xs: 16,
  s: 16,
  m: 16,
  l: 24,
};

export type ButtonIconProps = {
  /**
   * The icon to show. A swap-in `iconSlot`, not a fixed glyph — confirm the
   * icon exists in the icon library before assuming it does. Hidden while
   * state="loading".
   */
  icon: ReactNode;
  /**
   * Required: this control has no visible label, so it needs an accessible
   * name (e.g. "Close", "Back", "Add topic").
   */
  'aria-label': string;
  variant?: ButtonIconVariant;
  size?: ButtonIconSize;
  /**
   * Forces a specific visual state, matching the Figma component's own
   * variants exactly (this is a design-system component, not a live
   * :hover/:active simulation). "pressed" is provided for design QA and
   * documentation; real pointer interaction still gets native :active from
   * the browser on top of whichever state is passed.
   */
  state?: ButtonIconState;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'disabled'>;

export function ButtonIcon({
  icon,
  variant = 'primary',
  size = 's',
  state = 'default',
  className,
  type = 'button',
  ...rest
}: ButtonIconProps) {
  const isInert = state === 'disabled' || state === 'loading';

  return (
    <button
      type={type}
      className={[styles.root, className].filter(Boolean).join(' ')}
      data-state={state}
      disabled={isInert}
      aria-busy={state === 'loading'}
      {...rest}
    >
      <span className={[styles.circle, styles[variant], styles[size]].join(' ')} data-state={state}>
        <span className={[styles.iconSlot, styles[size]].join(' ')}>
          {state === 'loading' ? <LoadingIcon size={SPINNER_SIZE[size]} /> : icon}
        </span>
      </span>
    </button>
  );
}
