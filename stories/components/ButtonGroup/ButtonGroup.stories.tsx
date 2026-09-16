import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { ButtonGroup } from './ButtonGroup';
import { PlusIcon } from '../ButtonIcon/PlusIcon';

const DESCRIPTION =
  "Exactly two actions — Figma component set `buttonGroup` (node 9003:8455). Its own description: \"Exactly two buttons, Vertical or Horizontal, M or L. Confirmed use: this is what fills a bottom sheet's action slot, holding two buttons and nothing else.\" USE: two-choice moments only, e.g. a bottom sheet's confirm/cancel pair. DON'T: reach for it the moment you need a third option — stacked `Button` instances are for that. Note the two variants are not the same pair rotated: `vertical` is two full-width buttons stacked, `horizontal` is an icon button plus one primary. Composed from the real Button and ButtonIcon, exactly as the Figma set is.";

const meta = {
  title: 'Components/ButtonGroup',
  component: ButtonGroup,
  tags: ['autodocs'],
  parameters: { docs: { description: { component: DESCRIPTION } } },
} satisfies Meta<typeof ButtonGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const VerticalL: Story = {
  name: 'variant=vertical, size=l',
  parameters: {
    docs: {
      description: {
        story:
          "Two full-width buttons stacked, primary above secondary, 8px apart. This is the exit-session confirm's pair (SPEC.md #15) and the shape a bottom sheet's action slot takes.",
      },
    },
  },
  args: {
    variant: 'vertical',
    size: 'l',
    primaryLabel: 'End session',
    secondaryLabel: 'Keep going',
  },
};

export const VerticalM: Story = {
  name: 'variant=vertical, size=m',
  parameters: {
    docs: {
      description: {
        story:
          'The same pair at size M, where the set draws a gap of 0 — the two pills genuinely touch. Built as drawn.',
      },
    },
  },
  args: {
    variant: 'vertical',
    size: 'm',
    primaryLabel: 'End session',
    secondaryLabel: 'Keep going',
  },
};

export const HorizontalL: Story = {
  name: 'variant=horizontal, size=l',
  parameters: {
    docs: {
      description: {
        story:
          'An icon button on the left and one primary filling the rest of the row — not two labelled buttons. The icon is a swap-in slot, so confirm the glyph you want exists in the icon library.',
      },
    },
  },
  args: {
    variant: 'horizontal',
    size: 'l',
    primaryLabel: 'Continue',
    icon: <PlusIcon />,
    iconLabel: 'Add a topic',
  },
};

export const HorizontalM: Story = {
  name: 'variant=horizontal, size=m',
  parameters: {
    docs: { description: { story: 'The horizontal pair at size M, where the gap tightens to 4px.' } },
  },
  args: {
    variant: 'horizontal',
    size: 'm',
    primaryLabel: 'Continue',
    icon: <PlusIcon />,
    iconLabel: 'Add a topic',
  },
};

export const DestructiveTone: Story = {
  name: 'tone=destructive (the exit confirm)',
  parameters: {
    docs: {
      description: {
        story:
          "For abandon/cancel/delete moments — the exit-session confirm (SPEC.md #15) is the one this was added for. The leading action renders Destructive instead of Primary; the other stays Secondary, so design-system.md's \"never pair Destructive with a Primary\" holds. The Figma set has no destructive variant and wants one adding at source.",
      },
    },
  },
  args: {
    variant: 'vertical',
    size: 'l',
    tone: 'destructive',
    primaryLabel: 'End session',
    secondaryLabel: 'Keep going',
  },
};
