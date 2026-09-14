import type { ButtonHTMLAttributes, ReactNode } from 'react';

import styles from './Button.module.css';
import { LoadingIcon } from './LoadingIcon';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'destructive';
export type ButtonSize = 's' | 'm' | 'l';
export type ButtonState = 'default' | 'pressed' | 'disabled' | 'loading';

const SPINNER_SIZE: Record<ButtonSize, number> = {
  s: 16,
  m: 20,
  l: 24,
};

export type ButtonProps = {
  /** The button's label. Hidden while state="loading". */
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  /**
   * Forces a specific visual state, matching the Figma component's own
   * variants exactly (this is a design-system component, not a live
   * :hover/:active simulation). "pressed" is provided for design QA and
   * documentation; real pointer interaction still gets native :active from
   * the browser on top of whichever state is passed.
   */
  state?: ButtonState;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'disabled'>;

export function Button({
  children,
  variant = 'primary',
  size = 's',
  state = 'default',
  className,
  type = 'button',
  ...rest
}: ButtonProps) {
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
      <span
        className={[styles.pill, styles[variant], styles[size]].join(' ')}
        data-state={state}
      >
        {state === 'loading' ? (
          <>
            <LoadingIcon size={SPINNER_SIZE[size]} />
            <span className={styles.visuallyHidden}>{children}</span>
          </>
        ) : (
          <span className={styles.label}>{children}</span>
        )}
      </span>
    </button>
  );
}
