import type { ButtonHTMLAttributes, ReactNode } from 'react';
import Image from 'next/image';

import styles from './Avatar.module.css';
import defaultAvatar from '../../../public/images/mascot-avatar.png';

export type AvatarProps = {
  /**
   * The photo/illustration slot — swapped per instance, same pattern as
   * Card's illustration slot. Defaults to public/images/mascot-avatar.png
   * (the app's own shipped avatar art) rather than Figma's "Avatar" fill
   * (node 15974:6897), which resolves to what looks like an internal
   * documentation screenshot, not real avatar art.
   */
  children?: ReactNode;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'>;

export function Avatar({ children, className, type = 'button', ...rest }: AvatarProps) {
  return (
    <button type={type} className={[styles.root, className].filter(Boolean).join(' ')} {...rest}>
      {children ?? <Image src={defaultAvatar} alt="" />}
    </button>
  );
}
