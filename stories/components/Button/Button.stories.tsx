import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Button } from './Button';

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['primary', 'secondary', 'tertiary', 'destructive'] },
    size: { control: 'select', options: ['s', 'm', 'l'] },
    state: { control: 'select', options: ['default', 'pressed', 'disabled', 'loading'] },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PrimarySDefault: Story = {
  name: 'variant=primary, size=s, state=default',
  parameters: {
    docs: {
      description: {
        story: 'USE: one Primary per screen, in the bottom CTA slot. Secondary/Tertiary for everything else competing for attention on the same screen — never two Primaries side by side. Stacking multiple instances (e.g. MCQ options) is expected use, not a workaround. DON\'T: use the Loading state for the voice-processing wait. It reads as one undifferentiated "busy" state, but listening → processing → result need to read as three distinct states.',
      },
    },
  },
  args: {
    variant: 'primary',
    size: 's',
    state: 'default',
    children: 'Continue',
  },
};

export const PrimarySPressed: Story = {
  name: 'variant=primary, size=s, state=pressed',
  parameters: {
    docs: {
      description: {
        story: 'USE: one Primary per screen, in the bottom CTA slot. Secondary/Tertiary for everything else competing for attention on the same screen — never two Primaries side by side. Stacking multiple instances (e.g. MCQ options) is expected use, not a workaround. DON\'T: use the Loading state for the voice-processing wait. It reads as one undifferentiated "busy" state, but listening → processing → result need to read as three distinct states.',
      },
    },
  },
  args: {
    variant: 'primary',
    size: 's',
    state: 'pressed',
    children: 'Continue',
  },
};

export const PrimarySDisabled: Story = {
  name: 'variant=primary, size=s, state=disabled',
  parameters: {
    docs: {
      description: {
        story: 'USE: one Primary per screen, in the bottom CTA slot. Secondary/Tertiary for everything else competing for attention on the same screen — never two Primaries side by side. Stacking multiple instances (e.g. MCQ options) is expected use, not a workaround. DON\'T: use the Loading state for the voice-processing wait. It reads as one undifferentiated "busy" state, but listening → processing → result need to read as three distinct states.',
      },
    },
  },
  args: {
    variant: 'primary',
    size: 's',
    state: 'disabled',
    children: 'Continue',
  },
};

export const PrimarySLoading: Story = {
  name: 'variant=primary, size=s, state=loading',
  parameters: {
    docs: {
      description: {
        story: 'USE: one Primary per screen, in the bottom CTA slot. Secondary/Tertiary for everything else competing for attention on the same screen — never two Primaries side by side. Stacking multiple instances (e.g. MCQ options) is expected use, not a workaround. DON\'T: use the Loading state for the voice-processing wait. It reads as one undifferentiated "busy" state, but listening → processing → result need to read as three distinct states.',
      },
    },
  },
  args: {
    variant: 'primary',
    size: 's',
    state: 'loading',
    children: 'Continue',
  },
};

export const PrimaryMDefault: Story = {
  name: 'variant=primary, size=m, state=default',
  parameters: {
    docs: {
      description: {
        story: 'USE: one Primary per screen, in the bottom CTA slot. Secondary/Tertiary for everything else competing for attention on the same screen — never two Primaries side by side. Stacking multiple instances (e.g. MCQ options) is expected use, not a workaround. DON\'T: use the Loading state for the voice-processing wait. It reads as one undifferentiated "busy" state, but listening → processing → result need to read as three distinct states.',
      },
    },
  },
  args: {
    variant: 'primary',
    size: 'm',
    state: 'default',
    children: 'Continue',
  },
};

export const PrimaryMPressed: Story = {
  name: 'variant=primary, size=m, state=pressed',
  parameters: {
    docs: {
      description: {
        story: 'USE: one Primary per screen, in the bottom CTA slot. Secondary/Tertiary for everything else competing for attention on the same screen — never two Primaries side by side. Stacking multiple instances (e.g. MCQ options) is expected use, not a workaround. DON\'T: use the Loading state for the voice-processing wait. It reads as one undifferentiated "busy" state, but listening → processing → result need to read as three distinct states.',
      },
    },
  },
  args: {
    variant: 'primary',
    size: 'm',
    state: 'pressed',
    children: 'Continue',
  },
};

