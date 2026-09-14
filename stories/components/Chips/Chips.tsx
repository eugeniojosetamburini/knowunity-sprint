import type { ButtonHTMLAttributes } from 'react';

import styles from './Chips.module.css';

export type ChipsSize = 'XXS' | 'XS' | 'S' | 'M';
export type ChipsColor = 'primary' | 'pro' | 'brand';

export type ChipsProps = {
  size?: ChipsSize;
  color?: ChipsColor;
  /** Selected state. Only visually meaningful for color="primary" — pro/brand have one look per size, matching Figma. */
  active?: boolean;
  /** The chip's label. Title Case per design-system.md's naming convention for this component's main editable content. */
  Text?: string;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'>;

export function Chips({
  size = 'XXS',
  color = 'primary',
  active = false,
  Text = '1/2 words',
  className,
  type = 'button',
  ...rest
}: ChipsProps) {
  const isActivePrimary = color === 'primary' && active;

  return (
    <button
      type={type}
      className={[styles.root, styles[size], styles[color], isActivePrimary ? styles.active : ''].filter(Boolean).join(' ')}
      aria-pressed={color === 'primary' ? active : undefined}
      {...rest}
    >
      <span className={styles.label}>{Text}</span>
    </button>
  );
}
