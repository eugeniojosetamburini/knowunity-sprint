import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Mascot } from './Mascot';

const DESCRIPTION =
  "Knowie's mascot illustration, showing the character's emotional state — standby, excited, confused, or thinking. USE: anywhere Knowie's reaction to the student needs a face, not just words — celebrating a correct answer, showing confusion at an off-base one, or thinking while processing. DON'T: rely on color or expression alone to carry meaning that isn't backed up elsewhere (in copy, in the chat bubble's own state) — this has to keep reading correctly even if someone can't perceive the illustration's subtler emotional cues.";

const meta = {
  title: 'Components/Mascot',
  component: Mascot,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: DESCRIPTION,
      },
    },
  },
  argTypes: {
    state: { control: 'select', options: ['standby', 'excited', 'confused', 'thinking'] },
  },
} satisfies Meta<typeof Mascot>;

export default meta;
type Story = StoryObj<typeof meta>;

export const StateStandby: Story = {
  name: 'state=standby',
  parameters: { docs: { description: { story: DESCRIPTION } } },
  args: {
    state: 'standby',
  },
};

export const StateExcited: Story = {
  name: 'state=excited',
  parameters: { docs: { description: { story: DESCRIPTION } } },
  args: {
    state: 'excited',
  },
};

export const StateConfused: Story = {
  name: 'state=confused',
  parameters: { docs: { description: { story: DESCRIPTION } } },
  args: {
    state: 'confused',
  },
};

export const StateThinking: Story = {
  name: 'state=thinking',
  parameters: { docs: { description: { story: DESCRIPTION } } },
  args: {
    state: 'thinking',
  },
};
