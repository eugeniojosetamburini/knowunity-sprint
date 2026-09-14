import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { VoiceInput } from './VoiceInput';

const DESCRIPTION =
  "The tap target that starts and shows the state of voice capture. USE: the tap target that starts and shows the state of voice capture. DON'T: rely on the glow color alone to convey Listening — mascot status already has to survive with motion and color stripped out, and this affordance carries the same requirement. Idle: not recording, waiting for a tap. Disabled: Knowie is processing; nothing should register as a tap while in this state. Listening: actively capturing the student's answer; carries a waveform mark, not a mic icon, in its center.";

const meta = {
  title: 'Components/VoiceInput',
  component: VoiceInput,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: DESCRIPTION,
      },
    },
  },
  argTypes: {
    state: { control: 'select', options: ['idle', 'disabled', 'listening'] },
  },
} satisfies Meta<typeof VoiceInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const StateIdle: Story = {
  name: 'state=Idle',
  parameters: { docs: { description: { story: DESCRIPTION } } },
  args: {
    state: 'idle',
  },
};

export const StateDisabled: Story = {
  name: 'state=Disabled',
  parameters: { docs: { description: { story: DESCRIPTION } } },
  args: {
    state: 'disabled',
  },
};

export const StateListening: Story = {
  name: 'state=Listening',
  parameters: { docs: { description: { story: DESCRIPTION } } },
  args: {
    state: 'listening',
  },
};
