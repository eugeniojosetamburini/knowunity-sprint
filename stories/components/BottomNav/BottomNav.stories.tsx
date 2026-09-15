import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';

import { BottomNav } from './BottomNav';

const DESCRIPTION =
  'The home-screen tab bar: four icon-only nav destinations (myai-chat, search-md, target-04, trophy-02) plus a profile avatar. search-md/target-04/trophy-02 are always drawn muted — a fixed per-icon color, not a toggleable state. myai-chat is different: Figma\'s component set exposes a real `chatActive` boolean variant (default true) that swaps it between opaque/emphasized and the same muted color as the other three — re-confirmed directly against both variant frames. No Figma description exists on this component. Per design-system.md\'s Scaffold composition, this is the bottom nav slot\'s "tab bar (home-level screens)" mode. USE: the persistent home-level navigation bar. DON\'T: use this for a flow screen\'s primary action button(s) — that\'s the same slot\'s other mode, a different component.';

const meta = {
  title: 'Components/BottomNav',
  component: BottomNav,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: DESCRIPTION,
      },
    },
  },
  args: {
    onSelectChat: fn(),
    onSelectSearch: fn(),
    onSelectTarget: fn(),
    onSelectTrophy: fn(),
    onSelectAvatar: fn(),
  },
} satisfies Meta<typeof BottomNav>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: { docs: { description: { story: DESCRIPTION } } },
};

export const ChatInactive: Story = {
  args: { chatActive: false },
  parameters: {
    docs: {
      description: {
        story: 'myai-chat with `chatActive: false` — matches the muted color of the other three tabs, per Figma\'s 15986:6958 variant frame.',
      },
    },
  },
};
