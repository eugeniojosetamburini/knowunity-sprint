import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { TextBlock } from './TextBlock';

const DESCRIPTION =
  "A title with an optional caption beneath it, in four sizes — Figma component set `textBlock` (node 9003:9039), built exactly as drawn. IMPORTANT: Figma's own description calls this a \"Generic text input field\", and docs/design-system.md repeated that, but the drawn component has no field, border, placeholder or typing affordance of any kind — all four variants are a bold title over a muted caption. It is a display block. Settled 2026-09-15: this is built as the artwork is, and the typeable field the docs were describing is a separate component, `TextField`. USE: a title/caption pair at any of the four scales. DON'T: reach for this when the student is meant to type — that's `TextField` — and don't use it for Knowie's dialogue, which is `ChatBubble`. The Figma component's name and description still want fixing at source.";

const meta = {
  title: 'Components/TextBlock',
  component: TextBlock,
  tags: ['autodocs'],
  parameters: { docs: { description: { component: DESCRIPTION } } },
} satisfies Meta<typeof TextBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const VariantXL: Story = {
  name: 'variant=XL',
  parameters: {
    docs: {
      description: {
        story: 'Title at typography.display.m (76/76 bold), caption at typography.headline.xs.regular (18/20), 4px apart.',
      },
    },
  },
  args: { variant: 'XL', title: 'Header', caption: 'Caption' },
};

export const VariantL: Story = {
  name: 'variant=L',
  parameters: {
    docs: {
      description: {
        story: 'Title at typography.headline.xl (44/44 bold), same caption style as XL.',
      },
    },
  },
  args: { variant: 'L', title: 'Header', caption: 'Caption' },
};

export const VariantM: Story = {
  name: 'variant=M',
  parameters: {
    docs: {
      description: {
        story: 'Title at typography.body.m.bold (18/24), caption at typography.caption.m.regular (12/16). The gap tightens to 2px at M and S.',
      },
    },
  },
  args: { variant: 'M', title: 'Header', caption: 'Caption' },
};

export const VariantS: Story = {
  name: 'variant=S',
  parameters: {
    docs: {
      description: {
        story: 'Title at typography.body.s.bold (15/20), caption at typography.caption.s.regular (9/12) — the smallest type in the system.',
      },
    },
  },
  args: { variant: 'S', title: 'Header', caption: 'Caption' },
};

export const NoCaption: Story = {
  name: 'showCaption=false',
  parameters: {
    docs: {
      description: {
        story: 'The caption drops out and the title stands alone. Figma exposes this as a boolean on every variant.',
      },
    },
  },
  args: { variant: 'L', title: 'Header', showCaption: false },
};
