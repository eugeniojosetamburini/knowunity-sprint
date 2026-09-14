import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { ButtonIcon } from './ButtonIcon';
import { SquareIcon } from './SquareIcon';
import { PlusIcon } from './PlusIcon';

const DESCRIPTION =
  'An icon-only tap target (close, back, menu). One per corner slot. The icon it shows is a swap-in, not fixed — confirm it exists in the icon library before assuming it does. XS is for tight, low-emphasis triggers inside cards and rows (a card\'s menu button, an add-topic control) — don\'t substitute it for the standard S size in a top bar.';

const meta = {
  title: 'Components/ButtonIcon',
  component: ButtonIcon,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: DESCRIPTION,
      },
    },
  },
  argTypes: {
    variant: { control: 'select', options: ['primary', 'secondary', 'tertiary', 'brand'] },
    size: { control: 'select', options: ['xs', 's', 'm', 'l'] },
    state: { control: 'select', options: ['default', 'pressed', 'disabled', 'loading'] },
  },
} satisfies Meta<typeof ButtonIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

const GENERIC_USE_DONT =
  "USE: any icon-only tap target — close, back, menu. One per corner slot. DON'T: pair the icon with a visible text label; that combination is what `button` is for.";

export const PrimarySDefault: Story = {
  name: 'variant=primary, size=s, state=default',
  parameters: { docs: { description: { story: GENERIC_USE_DONT } } },
  args: { variant: 'primary', size: 's', state: 'default', icon: <SquareIcon />, 'aria-label': 'Close' },
};

export const PrimarySPressed: Story = {
  name: 'variant=primary, size=s, state=pressed',
  parameters: { docs: { description: { story: GENERIC_USE_DONT } } },
  args: { variant: 'primary', size: 's', state: 'pressed', icon: <SquareIcon />, 'aria-label': 'Close' },
};

export const PrimarySDisabled: Story = {
  name: 'variant=primary, size=s, state=disabled',
  parameters: { docs: { description: { story: GENERIC_USE_DONT } } },
  args: { variant: 'primary', size: 's', state: 'disabled', icon: <SquareIcon />, 'aria-label': 'Close' },
};

export const PrimarySLoading: Story = {
  name: 'variant=primary, size=s, state=loading',
  parameters: { docs: { description: { story: GENERIC_USE_DONT } } },
  args: { variant: 'primary', size: 's', state: 'loading', icon: <SquareIcon />, 'aria-label': 'Close' },
};

export const PrimaryMDefault: Story = {
  name: 'variant=primary, size=m, state=default',
  parameters: { docs: { description: { story: GENERIC_USE_DONT } } },
  args: { variant: 'primary', size: 'm', state: 'default', icon: <SquareIcon />, 'aria-label': 'Close' },
};

export const PrimaryMPressed: Story = {
  name: 'variant=primary, size=m, state=pressed',
  parameters: { docs: { description: { story: GENERIC_USE_DONT } } },
  args: { variant: 'primary', size: 'm', state: 'pressed', icon: <SquareIcon />, 'aria-label': 'Close' },
};

export const PrimaryMDisabled: Story = {
  name: 'variant=primary, size=m, state=disabled',
  parameters: { docs: { description: { story: GENERIC_USE_DONT } } },
  args: { variant: 'primary', size: 'm', state: 'disabled', icon: <SquareIcon />, 'aria-label': 'Close' },
};

export const PrimaryMLoading: Story = {
  name: 'variant=primary, size=m, state=loading',
  parameters: { docs: { description: { story: GENERIC_USE_DONT } } },
  args: { variant: 'primary', size: 'm', state: 'loading', icon: <SquareIcon />, 'aria-label': 'Close' },
};

export const PrimaryLDefault: Story = {
  name: 'variant=primary, size=l, state=default',
  parameters: { docs: { description: { story: GENERIC_USE_DONT } } },
  args: { variant: 'primary', size: 'l', state: 'default', icon: <SquareIcon />, 'aria-label': 'Close' },
};

export const PrimaryLPressed: Story = {
  name: 'variant=primary, size=l, state=pressed',
  parameters: { docs: { description: { story: GENERIC_USE_DONT } } },
  args: { variant: 'primary', size: 'l', state: 'pressed', icon: <SquareIcon />, 'aria-label': 'Close' },
};

export const PrimaryLDisabled: Story = {
  name: 'variant=primary, size=l, state=disabled',
  parameters: { docs: { description: { story: GENERIC_USE_DONT } } },
  args: { variant: 'primary', size: 'l', state: 'disabled', icon: <SquareIcon />, 'aria-label': 'Close' },
};

export const PrimaryLLoading: Story = {
  name: 'variant=primary, size=l, state=loading',
  parameters: { docs: { description: { story: GENERIC_USE_DONT } } },
  args: { variant: 'primary', size: 'l', state: 'loading', icon: <SquareIcon />, 'aria-label': 'Close' },
};

