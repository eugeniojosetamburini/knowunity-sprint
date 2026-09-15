import Image, { type StaticImageData } from 'next/image';
import type { HTMLAttributes } from 'react';

import styles from './Mascot.module.css';
import standby from '../../../public/images/mascot-standby.png';
import excited from '../../../public/images/mascot-excited.png';
import confused from '../../../public/images/mascot-confused.png';
import thinking from '../../../public/images/mascot-thinking.png';

export type MascotState = 'standby' | 'excited' | 'confused' | 'thinking';

export type MascotProps = {
  state?: MascotState;
} & Omit<HTMLAttributes<HTMLDivElement>, 'children'>;

const IMAGE: Record<MascotState, StaticImageData> = {
  standby,
  excited,
  confused,
  thinking,
};

export function Mascot({ state = 'standby', className, ...rest }: MascotProps) {
  return (
    <div className={[styles.root, className].filter(Boolean).join(' ')} {...rest}>
      <Image src={IMAGE[state]} alt="" fill sizes="70px" className={styles.image} />
    </div>
  );
}
