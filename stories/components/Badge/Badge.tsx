import type { HTMLAttributes } from 'react';

import styles from './Badge.module.css';
import { CheckCircleIcon } from './CheckCircleIcon';
import { StreakIcon } from './StreakIcon';
import { FireIcon } from './FireIcon';
import { ProMark } from './ProMark';

export type BadgeVariant = 'recall' | 'streak' | 'fire' | 'pro';

const DEFAULT_COUNT: Record<Exclude<BadgeVariant, 'pro'>, string> = {
  recall: '5+',
  streak: '2',
  fire: '3',
};

export type BadgeProps = {
  variant?: BadgeVariant;
  /** The due-count text. Ignored while showCount is false, and by variant="pro" (no count). */
  count?: string;
  /** false hides the count text, leaving just the mark. No effect on variant="pro". */
  showCount?: boolean;
} & Omit<HTMLAttributes<HTMLDivElement>, 'children'>;

export function Badge({ variant = 'recall', count, showCount = true, className, ...rest }: BadgeProps) {
  if (variant === 'pro') {
    return (
      <div className={[styles.root, styles.pro, className].filter(Boolean).join(' ')} role="status" {...rest}>
        <ProMark />
      </div>
    );
  }

  const resolvedCount = count ?? DEFAULT_COUNT[variant];

  return (
    <div className={[styles.root, styles[variant], className].filter(Boolean).join(' ')} role="status" {...rest}>
      {variant === 'recall' && <span className={styles.iconSlot} aria-hidden="true" />}
      <span className={styles.mark} aria-hidden="true">
        {variant === 'recall' && <CheckCircleIcon />}
        {variant === 'streak' && <StreakIcon />}
        {variant === 'fire' && <FireIcon />}
      </span>
      {showCount && <span className={styles.count}>{resolvedCount}</span>}
    </div>
  );
}
