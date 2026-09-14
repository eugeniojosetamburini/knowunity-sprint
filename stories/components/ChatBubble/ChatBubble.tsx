import type { HTMLAttributes } from 'react';

import styles from './ChatBubble.module.css';
import { CorrectIcon, IncorrectIcon } from './icons';

export type ChatBubbleState = 'default' | 'correct' | 'incorrect';

export type ChatBubbleProps = {
  state?: ChatBubbleState;
  /** Shown when state="default". Independent from correctText/incorrectText — switching state never overwrites another state's text. */
  neutralText?: string;
  /** Shown when state="correct". */
  correctText?: string;
  /** Shown when state="incorrect". */
  incorrectText?: string;
} & Omit<HTMLAttributes<HTMLDivElement>, 'children'>;

export function ChatBubble({
  state = 'default',
  neutralText = "Tell me what you remember in your own words — I'll nudge you if you get stuck.",
  correctText = 'Humanism means this and that, maybe a little more detail here.',
  incorrectText = 'Not quite, humanism means this and that, but not what you said, and some detail here.',
  className,
  ...rest
}: ChatBubbleProps) {
  const text = state === 'correct' ? correctText : state === 'incorrect' ? incorrectText : neutralText;

  return (
    <div className={[styles.root, className].filter(Boolean).join(' ')} {...rest}>
      <span className={[styles.tail, styles[state]].join(' ')} aria-hidden="true" />
      <div className={[styles.bubble, styles[state]].join(' ')}>
        {state !== 'default' && (
          <div className={styles.label}>
            {state === 'correct' ? <CorrectIcon /> : <IncorrectIcon />}
            <span className={[styles.labelText, styles[state]].join(' ')}>
              {state === 'correct' ? 'Correct!' : 'Incorrect'}
            </span>
          </div>
        )}
        <p className={[styles.body, styles[state]].join(' ')}>{text}</p>
      </div>
    </div>
  );
}