export const PrimaryMDisabled: Story = {
  name: 'variant=primary, size=m, state=disabled',
  parameters: {
    docs: {
      description: {
        story: 'USE: one Primary per screen, in the bottom CTA slot. Secondary/Tertiary for everything else competing for attention on the same screen — never two Primaries side by side. Stacking multiple instances (e.g. MCQ options) is expected use, not a workaround. DON\'T: use the Loading state for the voice-processing wait. It reads as one undifferentiated "busy" state, but listening → processing → result need to read as three distinct states.',
      },
    },
  },
  args: {
    variant: 'primary',
    size: 'm',
    state: 'disabled',
    children: 'Continue',
  },
};

export const PrimaryMLoading: Story = {
  name: 'variant=primary, size=m, state=loading',
  parameters: {
    docs: {
      description: {
        story: 'USE: one Primary per screen, in the bottom CTA slot. Secondary/Tertiary for everything else competing for attention on the same screen — never two Primaries side by side. Stacking multiple instances (e.g. MCQ options) is expected use, not a workaround. DON\'T: use the Loading state for the voice-processing wait. It reads as one undifferentiated "busy" state, but listening → processing → result need to read as three distinct states.',
      },
    },
  },
  args: {
    variant: 'primary',
    size: 'm',
    state: 'loading',
    children: 'Continue',
  },
};

export const PrimaryLDefault: Story = {
  name: 'variant=primary, size=l, state=default',
  parameters: {
    docs: {
      description: {
        story: 'USE: one Primary per screen, in the bottom CTA slot. Secondary/Tertiary for everything else competing for attention on the same screen — never two Primaries side by side. Stacking multiple instances (e.g. MCQ options) is expected use, not a workaround. DON\'T: use the Loading state for the voice-processing wait. It reads as one undifferentiated "busy" state, but listening → processing → result need to read as three distinct states.',
      },
    },
  },
  args: {
    variant: 'primary',
    size: 'l',
    state: 'default',
    children: 'Continue',
  },
};

export const PrimaryLPressed: Story = {
  name: 'variant=primary, size=l, state=pressed',
  parameters: {
    docs: {
      description: {
        story: 'USE: one Primary per screen, in the bottom CTA slot. Secondary/Tertiary for everything else competing for attention on the same screen — never two Primaries side by side. Stacking multiple instances (e.g. MCQ options) is expected use, not a workaround. DON\'T: use the Loading state for the voice-processing wait. It reads as one undifferentiated "busy" state, but listening → processing → result need to read as three distinct states.',
      },
    },
  },
  args: {
    variant: 'primary',
    size: 'l',
    state: 'pressed',
    children: 'Continue',
  },
};

export const PrimaryLDisabled: Story = {
  name: 'variant=primary, size=l, state=disabled',
  parameters: {
    docs: {
      description: {
        story: 'USE: one Primary per screen, in the bottom CTA slot. Secondary/Tertiary for everything else competing for attention on the same screen — never two Primaries side by side. Stacking multiple instances (e.g. MCQ options) is expected use, not a workaround. DON\'T: use the Loading state for the voice-processing wait. It reads as one undifferentiated "busy" state, but listening → processing → result need to read as three distinct states.',
      },
    },
  },
  args: {
    variant: 'primary',
    size: 'l',
    state: 'disabled',
    children: 'Continue',
  },
};

export const PrimaryLLoading: Story = {
  name: 'variant=primary, size=l, state=loading',
  parameters: {
    docs: {
      description: {
        story: 'USE: one Primary per screen, in the bottom CTA slot. Secondary/Tertiary for everything else competing for attention on the same screen — never two Primaries side by side. Stacking multiple instances (e.g. MCQ options) is expected use, not a workaround. DON\'T: use the Loading state for the voice-processing wait. It reads as one undifferentiated "busy" state, but listening → processing → result need to read as three distinct states.',
      },
    },
  },
  args: {
    variant: 'primary',
    size: 'l',
    state: 'loading',
    children: 'Continue',
  },
};

