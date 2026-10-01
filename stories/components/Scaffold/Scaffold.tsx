'use client';

import { motion, useReducedMotion } from 'motion/react';
import type { HTMLAttributes, ReactNode } from 'react';

import tokens from '../../../tokens/tokens.json';
import styles from './Scaffold.module.css';

/*
 * Screen entrance — content fades in and rises a short way, so a navigation
 * reads as arriving rather than as a hard swap. Only <main> moves: the bars
 * and the bottom nav are the frame and must not shift between routes.
 * motion.js needs numbers, so these come from tokens.json by path rather
 * than from the generated CSS variables. There is no semantic token for
 * screen transitions (semantic.motion has press / stateChange / breathe
 * only), so the primitives are read directly here — flagged in
 * component-gaps.md. Enter only: motion.easing.in's note says most exits in
 * this app are instant navigations.
 */
const { duration, easing } = tokens.primitive.motion;
const ENTER_OFFSET = tokens.primitive.size.space['200'].$value.value;
const ENTER_TRANSITION = { duration: duration.slow.$value / 1000, ease: easing.out.$value as [number, number, number, number] };

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
  // Reduced motion keeps the fade (a state change the student can still see) and drops the travel.
  const reduceMotion = useReducedMotion();

  return (
    <div className={[styles.screen, className].filter(Boolean).join(' ')} {...rest}>
      <div className={styles.frame}>
        {topBar && <header className={styles.topBar}>{topBar}</header>}
        <motion.main
          className={styles.main}
          initial={{ opacity: 0, y: reduceMotion ? 0 : ENTER_OFFSET }}
          animate={{ opacity: 1, y: 0 }}
          transition={ENTER_TRANSITION}
        >
          {children}
        </motion.main>
        {bottomNav && (
          <div className={[styles.bottomNav, bottomNavFlush && styles.flush].filter(Boolean).join(' ')}>{bottomNav}</div>
        )}
      </div>
    </div>
  );
}
