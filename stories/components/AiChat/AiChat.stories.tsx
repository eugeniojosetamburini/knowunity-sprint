import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';

import { AiChat } from './AiChat';

const DESCRIPTION =
  'A home-screen composer bar: a "+" button that starts a new chat (a real buttonIcon instance — variant="secondary", size="l" — reused, not rebuilt) paired with a pill showing a placeholder prompt and a decorative mic glyph. No Figma description exists on this component. USE: the entry point into the voice-recall flow from the home screen. DON\'T: treat the mic glyph as its own tap target — in Figma it\'s a plain icon inside the pill, not a separate buttonIcon instance, so the whole pill is one button.';

const meta = {
  title: 'Components/AiChat',
  component: AiChat,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: DESCRIPTION,
      },
    },
  },
  args: {
    onNewChat: fn(),
    onOpenChat: fn(),
  },
} satisfies Meta<typeof AiChat>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: { docs: { description: { story: DESCRIPTION } } },
  args: {
    label: 'Ask anything',
  },
};