export const SecondarySDefault: Story = {
  name: 'variant=secondary, size=s, state=default',
  parameters: {
    docs: {
      description: {
        story: 'USE: one Primary per screen, in the bottom CTA slot. Secondary/Tertiary for everything else competing for attention on the same screen — never two Primaries side by side. Stacking multiple instances (e.g. MCQ options) is expected use, not a workaround. DON\'T: use the Loading state for the voice-processing wait. It reads as one undifferentiated "busy" state, but listening → processing → result need to read as three distinct states.',
      },
    },
  },
  args: {
    variant: 'secondary',
    size: 's',
    state: 'default',
    children: 'Skip',
  },
};

export const SecondarySPressed: Story = {
  name: 'variant=secondary, size=s, state=pressed',
  parameters: {
    docs: {
      description: {
        story: 'USE: one Primary per screen, in the bottom CTA slot. Secondary/Tertiary for everything else competing for attention on the same screen — never two Primaries side by side. Stacking multiple instances (e.g. MCQ options) is expected use, not a workaround. DON\'T: use the Loading state for the voice-processing wait. It reads as one undifferentiated "busy" state, but listening → processing → result need to read as three distinct states.',
      },
    },
  },
  args: {
    variant: 'secondary',
    size: 's',
    state: 'pressed',
    children: 'Skip',
  },
};

export const SecondarySDisabled: Story = {
  name: 'variant=secondary, size=s, state=disabled',
  parameters: {
    docs: {
      description: {
        story: 'USE: one Primary per screen, in the bottom CTA slot. Secondary/Tertiary for everything else competing for attention on the same screen — never two Primaries side by side. Stacking multiple instances (e.g. MCQ options) is expected use, not a workaround. DON\'T: use the Loading state for the voice-processing wait. It reads as one undifferentiated "busy" state, but listening → processing → result need to read as three distinct states.',
      },
    },
  },
  args: {
    variant: 'secondary',
    size: 's',
    state: 'disabled',
    children: 'Skip',
  },
};

export const SecondarySLoading: Story = {
  name: 'variant=secondary, size=s, state=loading',
  parameters: {
    docs: {
      description: {
        story: 'USE: one Primary per screen, in the bottom CTA slot. Secondary/Tertiary for everything else competing for attention on the same screen — never two Primaries side by side. Stacking multiple instances (e.g. MCQ options) is expected use, not a workaround. DON\'T: use the Loading state for the voice-processing wait. It reads as one undifferentiated "busy" state, but listening → processing → result need to read as three distinct states.',
      },
    },
  },
  args: {
    variant: 'secondary',
    size: 's',
    state: 'loading',
    children: 'Skip',
  },
};

export const SecondaryMDefault: Story = {
  name: 'variant=secondary, size=m, state=default',
  parameters: {
    docs: {
      description: {
        story: 'USE: one Primary per screen, in the bottom CTA slot. Secondary/Tertiary for everything else competing for attention on the same screen — never two Primaries side by side. Stacking multiple instances (e.g. MCQ options) is expected use, not a workaround. DON\'T: use the Loading state for the voice-processing wait. It reads as one undifferentiated "busy" state, but listening → processing → result need to read as three distinct states.',
      },
    },
  },
  args: {
    variant: 'secondary',
    size: 'm',
    state: 'default',
    children: 'Skip',
  },
};

export const SecondaryMPressed: Story = {
  name: 'variant=secondary, size=m, state=pressed',
  parameters: {
    docs: {
      description: {
        story: 'USE: one Primary per screen, in the bottom CTA slot. Secondary/Tertiary for everything else competing for attention on the same screen — never two Primaries side by side. Stacking multiple instances (e.g. MCQ options) is expected use, not a workaround. DON\'T: use the Loading state for the voice-processing wait. It reads as one undifferentiated "busy" state, but listening → processing → result need to read as three distinct states.',
      },
    },
  },
  args: {
    variant: 'secondary',
    size: 'm',
    state: 'pressed',
    children: 'Skip',
  },
};

export const SecondaryMDisabled: Story = {
  name: 'variant=secondary, size=m, state=disabled',
  parameters: {
    docs: {
      description: {
        story: 'USE: one Primary per screen, in the bottom CTA slot. Secondary/Tertiary for everything else competing for attention on the same screen — never two Primaries side by side. Stacking multiple instances (e.g. MCQ options) is expected use, not a workaround. DON\'T: use the Loading state for the voice-processing wait. It reads as one undifferentiated "busy" state, but listening → processing → result need to read as three distinct states.',
      },
    },
  },
  args: {
    variant: 'secondary',
    size: 'm',
    state: 'disabled',
    children: 'Skip',
  },
};

