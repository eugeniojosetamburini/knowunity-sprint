import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';

import Home from './page';

const meta = {
  component: Home,
  tags: ['ai-generated'],
} satisfies Meta<typeof Home>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    // Due-count text is computed from dueTerms.length, not hardcoded — proves the list actually rendered.
    await expect(canvas.getByText('4 terms are ready to review')).toBeVisible();
  },
};

export const CssCheck: Story = {
  play: async ({ canvas }) => {
    const card = canvas.getByRole('button', { name: /mitochondria/i });
    // .card uses background.surface (#22242f) — fails if tokens.css/globals.css didn't load.
    await expect(getComputedStyle(card).backgroundColor).toBe('rgb(34, 36, 47)');
  },
};
