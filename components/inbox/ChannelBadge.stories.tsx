import type { Meta, StoryObj } from '@storybook/react';
import { ChannelBadge } from './ChannelBadge';

const meta = {
  title: 'Custom/ChannelBadge',
  component: ChannelBadge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    channel: {
      control: 'select',
      options: ['phone', 'sms', 'email'],
      description: 'Communication channel type',
    },
  },
} satisfies Meta<typeof ChannelBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Phone: Story = {
  args: {
    channel: 'phone',
  },
};

export const SMS: Story = {
  args: {
    channel: 'sms',
  },
};

export const Email: Story = {
  args: {
    channel: 'email',
  },
};

export const AllChannels: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div>
        <h3 className="text-sm font-semibold mb-2">All Channel Types</h3>
        <div className="flex gap-2">
          <ChannelBadge channel="phone" />
          <ChannelBadge channel="sms" />
          <ChannelBadge channel="email" />
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-2">In Context</h3>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <span className="font-medium">John Doe</span>
            <ChannelBadge channel="phone" />
            <span className="text-muted-foreground">• 2 hours ago</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="font-medium">Sarah Smith</span>
            <ChannelBadge channel="sms" />
            <span className="text-muted-foreground">• 1 day ago</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="font-medium">Mike Johnson</span>
            <ChannelBadge channel="email" />
            <span className="text-muted-foreground">• 3 days ago</span>
          </div>
        </div>
      </div>
    </div>
  ),
};