export const SecondarySDefault: Story = {
  name: 'variant=secondary, size=s, state=default',
  parameters: { docs: { description: { story: GENERIC_USE_DONT } } },
  args: { variant: 'secondary', size: 's', state: 'default', icon: <SquareIcon />, 'aria-label': 'Back' },
};

export const SecondarySPressed: Story = {
  name: 'variant=secondary, size=s, state=pressed',
  parameters: { docs: { description: { story: GENERIC_USE_DONT } } },
  args: { variant: 'secondary', size: 's', state: 'pressed', icon: <SquareIcon />, 'aria-label': 'Back' },
};

export const SecondarySDisabled: Story = {
  name: 'variant=secondary, size=s, state=disabled',
  parameters: { docs: { description: { story: GENERIC_USE_DONT } } },
  args: { variant: 'secondary', size: 's', state: 'disabled', icon: <SquareIcon />, 'aria-label': 'Back' },
};

export const SecondarySLoading: Story = {
  name: 'variant=secondary, size=s, state=loading',
  parameters: { docs: { description: { story: GENERIC_USE_DONT } } },
  args: { variant: 'secondary', size: 's', state: 'loading', icon: <SquareIcon />, 'aria-label': 'Back' },
};

export const SecondaryMDefault: Story = {
  name: 'variant=secondary, size=m, state=default',
  parameters: { docs: { description: { story: GENERIC_USE_DONT } } },
  args: { variant: 'secondary', size: 'm', state: 'default', icon: <SquareIcon />, 'aria-label': 'Back' },
};

export const SecondaryMPressed: Story = {
  name: 'variant=secondary, size=m, state=pressed',
  parameters: { docs: { description: { story: GENERIC_USE_DONT } } },
  args: { variant: 'secondary', size: 'm', state: 'pressed', icon: <SquareIcon />, 'aria-label': 'Back' },
};

export const SecondaryMDisabled: Story = {
  name: 'variant=secondary, size=m, state=disabled',
  parameters: { docs: { description: { story: GENERIC_USE_DONT } } },
  args: { variant: 'secondary', size: 'm', state: 'disabled', icon: <SquareIcon />, 'aria-label': 'Back' },
};

export const SecondaryMLoading: Story = {
  name: 'variant=secondary, size=m, state=loading',
  parameters: { docs: { description: { story: GENERIC_USE_DONT } } },
  args: { variant: 'secondary', size: 'm', state: 'loading', icon: <SquareIcon />, 'aria-label': 'Back' },
};

export const SecondaryLDefault: Story = {
  name: 'variant=secondary, size=l, state=default',
  parameters: { docs: { description: { story: GENERIC_USE_DONT } } },
  args: { variant: 'secondary', size: 'l', state: 'default', icon: <SquareIcon />, 'aria-label': 'Back' },
};

export const SecondaryLPressed: Story = {
  name: 'variant=secondary, size=l, state=pressed',
  parameters: { docs: { description: { story: GENERIC_USE_DONT } } },
  args: { variant: 'secondary', size: 'l', state: 'pressed', icon: <SquareIcon />, 'aria-label': 'Back' },
};

export const SecondaryLDisabled: Story = {
  name: 'variant=secondary, size=l, state=disabled',
  parameters: { docs: { description: { story: GENERIC_USE_DONT } } },
  args: { variant: 'secondary', size: 'l', state: 'disabled', icon: <SquareIcon />, 'aria-label': 'Back' },
};

export const SecondaryLLoading: Story = {
  name: 'variant=secondary, size=l, state=loading',
  parameters: { docs: { description: { story: GENERIC_USE_DONT } } },
  args: { variant: 'secondary', size: 'l', state: 'loading', icon: <SquareIcon />, 'aria-label': 'Back' },
};

export const TertiarySDefault: Story = {
  name: 'variant=tertiary, size=s, state=default',
  parameters: { docs: { description: { story: GENERIC_USE_DONT } } },
  args: { variant: 'tertiary', size: 's', state: 'default', icon: <SquareIcon />, 'aria-label': 'Menu' },
};

export const TertiarySPressed: Story = {
  name: 'variant=tertiary, size=s, state=pressed',
  parameters: { docs: { description: { story: GENERIC_USE_DONT } } },
  args: { variant: 'tertiary', size: 's', state: 'pressed', icon: <SquareIcon />, 'aria-label': 'Menu' },
};

export const TertiarySDisabled: Story = {
  name: 'variant=tertiary, size=s, state=disabled',
  parameters: { docs: { description: { story: GENERIC_USE_DONT } } },
  args: { variant: 'tertiary', size: 's', state: 'disabled', icon: <SquareIcon />, 'aria-label': 'Menu' },
};

