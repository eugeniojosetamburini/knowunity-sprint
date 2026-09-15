'use client';

import type { HTMLAttributes } from 'react';
import { useRouter } from 'next/navigation';

import styles from './AppBar.module.css';
import { ButtonIcon } from '../ButtonIcon/ButtonIcon';
import { ProgressIndicator, type ProgressIndicatorProgress } from '../ProgressIndicator/ProgressIndicator';
import { ArrowLeftIcon, MoreHorizontalIcon } from './icons';

// AppBar — the flow-screen top bar: a back arrow, the session's progress
// bar, and the ⋯ menu (design-system.md, "a top bar with one left icon and
// up to two elements on the right"). Every Voice Review Screen uses it:
// Entry/recap, prompt, processing and every result screen.
//
// Purpose-built rather than a generic three-slot container, following
// `TopNav`: the bar's composition is identical on every screen it appears
// on, and only the back destination and the progress value change. That is
// what keeps four screens from drifting apart, which is exactly what
// happened while this was inlined per-screen.
//
// Note on the design-system wording: the bar is a left icon, a *centre*
// progress bar and a right icon, which its "up to two elements on the
// right" description doesn't quite capture. The built bar follows the
// frames; the doc's phrasing is what's imprecise. Flagged, not resolved
// either way.
//
// Goes in Scaffold's topBar slot, which already provides the <header>, so
// this renders a plain <div> and owns only its own padding.

export type AppBarProps = {
  /** Where the back arrow goes. */
  backHref?: string;
  /** Accessible name for the back arrow — say where it goes, not "back". */
  backLabel?: string;
  /**
   * The session progress, as a term-level value (see progressForTerm in
   * app/due-terms.ts). Omit it on a screen that has a bar but no progress,
   * e.g. the Summary (SPEC.md #10) — the bar then centres nothing and the
   * two icons keep their positions.
   */
  progress?: ProgressIndicatorProgress;
  /**
   * The ⋯ menu (SPEC.md #16) isn't built, so this is unset everywhere and
   * the button is a real but inert tap target. Wiring the menu means
   * passing a handler here, not adding a button to each screen.
   */
  onMore?: () => void;
} & Omit<HTMLAttributes<HTMLDivElement>, 'children'>;

export function AppBar({
  backHref = '/due-list',
  backLabel = 'Back to due list',
  progress,
  onMore,
  className,
  ...rest
}: AppBarProps) {
  const router = useRouter();

  return (
    <div className={[styles.root, className].filter(Boolean).join(' ')} {...rest}>
      <ButtonIcon
        variant="tertiary"
        size="s"
        icon={<ArrowLeftIcon />}
        aria-label={backLabel}
        onClick={() => router.push(backHref)}
      />
      <div className={styles.progress}>
        {progress && (
          <ProgressIndicator
            variant="primary"
            thickness="24"
            progress={progress}
            aria-label="Review session progress"
          />
        )}
      </div>
      <ButtonIcon
        variant="tertiary"
        size="s"
        icon={<MoreHorizontalIcon />}
        aria-label="More options"
        onClick={onMore}
      />
    </div>
  );
}
