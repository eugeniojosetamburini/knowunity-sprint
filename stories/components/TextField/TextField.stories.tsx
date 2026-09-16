import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { TextField } from './TextField';

const DESCRIPTION =
  "A field the student types into. NO FIGMA COMPONENT BACKS THIS ONE — it is the thing docs/design-system.md and CLAUDE.md were describing when they called `textBlock` \"an editable input\", but Figma's actual textBlock (node 9003:9039) is a title/caption display pair with no field anywhere in it. Settled 2026-09-15: the two are separate and honestly named, and the docs were corrected. USE: free-text entry outside the main chat box — the text fallback where a student types an answer instead of speaking it (SPEC.md #14), or a short \"tell us more\" field. DON'T: use it for anything read-only; that's TextBlock for a title/caption pair, or ChatBubble for Knowie's dialogue. Every value is composed from tokens whose own descriptions specify this use (border.default is \"resting input borders\", text.disabled is \"empty-field placeholders\") — nothing invented, but nothing measured either, since there is no frame to measure.";

const meta = {
  title: 'Components/TextField',
  component: TextField,
  tags: ['autodocs'],
  parameters: { docs: { description: { component: DESCRIPTION } } },
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  name: 'Empty, with placeholder',
  parameters: {
    docs: {
      description: {
        story:
          'The resting state. The placeholder uses text.disabled, the token specified for empty-field placeholders, and the edge uses border.default, specified for resting input borders.',
      },
    },
  },
  args: { placeholder: 'Type your answer', 'aria-label': 'Your answer' },
};

export const WithText: Story = {
  name: 'With text',
  parameters: { docs: { description: { story: 'Filled, at typography.body.m.regular in text.primary.' } } },
  args: { value: 'Humanism put human reason and the classics at the centre.', 'aria-label': 'Your answer' },
};

export const Multiline: Story = {
  name: 'multiline (the text fallback)',
  parameters: {
    docs: {
      description: {
        story:
          "How SPEC.md #14 uses it: a student's spoken answer is a sentence or two, so the fallback field is multiline and can be grown. A short field should leave multiline off.",
      },
    },
  },
  args: {
    multiline: true,
    rows: 3,
    placeholder: 'Type your answer',
    'aria-label': 'Your answer',
  },
};

export const Disabled: Story = {
  name: 'Disabled',
  parameters: {
    docs: {
      description: {
        story: 'Unavailable — for example while an answer is being judged. Uses interactive.disabled for the fill.',
      },
    },
  },
  args: { placeholder: 'Type your answer', disabled: true, 'aria-label': 'Your answer' },
};
