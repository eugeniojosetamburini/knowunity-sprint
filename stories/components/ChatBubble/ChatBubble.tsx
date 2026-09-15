import type { HTMLAttributes } from 'react';

import styles from './ChatBubble.module.css';
import { CorrectIcon, IncorrectIcon } from './icons';

export type ChatBubbleState = 'default' | 'correct' | 'incorrect' | 'partial';

export type ChatBubbleProps = {
  state?: ChatBubbleState;
  /** Shown when state="default". Independent from correctText/incorrectText/partialText — switching state never overwrites another state's text. */
  neutralText?: string;
  /** Shown when state="correct". */
  correctText?: string;
  /** Shown when state="incorrect". */
  incorrectText?: string;
  /** Shown when state="partial". */
  partialText?: string;
} & Omit<HTMLAttributes<HTMLDivElement>, 'children'>;

const LABEL_TEXT: Record<Exclude<ChatBubbleState, 'default'>, string> = {
  correct: 'Correct!',
  incorrect: 'Incorrect',
  partial: 'Almost!',
};

export function ChatBubble({
  state = 'default',
  neutralText = "Tell me what you remember in your own words — I'll nudge you if you get stuck.",
  correctText = 'Humanism means this and that, maybe a little more detail here.',
  incorrectText = 'Not quite, humanism means this and that, but not what you said, and some detail here.',
  partialText = 'You got this and that right, but something else is missing. Would you like me to share a hint?',
  className,
  ...rest
}: ChatBubbleProps) {
  const text =
    state === 'correct' ? correctText : state === 'incorrect' ? incorrectText : state === 'partial' ? partialText : neutralText;

  return (
    <div className={[styles.root, className].filter(Boolean).join(' ')} {...rest}>
      <span className={[styles.tail, styles[state]].join(' ')} aria-hidden="true" />
      <div className={[styles.bubble, styles[state]].join(' ')}>
        {state !== 'default' && (
          <div className={styles.label}>
            {state === 'correct' && <CorrectIcon />}
            {state === 'incorrect' && <IncorrectIcon />}
            <span className={[styles.labelText, styles[state]].join(' ')}>{LABEL_TEXT[state]}</span>
          </div>
        )}
        <p className={[styles.body, styles[state]].join(' ')}>{text}</p>
      </div>
    </div>
  );
}
