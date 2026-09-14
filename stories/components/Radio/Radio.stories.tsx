import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Radio } from './Radio';

const DESCRIPTION =
  "One choice in the post-answer recall-difficulty picker. USE: always shown as a full set, one row per grade, with one pre-selected. DON'T: ship an incomplete set — the spaced-repetition logic downstream needs a row for every grade it can receive.";

const meta = {
  title: 'Components/Radio',
  component: Radio,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: DESCRIPTION,
      },
    },
  },
  argTypes: {
    state: { control: 'select', options: ['default', 'easy', 'medium', 'difficult'] },
  },
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const StateDefault: Story = {
  name: 'state=Default',
  parameters: { docs: { description: { story: DESCRIPTION } } },
  args: {
    state: 'default',
  },
};

export const StateEasy: Story = {
  name: 'state=Easy',
  parameters: { docs: { description: { story: DESCRIPTION } } },
  args: {
    state: 'easy',
  },
};

export const StateMedium: Story = {
  name: 'state=Medium',
  parameters: { docs: { description: { story: DESCRIPTION } } },
  args: {
    state: 'medium',
  },
};

export const StateDifficult: Story = {
  name: 'state=Difficult',
  parameters: { docs: { description: { story: DESCRIPTION } } },
  args: {
    state: 'difficult',
  },
};
