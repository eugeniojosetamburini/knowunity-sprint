import type { ButtonHTMLAttributes } from 'react';
import Image from 'next/image';

import styles from './Badge.module.css';
import { CheckCircleIcon } from './CheckCircleIcon';
import { StreakIcon } from './StreakIcon';
import { FireIcon } from './FireIcon';
import proMark from '../../../public/images/pro-mark.png';

export type BadgeVariant = 'recall' | 'streak' | 'fire' | 'pro';

const DEFAULT_COUNT: Record<Exclude<BadgeVariant, 'pro'>, string> = {
  recall: '5+',
  streak: '2',
  fire: '3',
};

// Fallback accessible name for when the badge has no visible text of its
// own to name the button by — pro's mark is a decorative wordmark image,
// and showCount=false leaves every variant down to an icon with nothing
// for a screen reader to read. Overridable via aria-label.
const DEFAULT_LABEL: Record<BadgeVariant, string> = {
  recall: 'Due for review',
  streak: 'Streak',
  fire: 'Fire',
  pro: 'Pro',
};

export type BadgeProps = {
  variant?: BadgeVariant;
  /** The due-count text. Ignored while showCount is false, and by variant="pro" (no count). */
  count?: string;
  /** false hides the count text, leaving just the mark. No effect on variant="pro". */
  showCount?: boolean;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'>;

export function Badge({
  variant = 'recall',
  count,
  showCount = true,
  className,
  type = 'button',
  'aria-label': ariaLabel,
  ...rest
}: BadgeProps) {
  if (variant === 'pro') {
    return (
      <button
        type={type}
        className={[styles.root, styles.pro, className].filter(Boolean).join(' ')}
        aria-label={ariaLabel ?? DEFAULT_LABEL.pro}
        {...rest}
      >
        <Image src={proMark} alt="" className={styles.proMark} />
      </button>
    );
  }

  const resolvedCount = count ?? DEFAULT_COUNT[variant];

  return (
    <button
      type={type}
      className={[styles.root, styles[variant], className].filter(Boolean).join(' ')}
      aria-label={ariaLabel ?? (showCount ? undefined : DEFAULT_LABEL[variant])}
      {...rest}
    >
      {variant === 'recall' && <span className={styles.iconSlot} aria-hidden="true" />}
      <span className={styles.mark} aria-hidden="true">
        {variant === 'recall' && <CheckCircleIcon />}
        {variant === 'streak' && <StreakIcon />}
        {variant === 'fire' && <FireIcon />}
      </span>
      {showCount && <span className={styles.count}>{resolvedCount}</span>}
    </button>
  );
}
