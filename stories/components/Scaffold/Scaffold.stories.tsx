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

export const FlushBottomNav: Story = {
  name: 'bottomNavFlush (flow-screen action sheet)',
  parameters: {
    docs: {
      description: {
        story:
          "Slot 4's second form (design-system.md): \"the primary action button(s) for a flow screen\", drawn in the voice result frames as a full-bleed sheet. bottomNavFlush drops the tab bar's side padding, bottom padding and page background so the sheet reaches both frame edges and draws its own surface, radius and padding. The slot stays sticky either way.",
      },
    },
  },
  args: {
    bottomNavFlush: true,
    bottomNav: (
      <div
        style={{
          width: '100%',
          padding: 'var(--size-space-800) var(--size-space-600)',
          borderTop: 'var(--size-stroke-border) solid var(--color-border-default)',
          borderRadius: 'var(--size-radius-800) var(--size-radius-800) 0 0',
          background: 'var(--color-background-surface)',
          color: 'var(--color-text-primary)',
          textAlign: 'center',
          fontFamily: 'var(--typography-body-m-regular-fontFamily)',
          fontSize: 'var(--typography-body-m-regular-fontSize)',
        }}
      >
        Action sheet content
      </div>
    ),
    children: sampleContent,
  },
};
