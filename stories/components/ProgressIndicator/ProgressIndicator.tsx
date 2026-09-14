import type { CSSProperties, HTMLAttributes } from 'react';

import styles from './ProgressIndicator.module.css';

export type ProgressIndicatorVariant = 'primary' | 'coral';
export type ProgressIndicatorThickness = '16' | '24';
export type ProgressIndicatorProgress = '0' | '25' | '50' | '75' | '100';

export type ProgressIndicatorProps = {
  variant?: ProgressIndicatorVariant;
  thickness?: ProgressIndicatorThickness;
  progress?: ProgressIndicatorProgress;
  /** Renders a "n/total" label centered on the bar. No effect at thickness="16" (Figma has no text there). */
  showText?: boolean;
  /** The denominator for the showText label — defaults to 12, matching the Figma example instances. */
  total?: number;
  /** Required: describes what this bar is tracking (e.g. "Study session progress") — there's no visible label otherwise. */
  'aria-label': string;
} & Omit<HTMLAttributes<HTMLDivElement>, 'children'>;

export function ProgressIndicator({
  variant = 'primary',
  thickness = '24',
  progress = '0',
  showText = false,
  total = 12,
  className,
  style,
  ...rest
}: ProgressIndicatorProps) {
  const percent = Number(progress);
  const current = Math.round((percent / 100) * total);

  return (
    <div
      className={[styles.track, styles[`t${thickness}`], className].filter(Boolean).join(' ')}
      role="progressbar"
      aria-valuenow={percent}
      aria-valuemin={0}
      aria-valuemax={100}
      style={{ ...style, '--progress': `${percent}%` } as CSSProperties}
      {...rest}
    >
      <div className={[styles.fill, styles[`t${thickness}`], styles[variant]].join(' ')} />
      {thickness === '24' && showText && (
        <span className={[styles.label, percent > 50 ? styles.labelOnFill : ''].filter(Boolean).join(' ')}>
          {current}/{total}
        </span>
      )}
    </div>
  );
}
