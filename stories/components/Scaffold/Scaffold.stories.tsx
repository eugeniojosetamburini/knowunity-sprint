import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Scaffold } from './Scaffold';
import { TopNav } from '../TopNav/TopNav';
import { BottomNav } from '../BottomNav/BottomNav';

const DESCRIPTION =
  "The screen shell every screen builds inside (design-system.md, \"Scaffold composition\"). Owns the 390px frame, its centering, the page background, and the sticky bottom-nav slot — the parts that must be identical on every route so nothing shifts when navigating. USE: wrap every route in app/ in this; pass the bar into topBar and the tab bar into bottomNav. DON'T: hand-roll .screen/.frame in a page's own CSS module, and don't put padding on the shell — each bar and each screen's content own their own.";

const sampleContent = (
  <p
    style={{
      margin: 0,
      padding: 'var(--size-space-400)',
      color: 'var(--color-text-primary)',
      fontFamily: 'var(--typography-body-m-regular-fontFamily)',
      fontSize: 'var(--typography-body-m-regular-fontSize)',
      lineHeight: 'var(--typography-body-m-regular-lineHeight)',
    }}
  >
    Screen content goes here.
  </p>
);

const meta = {
  title: 'Components/Scaffold',
  component: Scaffold,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    // The home-level story renders TopNav, which uses the app router.
    nextjs: { appDirectory: true },
    docs: { description: { component: DESCRIPTION } },
  },
} satisfies Meta<typeof Scaffold>;

export default meta;
type Story = StoryObj<typeof meta>;

export const HomeLevel: Story = {
  name: 'Home-level (TopNav + BottomNav)',
  parameters: { docs: { description: { story: DESCRIPTION } } },
  args: {
    topBar: <TopNav dueCount="4" />,
    bottomNav: <BottomNav />,
    children: sampleContent,
  },
};

export const ContentOnly: Story = {
  name: 'Content only (no bars)',
  parameters: {
    docs: { description: { story: 'Both slots are optional — a flow screen passes its own progress/back row as topBar and usually no bottomNav.' } },
  },
  args: { children: sampleContent },
};