export const SecondaryMLoading: Story = {
  name: 'variant=secondary, size=m, state=loading',
  parameters: {
    docs: {
      description: {
        story: 'USE: one Primary per screen, in the bottom CTA slot. Secondary/Tertiary for everything else competing for attention on the same screen — never two Primaries side by side. Stacking multiple instances (e.g. MCQ options) is expected use, not a workaround. DON\'T: use the Loading state for the voice-processing wait. It reads as one undifferentiated "busy" state, but listening → processing → result need to read as three distinct states.',
      },
    },
  },
  args: {
    variant: 'secondary',
    size: 'm',
    state: 'loading',
    children: 'Skip',
  },
};

export const SecondaryLDefault: Story = {
  name: 'variant=secondary, size=l, state=default',
  parameters: {
    docs: {
      description: {
        story: 'USE: one Primary per screen, in the bottom CTA slot. Secondary/Tertiary for everything else competing for attention on the same screen — never two Primaries side by side. Stacking multiple instances (e.g. MCQ options) is expected use, not a workaround. DON\'T: use the Loading state for the voice-processing wait. It reads as one undifferentiated "busy" state, but listening → processing → result need to read as three distinct states.',
      },
    },
  },
  args: {
    variant: 'secondary',
    size: 'l',
    state: 'default',
    children: 'Skip',
  },
};

export const SecondaryLPressed: Story = {
  name: 'variant=secondary, size=l, state=pressed',
  parameters: {
    docs: {
      description: {
        story: 'USE: one Primary per screen, in the bottom CTA slot. Secondary/Tertiary for everything else competing for attention on the same screen — never two Primaries side by side. Stacking multiple instances (e.g. MCQ options) is expected use, not a workaround. DON\'T: use the Loading state for the voice-processing wait. It reads as one undifferentiated "busy" state, but listening → processing → result need to read as three distinct states.',
      },
    },
  },
  args: {
    variant: 'secondary',
    size: 'l',
    state: 'pressed',
    children: 'Skip',
  },
};

export const SecondaryLDisabled: Story = {
  name: 'variant=secondary, size=l, state=disabled',
  parameters: {
    docs: {
      description: {
        story: 'USE: one Primary per screen, in the bottom CTA slot. Secondary/Tertiary for everything else competing for attention on the same screen — never two Primaries side by side. Stacking multiple instances (e.g. MCQ options) is expected use, not a workaround. DON\'T: use the Loading state for the voice-processing wait. It reads as one undifferentiated "busy" state, but listening → processing → result need to read as three distinct states.',
      },
    },
  },
  args: {
    variant: 'secondary',
    size: 'l',
    state: 'disabled',
    children: 'Skip',
  },
};

export const SecondaryLLoading: Story = {
  name: 'variant=secondary, size=l, state=loading',
  parameters: {
    docs: {
      description: {
        story: 'USE: one Primary per screen, in the bottom CTA slot. Secondary/Tertiary for everything else competing for attention on the same screen — never two Primaries side by side. Stacking multiple instances (e.g. MCQ options) is expected use, not a workaround. DON\'T: use the Loading state for the voice-processing wait. It reads as one undifferentiated "busy" state, but listening → processing → result need to read as three distinct states.',
      },
    },
  },
  args: {
    variant: 'secondary',
    size: 'l',
    state: 'loading',
    children: 'Skip',
  },
};

export const TertiarySDefault: Story = {
  name: 'variant=tertiary, size=s, state=default',
  parameters: {
    docs: {
      description: {
        story: 'USE: one Primary per screen, in the bottom CTA slot. Secondary/Tertiary for everything else competing for attention on the same screen — never two Primaries side by side. Stacking multiple instances (e.g. MCQ options) is expected use, not a workaround. DON\'T: use the Loading state for the voice-processing wait. It reads as one undifferentiated "busy" state, but listening → processing → result need to read as three distinct states.',
      },
    },
  },
  args: {
    variant: 'tertiary',
    size: 's',
    state: 'default',
    children: 'Skip',
  },
};

