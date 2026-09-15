import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { ActionSheet } from './ActionSheet';
import { Button } from '../Button/Button';

const DESCRIPTION =
  "The sheet pinned to the bottom of a flow screen, carrying that screen's footer actions (the voice result frames' \"Bottom Sheet\"). USE: in Scaffold's bottom-nav slot with bottomNavFlush, which pins it to the frame's bottom and lets it run edge to edge; put the screen's buttons in it as children and they share the row equally. DON'T: mistake it for design-system.md's slot 5 — that is the modal, scrimmed sheet the exit-session confirm needs. This one is a persistent footer that never dims the screen behind it and is never dismissed; its handle is drawn because the frames draw it, not because it drags.";

const meta = {
  title: 'Components/ActionSheet',
  component: ActionSheet,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: { description: { component: DESCRIPTION } },
  },
} satisfies Meta<typeof ActionSheet>;

export default meta;
type Story = StoryObj<typeof meta>;

export const RetryAndContinue: Story = {
  name: 'Retry + Continue (the result screens)',
  parameters: { docs: { description: { story: DESCRIPTION } } },
  args: {
    children: (
      <>
        <Button variant="secondary" size="l">
          Retry
        </Button>
        <Button variant="primary" size="l">
          Continue
        </Button>
      </>
    ),
  },
};

export const SingleAction: Story = {
  name: 'One action',
  parameters: {
    docs: {
      description: {
        story: 'A single child fills the row. One Primary per screen still applies — the sheet does not change that rule.',
      },
    },
  },
  args: {
    children: (
      <Button variant="primary" size="l">
        Continue
      </Button>
    ),
  },
};
