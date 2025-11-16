import type { Meta, StoryObj } from '@storybook/react';
import Logo from './Logo';

const meta = {
  title: 'Custom/Logo',
  component: Logo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Logo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const LightMode: Story = {
  args: {},
  parameters: {
    backgrounds: { default: 'light' },
  },
};

export const DarkMode: Story = {
  args: {},
  parameters: {
    backgrounds: { default: 'dark' },
  },
  decorators: [
    (Story) => (
      <div className="dark">
        <Story />
      </div>
    ),
  ],
};

export const InNavigation: Story = {
  render: () => (
    <div className="w-full bg-background border p-4">
      <div className="flex items-center gap-3">
        <Logo />
        <div className="ml-auto flex gap-2">
          <span className="text-sm text-muted-foreground">Navigation items...</span>
        </div>
      </div>
    </div>
  ),
};