export const TertiarySPressed: Story = {
  name: 'variant=tertiary, size=s, state=pressed',
  parameters: {
    docs: {
      description: {
        story: 'USE: one Primary per screen, in the bottom CTA slot. Secondary/Tertiary for everything else competing for attention on the same screen — never two Primaries side by side. Stacking multiple instances (e.g. MCQ options) is expected use, not a workaround. DON\'T: use the Loading state for the voice-processing wait. It reads as one undifferentiated "busy" state, but listening → processing → result need to read as three distinct states.',
      },
    },
  },
  args: {
    variant: 'tertiary',
    size: 's',
    state: 'pressed',
    children: 'Skip',
  },
};

export const TertiarySDisabled: Story = {
  name: 'variant=tertiary, size=s, state=disabled',
  parameters: {
    docs: {
      description: {
        story: 'USE: one Primary per screen, in the bottom CTA slot. Secondary/Tertiary for everything else competing for attention on the same screen — never two Primaries side by side. Stacking multiple instances (e.g. MCQ options) is expected use, not a workaround. DON\'T: use the Loading state for the voice-processing wait. It reads as one undifferentiated "busy" state, but listening → processing → result need to read as three distinct states.',
      },
    },
  },
  args: {
    variant: 'tertiary',
    size: 's',
    state: 'disabled',
    children: 'Skip',
  },
};

export const TertiarySLoading: Story = {
  name: 'variant=tertiary, size=s, state=loading',
  parameters: {
    docs: {
      description: {
        story: 'USE: one Primary per screen, in the bottom CTA slot. Secondary/Tertiary for everything else competing for attention on the same screen — never two Primaries side by side. Stacking multiple instances (e.g. MCQ options) is expected use, not a workaround. DON\'T: use the Loading state for the voice-processing wait. It reads as one undifferentiated "busy" state, but listening → processing → result need to read as three distinct states.',
      },
    },
  },
  args: {
    variant: 'tertiary',
    size: 's',
    state: 'loading',
    children: 'Skip',
  },
};

export const TertiaryMDefault: Story = {
  name: 'variant=tertiary, size=m, state=default',
  parameters: {
    docs: {
      description: {
        story: 'USE: one Primary per screen, in the bottom CTA slot. Secondary/Tertiary for everything else competing for attention on the same screen — never two Primaries side by side. Stacking multiple instances (e.g. MCQ options) is expected use, not a workaround. DON\'T: use the Loading state for the voice-processing wait. It reads as one undifferentiated "busy" state, but listening → processing → result need to read as three distinct states.',
      },
    },
  },
  args: {
    variant: 'tertiary',
    size: 'm',
    state: 'default',
    children: 'Skip',
  },
};

export const TertiaryMPressed: Story = {
  name: 'variant=tertiary, size=m, state=pressed',
  parameters: {
    docs: {
      description: {
        story: 'USE: one Primary per screen, in the bottom CTA slot. Secondary/Tertiary for everything else competing for attention on the same screen — never two Primaries side by side. Stacking multiple instances (e.g. MCQ options) is expected use, not a workaround. DON\'T: use the Loading state for the voice-processing wait. It reads as one undifferentiated "busy" state, but listening → processing → result need to read as three distinct states.',
      },
    },
  },
  args: {
    variant: 'tertiary',
    size: 'm',
    state: 'pressed',
    children: 'Skip',
  },
};

export const TertiaryMDisabled: Story = {
  name: 'variant=tertiary, size=m, state=disabled',
  parameters: {
    docs: {
      description: {
        story: 'USE: one Primary per screen, in the bottom CTA slot. Secondary/Tertiary for everything else competing for attention on the same screen — never two Primaries side by side. Stacking multiple instances (e.g. MCQ options) is expected use, not a workaround. DON\'T: use the Loading state for the voice-processing wait. It reads as one undifferentiated "busy" state, but listening → processing → result need to read as three distinct states.',
      },
    },
  },
  args: {
    variant: 'tertiary',
    size: 'm',
    state: 'disabled',
    children: 'Skip',
  },
};

