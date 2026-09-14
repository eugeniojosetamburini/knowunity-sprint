import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Chips } from './Chips';

const DESCRIPTION =
  "USE: removable tags, tool pills, multi-select report options, recap terms. DON'T: use for navigation, or to open menus or give options. Use buttons for that instead. Naming note: Figma names the unselected `primary` look \"color=secondary\" at size XXS but \"color=Primary\" at XS/S/M — the same visual role, just inconsistently cased. Normalized here to `color=\"primary\"` plus an `active` boolean.";

const BRAND_NOTE =
  ' `brand` is scoped to recap/topic tagging specifically (design-system.md) — never reuse it as a general-emphasis color.' +
  ' Known issue (kept, matching Figma): this color pairing fails WCAG AA contrast (~4.09:1 vs the required 4.5:1) at every size.';

const meta = {
  title: 'Components/Chips',
  component: Chips,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: DESCRIPTION,
      },
    },
  },
  argTypes: {
    size: { control: 'select', options: ['XXS', 'XS', 'S', 'M'] },
    color: { control: 'select', options: ['primary', 'pro', 'brand'] },
    active: { control: 'boolean' },
  },
} satisfies Meta<typeof Chips>;

export default meta;
type Story = StoryObj<typeof meta>;

export const XxsSecondary: Story = {
  name: 'size=XXS, color=secondary',
  parameters: { docs: { description: { story: DESCRIPTION } } },
  args: { size: 'XXS', color: 'primary', active: false, Text: '1/2 words' },
};

export const XxsPrimary: Story = {
  name: 'size=XXS, color=primary',
  parameters: { docs: { description: { story: DESCRIPTION } } },
  args: { size: 'XXS', color: 'primary', active: true, Text: '1/2 words' },
};

export const XxsPro: Story = {
  name: 'size=XXS, color=pro',
  parameters: { docs: { description: { story: DESCRIPTION } } },
  args: { size: 'XXS', color: 'pro', Text: '1/2 words' },
};

export const XxsBrand: Story = {
  name: 'size=XXS, color=brand',
  parameters: { docs: { description: { story: DESCRIPTION + BRAND_NOTE } } },
  args: { size: 'XXS', color: 'brand', Text: '1/2 words' },
};

export const XsPrimaryCaps: Story = {
  name: 'size=XS, color=Primary',
  parameters: { docs: { description: { story: DESCRIPTION } } },
  args: { size: 'XS', color: 'primary', active: false, Text: '1/2 words' },
};

export const XsPrimary: Story = {
  name: 'size=XS, color=primary',
  parameters: { docs: { description: { story: DESCRIPTION } } },
  args: { size: 'XS', color: 'primary', active: true, Text: '1/2 words' },
};

export const XsPro: Story = {
  name: 'size=XS, color=pro',
  parameters: { docs: { description: { story: DESCRIPTION } } },
  args: { size: 'XS', color: 'pro', Text: '1/2 words' },
};

export const XsBrand: Story = {
  name: 'size=XS, color=brand',
  parameters: { docs: { description: { story: DESCRIPTION + BRAND_NOTE } } },
  args: { size: 'XS', color: 'brand', Text: '1/2 words' },
};

export const SPrimaryCaps: Story = {
  name: 'size=S, color=Primary',
  parameters: { docs: { description: { story: DESCRIPTION } } },
  args: { size: 'S', color: 'primary', active: false, Text: '1/2 words' },
};

export const SPrimary: Story = {
  name: 'size=S, color=primary',
  parameters: { docs: { description: { story: DESCRIPTION } } },
  args: { size: 'S', color: 'primary', active: true, Text: '1/2 words' },
};

export const SPro: Story = {
  name: 'size=S, color=pro',
  parameters: { docs: { description: { story: DESCRIPTION } } },
  args: { size: 'S', color: 'pro', Text: '1/2 words' },
};

export const SBrand: Story = {
  name: 'size=S, color=brand',
  parameters: { docs: { description: { story: DESCRIPTION + BRAND_NOTE } } },
  args: { size: 'S', color: 'brand', Text: '1/2 words' },
};

export const MPrimaryCaps: Story = {
  name: 'size=M, color=Primary',
  parameters: { docs: { description: { story: DESCRIPTION } } },
  args: { size: 'M', color: 'primary', active: false, Text: '1/2 words' },
};

export const MPrimary: Story = {
  name: 'size=M, color=primary',
  parameters: { docs: { description: { story: DESCRIPTION } } },
  args: { size: 'M', color: 'primary', active: true, Text: '1/2 words' },
};

export const MPro: Story = {
  name: 'size=M, color=pro',
  parameters: { docs: { description: { story: DESCRIPTION } } },
  args: { size: 'M', color: 'pro', Text: '1/2 words' },
};

export const MBrand: Story = {
  name: 'size=M, color=brand',
  parameters: { docs: { description: { story: DESCRIPTION + BRAND_NOTE } } },
  args: { size: 'M', color: 'brand', Text: '1/2 words' },
};
