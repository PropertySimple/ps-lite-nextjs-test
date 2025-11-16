import type { Meta, StoryObj } from '@storybook/react';
import PageHeader from './PageHeader';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

const meta = {
  title: 'Custom/PageHeader',
  component: PageHeader,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof PageHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Dashboard',
  },
};

export const WithDescription: Story = {
  args: {
    title: 'Campaign Analytics',
    description: 'Track the performance of your advertising campaigns across all platforms',
  },
};

export const WithAction: Story = {
  args: {
    title: 'Listings',
    description: 'Manage your property listings and track their performance',
    children: (
      <Button className="mt-4">
        <Plus className="mr-2 h-4 w-4" />
        Add Listing
      </Button>
    ),
  },
};

export const WithMultipleActions: Story = {
  args: {
    title: 'Contacts',
    description: 'View and manage all your leads and clients in one place',
    children: (
      <div className="flex gap-2 mt-4">
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Contact
        </Button>
        <Button variant="outline">Import</Button>
        <Button variant="outline">Export</Button>
      </div>
    ),
  },
};

export const LongTitle: Story = {
  args: {
    title: 'Advanced Campaign Performance Analytics Dashboard',
    description: 'Comprehensive overview of all your marketing campaigns including Meta Ads, Google Ads, and direct outreach efforts',
  },
};

export const AllVariations: Story = {
  render: () => (
    <div className="space-y-12">
      <div>
        <h3 className="text-sm font-semibold mb-4 text-muted-foreground">Simple Title Only</h3>
        <PageHeader title="Dashboard" />
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-4 text-muted-foreground">With Description</h3>
        <PageHeader
          title="Campaigns"
          description="Create and manage advertising campaigns"
        />
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-4 text-muted-foreground">With Action Button</h3>
        <PageHeader
          title="Listings"
          description="Manage your property listings"
        >
          <Button className="mt-4">
            <Plus className="mr-2 h-4 w-4" />
            Add Listing
          </Button>
        </PageHeader>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-4 text-muted-foreground">With Multiple Actions</h3>
        <PageHeader
          title="Contacts"
          description="View and manage all your leads"
        >
          <div className="flex gap-2 mt-4 flex-wrap">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Contact
            </Button>
            <Button variant="outline">Import</Button>
            <Button variant="outline">Export</Button>
            <Button variant="ghost">Filter</Button>
          </div>
        </PageHeader>
      </div>
    </div>
  ),
};