export const TertiaryMLoading: Story = {
  name: 'variant=tertiary, size=m, state=loading',
  parameters: {
    docs: {
      description: {
        story: 'USE: one Primary per screen, in the bottom CTA slot. Secondary/Tertiary for everything else competing for attention on the same screen — never two Primaries side by side. Stacking multiple instances (e.g. MCQ options) is expected use, not a workaround. DON\'T: use the Loading state for the voice-processing wait. It reads as one undifferentiated "busy" state, but listening → processing → result need to read as three distinct states.',
      },
    },
  },
  args: {
    variant: 'tertiary',
    size: 'm',
    state: 'loading',
    children: 'Skip',
  },
};

export const TertiaryLDefault: Story = {
  name: 'variant=tertiary, size=l, state=default',
  parameters: {
    docs: {
      description: {
        story: 'USE: one Primary per screen, in the bottom CTA slot. Secondary/Tertiary for everything else competing for attention on the same screen — never two Primaries side by side. Stacking multiple instances (e.g. MCQ options) is expected use, not a workaround. DON\'T: use the Loading state for the voice-processing wait. It reads as one undifferentiated "busy" state, but listening → processing → result need to read as three distinct states.',
      },
    },
  },
  args: {
    variant: 'tertiary',
    size: 'l',
    state: 'default',
    children: 'Skip',
  },
};

export const TertiaryLPressed: Story = {
  name: 'variant=tertiary, size=l, state=pressed',
  parameters: {
    docs: {
      description: {
        story: 'USE: one Primary per screen, in the bottom CTA slot. Secondary/Tertiary for everything else competing for attention on the same screen — never two Primaries side by side. Stacking multiple instances (e.g. MCQ options) is expected use, not a workaround. DON\'T: use the Loading state for the voice-processing wait. It reads as one undifferentiated "busy" state, but listening → processing → result need to read as three distinct states.',
      },
    },
  },
  args: {
    variant: 'tertiary',
    size: 'l',
    state: 'pressed',
    children: 'Skip',
  },
};

export const TertiaryLDisabled: Story = {
  name: 'variant=tertiary, size=l, state=disabled',
  parameters: {
    docs: {
      description: {
        story: 'USE: one Primary per screen, in the bottom CTA slot. Secondary/Tertiary for everything else competing for attention on the same screen — never two Primaries side by side. Stacking multiple instances (e.g. MCQ options) is expected use, not a workaround. DON\'T: use the Loading state for the voice-processing wait. It reads as one undifferentiated "busy" state, but listening → processing → result need to read as three distinct states.',
      },
    },
  },
  args: {
    variant: 'tertiary',
    size: 'l',
    state: 'disabled',
    children: 'Skip',
  },
};

export const TertiaryLLoading: Story = {
  name: 'variant=tertiary, size=l, state=loading',
  parameters: {
    docs: {
      description: {
        story: 'USE: one Primary per screen, in the bottom CTA slot. Secondary/Tertiary for everything else competing for attention on the same screen — never two Primaries side by side. Stacking multiple instances (e.g. MCQ options) is expected use, not a workaround. DON\'T: use the Loading state for the voice-processing wait. It reads as one undifferentiated "busy" state, but listening → processing → result need to read as three distinct states.',
      },
    },
  },
  args: {
    variant: 'tertiary',
    size: 'l',
    state: 'loading',
    children: 'Skip',
  },
};

export const DestructiveSDefault: Story = {
  name: 'variant=destructive, size=s, state=default',
  parameters: {
    docs: {
      description: {
        story: "USE: abandon/cancel/delete actions only. DON'T: pair with a Primary on the same screen — Destructive competes for attention the same way a second Primary would.",
      },
    },
  },
  args: {
    variant: 'destructive',
    size: 's',
    state: 'default',
    children: 'Delete account',
  },
};

export const DestructiveSPressed: Story = {
  name: 'variant=destructive, size=s, state=pressed',
  parameters: {
    docs: {
      description: {
        story: "USE: abandon/cancel/delete actions only. DON'T: pair with a Primary on the same screen — Destructive competes for attention the same way a second Primary would.",
      },
    },
  },
  args: {
    variant: 'destructive',
    size: 's',
    state: 'pressed',
    children: 'Delete account',
  },
};

