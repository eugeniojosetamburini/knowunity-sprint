import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { BottomSheet } from './BottomSheet';
import { ButtonGroup } from '../ButtonGroup/ButtonGroup';
import { TextBlock } from '../TextBlock/TextBlock';

const DESCRIPTION =
  "design-system.md's slot 5: the modal sheet and its scrim. NOT ActionSheet — that is slot 4, a persistent footer that never dims what's behind it and is never dismissed. This one interrupts the student, dims the screen behind it, and is dismissed by the scrim, by Escape, or by an action inside it. USE: a moment that must be answered before the student continues — the exit-session confirm (SPEC.md #15) is its first consumer; put a TextBlock and a ButtonGroup in it. DON'T: hand-build a separate overlay for the dimming, which design-system.md warns against — the scrim belongs to this component. No Figma frame exists, so the composition is interpreted from that doc; the surface reuses ActionSheet's measured geometry so the two sheets read as one system.";

const meta = {
  title: 'Components/BottomSheet',
  component: BottomSheet,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: { description: { component: DESCRIPTION } },
  },
} satisfies Meta<typeof BottomSheet>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ExitSessionConfirm: Story = {
  name: 'Exit-session confirm (SPEC.md #15)',
  parameters: {
    docs: {
      description: {
        story:
          "Slot 5's reason for existing. A TextBlock states the question and its consequence, a vertical ButtonGroup answers it. The destructive action is the primary here because it is what the student asked for by opening the menu; cancel sits below it, so there is always a way back.",
      },
    },
  },
  args: {
    open: true,
    'aria-label': 'End session?',
    children: (
      <>
        <TextBlock variant="M" title="End session now?" caption="2 terms left. They stay due for next time." />
        <ButtonGroup variant="vertical" size="l" primaryLabel="End session" secondaryLabel="Keep going" />
      </>
    ),
  },
};

export const Closed: Story = {
  name: 'open=false',
  parameters: {
    docs: {
      description: {
        story:
          'Renders nothing at all. design-system.md describes slot 5 as "collapsed to a sliver by default", which is read as the Figma slot\'s resting look on a canvas rather than a runtime state — a confirm dialog peeking permanently above every screen would be wrong. Flagged in the component, not silently decided.',
      },
    },
  },
  args: {
    open: false,
    children: <TextBlock variant="M" title="End session now?" caption="2 terms left." />,
  },
};
