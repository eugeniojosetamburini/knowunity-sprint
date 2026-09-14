import type { HTMLAttributes } from 'react';

import styles from './ResultCard.module.css';

export type ResultCardProps = {
  /** The headline stat, e.g. "50%". Free text, not computed from the counts below — the brief calls for a plain-language readout, not just a pass count. */
  percentage?: string;
  /** Supporting text next to the percentage. */
  subtitle?: string;
  /** Number of terms explained unaided. Drives both the segmented bar and its legend row. */
  correctCount?: number;
  /** Number of terms that needed a hint. */
  partialCount?: number;
  /** Number of terms revealed or skipped. */
  incorrectCount?: number;
  /** The written summary paragraph below the legend. */
  summary?: string;
} & Omit<HTMLAttributes<HTMLDivElement>, 'children'>;

export function ResultCard({
  percentage = '50%',
  subtitle = 'Something here',
  correctCount = 2,
  partialCount = 1,
  incorrectCount = 1,
  summary = 'A quick three line review of how the student did this time around.',
  className,
  ...rest
}: ResultCardProps) {
  return (
    <div className={[styles.root, className].filter(Boolean).join(' ')} {...rest}>
      <div className={styles.header}>
        <p className={styles.percentage}>{percentage}</p>
        <p className={styles.subtitle}>{subtitle}</p>
      </div>
      <div className={styles.bar} role="img" aria-label={`${correctCount} correct, ${partialCount} partial, ${incorrectCount} incorrect`}>
        <span className={styles.segmentCorrect} style={{ flexGrow: correctCount, flexBasis: '0%' }} />
        <span className={styles.segmentPartial} style={{ flexGrow: partialCount, flexBasis: '0%' }} />
        <span className={styles.segmentIncorrect} style={{ flexGrow: incorrectCount, flexBasis: '0%' }} />
      </div>
      <div className={styles.legend}>
        <span className={styles.legendItem}>
          <span className={styles.dotCorrect} />
          <span className={styles.legendText}>{correctCount} right</span>
        </span>
        <span className={styles.legendItem}>
          <span className={styles.dotPartial} />
          <span className={styles.legendText}>{partialCount} partial</span>
        </span>
        <span className={styles.legendItem}>
          <span className={styles.dotIncorrect} />
          <span className={styles.legendText}>{incorrectCount} incorrect</span>
        </span>
      </div>
      <p className={styles.summary}>{summary}</p>
    </div>
  );
}