export const DestructiveSDisabled: Story = {
  name: 'variant=destructive, size=s, state=disabled',
  parameters: {
    docs: {
      description: {
        story: "USE: abandon/cancel/delete actions only. DON'T: pair with a Primary on the same screen — Destructive competes for attention the same way a second Primary would.",
      },
    },
  },
  args: {
    variant: 'destructive',
    size: 's',
    state: 'disabled',
    children: 'Delete account',
  },
};

export const DestructiveSLoading: Story = {
  name: 'variant=destructive, size=s, state=loading',
  parameters: {
    docs: {
      description: {
        story: "USE: abandon/cancel/delete actions only. DON'T: pair with a Primary on the same screen — Destructive competes for attention the same way a second Primary would.",
      },
    },
  },
  args: {
    variant: 'destructive',
    size: 's',
    state: 'loading',
    children: 'Delete account',
  },
};

export const DestructiveMDefault: Story = {
  name: 'variant=destructive, size=m, state=default',
  parameters: {
    docs: {
      description: {
        story: "USE: abandon/cancel/delete actions only. DON'T: pair with a Primary on the same screen — Destructive competes for attention the same way a second Primary would.",
      },
    },
  },
  args: {
    variant: 'destructive',
    size: 'm',
    state: 'default',
    children: 'Delete account',
  },
};

export const DestructiveMPressed: Story = {
  name: 'variant=destructive, size=m, state=pressed',
  parameters: {
    docs: {
      description: {
        story: "USE: abandon/cancel/delete actions only. DON'T: pair with a Primary on the same screen — Destructive competes for attention the same way a second Primary would.",
      },
    },
  },
  args: {
    variant: 'destructive',
    size: 'm',
    state: 'pressed',
    children: 'Delete account',
  },
};

export const DestructiveMDisabled: Story = {
  name: 'variant=destructive, size=m, state=disabled',
  parameters: {
    docs: {
      description: {
        story: "USE: abandon/cancel/delete actions only. DON'T: pair with a Primary on the same screen — Destructive competes for attention the same way a second Primary would.",
      },
    },
  },
  args: {
    variant: 'destructive',
    size: 'm',
    state: 'disabled',
    children: 'Delete account',
  },
};

export const DestructiveMLoading: Story = {
  name: 'variant=destructive, size=m, state=loading',
  parameters: {
    docs: {
      description: {
        story: "USE: abandon/cancel/delete actions only. DON'T: pair with a Primary on the same screen — Destructive competes for attention the same way a second Primary would.",
      },
    },
  },
  args: {
    variant: 'destructive',
    size: 'm',
    state: 'loading',
    children: 'Delete account',
  },
};

export const DestructiveLDefault: Story = {
  name: 'variant=destructive, size=l, state=default',
  parameters: {
    docs: {
      description: {
        story: "USE: abandon/cancel/delete actions only. DON'T: pair with a Primary on the same screen — Destructive competes for attention the same way a second Primary would.",
      },
    },
  },
  args: {
    variant: 'destructive',
    size: 'l',
    state: 'default',
    children: 'Delete account',
  },
};

export const DestructiveLPressed: Story = {
  name: 'variant=destructive, size=l, state=pressed',
  parameters: {
    docs: {
      description: {
        story: "USE: abandon/cancel/delete actions only. DON'T: pair with a Primary on the same screen — Destructive competes for attention the same way a second Primary would.",
      },
    },
  },
  args: {
    variant: 'destructive',
    size: 'l',
    state: 'pressed',
    children: 'Delete account',
  },
};

export const DestructiveLDisabled: Story = {
  name: 'variant=destructive, size=l, state=disabled',
  parameters: {
    docs: {
      description: {
        story: "USE: abandon/cancel/delete actions only. DON'T: pair with a Primary on the same screen — Destructive competes for attention the same way a second Primary would.",
      },
    },
  },
  args: {
    variant: 'destructive',
    size: 'l',
    state: 'disabled',
    children: 'Delete account',
  },
};

export const DestructiveLLoading: Story = {
  name: 'variant=destructive, size=l, state=loading',
  parameters: {
    docs: {
      description: {
        story: "USE: abandon/cancel/delete actions only. DON'T: pair with a Primary on the same screen — Destructive competes for attention the same way a second Primary would.",
      },
    },
  },
  args: {
    variant: 'destructive',
    size: 'l',
    state: 'loading',
    children: 'Delete account',
  },
};

