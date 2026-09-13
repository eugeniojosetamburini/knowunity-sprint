import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { RESPONSIVE_VIEWPORT_VALUE } from 'storybook/viewport';

import { Typography } from './Typography';

const meta = {
  title: 'Foundations/Typography',
  component: Typography,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  globals: {
    viewport: { value: RESPONSIVE_VIEWPORT_VALUE },
  },
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Scale: Story = {};
