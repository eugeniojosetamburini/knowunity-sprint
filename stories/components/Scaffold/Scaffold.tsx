import type { HTMLAttributes, ReactNode } from 'react';

import styles from './Scaffold.module.css';

export type ScaffoldProps = {
  /** Slot – Top navigation. A TopNav, or a screen's own progress/back row. It owns its own padding. */
  topBar?: ReactNode;
  /** Slot – Content. Rendered inside <main>, which fills the frame between the two bars. */
  children: ReactNode;
  /** Slot – Bottom nav. Sticky to the viewport bottom so it sits in the same place on every route. */
  bottomNav?: ReactNode;
  /**
   * Renders the bottom-nav slot flush: no side padding, no bottom padding
   * and no page background, so the slot's child can run edge to edge.
   * For design-system.md slot 4's second form — "the primary action
   * button(s) for a flow screen", drawn in the voice frames as a full-bleed
   * action sheet. Defaults to false, the tab-bar treatment used by the
   * home-level screens.
   */
  bottomNavFlush?: boolean;
} & Omit<HTMLAttributes<HTMLDivElement>, 'children'>;

export function Scaffold({ topBar, children, bottomNav, bottomNavFlush = false, className, ...rest }: ScaffoldProps) {
  return (
    <div className={[styles.screen, className].filter(Boolean).join(' ')} {...rest}>
      <div className={styles.frame}>
        {topBar && <header className={styles.topBar}>{topBar}</header>}
        <main className={styles.main}>{children}</main>
        {bottomNav && (
          <div className={[styles.bottomNav, bottomNavFlush && styles.flush].filter(Boolean).join(' ')}>{bottomNav}</div>
        )}
      </div>
    </div>
  );
}
