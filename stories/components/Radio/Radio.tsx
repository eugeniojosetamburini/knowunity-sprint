import type { ButtonHTMLAttributes } from 'react';

import styles from './Radio.module.css';
import { CheckCircleIcon, CircleIcon } from './icons';

export type RadioState = 'default' | 'easy' | 'medium' | 'difficult';

const DEFAULT_CONTENT: Record<RadioState, { title: string; subtitle: string }> = {
  default: { title: 'Easy', subtitle: 'Review in 1 week' },
  easy: { title: 'Easy', subtitle: 'Review in 1 week' },
  medium: { title: 'Medium', subtitle: 'Review in 2 days' },
  difficult: { title: 'Difficult', subtitle: 'Review tomorrow' },
};

const CHECK_FILL: Record<'easy' | 'medium' | 'difficult', string> = {
  easy: 'var(--color-feedback-success-bold)',
  medium: 'var(--color-accent-coral-onBold)',
  difficult: 'var(--color-feedback-error-onBold)',
};

export type RadioProps = {
  state?: RadioState;
  /** Grade name shown as the headline word. Defaults to the copy shown for the current state in Figma. */
  title?: string;
  /** Supporting review-interval copy. Defaults to the copy shown for the current state in Figma. */
  subtitle?: string;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'title'>;

export function Radio({ state = 'default', title, subtitle, className, type = 'button', ...rest }: RadioProps) {
  const content = DEFAULT_CONTENT[state];
  const resolvedTitle = title ?? content.title;
  const resolvedSubtitle = subtitle ?? content.subtitle;

  return (
    <button
      type={type}
      className={[styles.root, styles[state], className].filter(Boolean).join(' ')}
      data-state={state}
      role="radio"
      aria-checked={state !== 'default'}
      {...rest}
    >
      <span className={styles.text}>
        <span className={styles.title}>{resolvedTitle}</span>
        <span className={styles.subtitle}>{resolvedSubtitle}</span>
      </span>
      <span className={styles.icon}>
        {state === 'default' ? <CircleIcon /> : <CheckCircleIcon fill={CHECK_FILL[state]} />}
      </span>
    </button>
  );
}