export const TertiarySLoading: Story = {
  name: 'variant=tertiary, size=s, state=loading',
  parameters: { docs: { description: { story: GENERIC_USE_DONT } } },
  args: { variant: 'tertiary', size: 's', state: 'loading', icon: <SquareIcon />, 'aria-label': 'Menu' },
};

export const TertiaryMDefault: Story = {
  name: 'variant=tertiary, size=m, state=default',
  parameters: { docs: { description: { story: GENERIC_USE_DONT } } },
  args: { variant: 'tertiary', size: 'm', state: 'default', icon: <SquareIcon />, 'aria-label': 'Menu' },
};

export const TertiaryMPressed: Story = {
  name: 'variant=tertiary, size=m, state=pressed',
  parameters: { docs: { description: { story: GENERIC_USE_DONT } } },
  args: { variant: 'tertiary', size: 'm', state: 'pressed', icon: <SquareIcon />, 'aria-label': 'Menu' },
};

export const TertiaryMDisabled: Story = {
  name: 'variant=tertiary, size=m, state=disabled',
  parameters: { docs: { description: { story: GENERIC_USE_DONT } } },
  args: { variant: 'tertiary', size: 'm', state: 'disabled', icon: <SquareIcon />, 'aria-label': 'Menu' },
};

export const TertiaryMLoading: Story = {
  name: 'variant=tertiary, size=m, state=loading',
  parameters: { docs: { description: { story: GENERIC_USE_DONT } } },
  args: { variant: 'tertiary', size: 'm', state: 'loading', icon: <SquareIcon />, 'aria-label': 'Menu' },
};

export const TertiaryLDefault: Story = {
  name: 'variant=tertiary, size=l, state=default',
  parameters: { docs: { description: { story: GENERIC_USE_DONT } } },
  args: { variant: 'tertiary', size: 'l', state: 'default', icon: <SquareIcon />, 'aria-label': 'Menu' },
};

export const TertiaryLPressed: Story = {
  name: 'variant=tertiary, size=l, state=pressed',
  parameters: { docs: { description: { story: GENERIC_USE_DONT } } },
  args: { variant: 'tertiary', size: 'l', state: 'pressed', icon: <SquareIcon />, 'aria-label': 'Menu' },
};

export const TertiaryLDisabled: Story = {
  name: 'variant=tertiary, size=l, state=disabled',
  parameters: { docs: { description: { story: GENERIC_USE_DONT } } },
  args: { variant: 'tertiary', size: 'l', state: 'disabled', icon: <SquareIcon />, 'aria-label': 'Menu' },
};

export const TertiaryLLoading: Story = {
  name: 'variant=tertiary, size=l, state=loading',
  parameters: { docs: { description: { story: GENERIC_USE_DONT } } },
  args: { variant: 'tertiary', size: 'l', state: 'loading', icon: <SquareIcon />, 'aria-label': 'Menu' },
};

const BRAND_XS_USE_DONT =
  "The control that starts adding a new topic to a voice review session — tapping it opens the flow for picking or recording a topic to review by voice. USE: the add-topic-via-voice entry point specifically, wherever a student can add a topic to their voice review set. DON'T: use this for a generic card menu or any other add/more action — this glyph and color are reserved for the voice add-topic flow. (Also: variant=\"brand\" is only implemented at size=\"xs\" — S/M/L are baked Figma image assets with no token-backed way to reconstruct them; flagged in ButtonIcon.module.css rather than guessed.)";

export const BrandXsDefault: Story = {
  name: 'variant=brand, size=xs, state=default',
  parameters: { docs: { description: { story: BRAND_XS_USE_DONT } } },
  args: { variant: 'brand', size: 'xs', state: 'default', icon: <PlusIcon />, 'aria-label': 'Add topic' },
};

export const BrandXsPressed: Story = {
  name: 'variant=brand, size=xs, state=pressed',
  parameters: { docs: { description: { story: BRAND_XS_USE_DONT } } },
  args: { variant: 'brand', size: 'xs', state: 'pressed', icon: <PlusIcon />, 'aria-label': 'Add topic' },
};

export const BrandXsDisabled: Story = {
  name: 'variant=brand, size=xs, state=disabled',
  parameters: { docs: { description: { story: BRAND_XS_USE_DONT } } },
  args: { variant: 'brand', size: 'xs', state: 'disabled', icon: <PlusIcon />, 'aria-label': 'Add topic' },
};

export const BrandXsLoading: Story = {
  name: 'variant=brand, size=xs, state=loading',
  parameters: { docs: { description: { story: BRAND_XS_USE_DONT } } },
  args: { variant: 'brand', size: 'xs', state: 'loading', icon: <PlusIcon />, 'aria-label': 'Add topic' },
};
