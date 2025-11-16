import type { Meta, StoryObj } from '@storybook/react';
import { ListingCard } from './ListingCard';

const meta = {
  title: 'Custom/ListingCard',
  component: ListingCard,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    status: {
      control: 'select',
      options: ['active', 'sold', 'inactive'],
    },
    primaryActionVariant: {
      control: 'select',
      options: ['default', 'orange'],
    },
  },
} satisfies Meta<typeof ListingCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Active: Story = {
  args: {
    price: '$450,000',
    address: '345 Rim Shadows Dr, Sedona, AZ 86336',
    bedrooms: 3,
    bathrooms: 2,
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop',
    status: 'active',
    primaryActionLabel: 'Create Ad',
    showEditDelete: true,
    onPrimaryAction: () => console.log('Primary action'),
    onEdit: () => console.log('Edit'),
    onDelete: () => console.log('Delete'),
  },
};

export const Sold: Story = {
  args: {
    price: '$525,000',
    address: '789 Oak Valley Rd, Scottsdale, AZ 85251',
    bedrooms: 4,
    bathrooms: 3,
    imageUrl: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&auto=format&fit=crop',
    status: 'sold',
    primaryActionLabel: 'View Details',
    showMarkAsSold: false,
    onPrimaryAction: () => console.log('View details'),
  },
};

export const Inactive: Story = {
  args: {
    price: '$375,000',
    address: '123 Desert View Ln, Phoenix, AZ 85001',
    bedrooms: 2,
    bathrooms: 2,
    imageUrl: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&auto=format&fit=crop',
    status: 'inactive',
    primaryActionLabel: 'Reactivate',
    primaryActionVariant: 'orange',
    showHide: true,
    onPrimaryAction: () => console.log('Reactivate'),
    onHide: () => console.log('Hide'),
  },
};

export const NoImage: Story = {
  args: {
    price: '$299,000',
    address: '456 Canyon Creek Dr, Flagstaff, AZ 86001',
    bedrooms: 2,
    bathrooms: 1,
    status: 'active',
    primaryActionLabel: 'Add Photos',
    showEditDelete: true,
    onPrimaryAction: () => console.log('Add photos'),
    onEdit: () => console.log('Edit'),
    onDelete: () => console.log('Delete'),
  },
};

export const WithAllActions: Story = {
  args: {
    price: '$650,000',
    address: '999 Mountain Vista Way, Prescott, AZ 86301',
    bedrooms: 5,
    bathrooms: 4,
    imageUrl: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&auto=format&fit=crop',
    status: 'active',
    primaryActionLabel: 'Create Ad',
    showEditDelete: true,
    showHide: true,
    showMarkAsSold: true,
    onPrimaryAction: () => console.log('Create ad'),
    onEdit: () => console.log('Edit'),
    onDelete: () => console.log('Delete'),
    onHide: () => console.log('Hide'),
    onMarkAsSold: () => console.log('Mark as sold'),
  },
};

export const AllStatuses: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-3">Active Listing</h3>
        <ListingCard
          price="$450,000"
          address="345 Rim Shadows Dr, Sedona, AZ 86336"
          bedrooms={3}
          bathrooms={2}
          imageUrl="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop"
          status="active"
          primaryActionLabel="Create Ad"
          showEditDelete={true}
          onPrimaryAction={() => {}}
          onEdit={() => {}}
          onDelete={() => {}}
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Sold Listing</h3>
        <ListingCard
          price="$525,000"
          address="789 Oak Valley Rd, Scottsdale, AZ 85251"
          bedrooms={4}
          bathrooms={3}
          imageUrl="https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&auto=format&fit=crop"
          status="sold"
          primaryActionLabel="View Details"
          onPrimaryAction={() => {}}
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Inactive Listing</h3>
        <ListingCard
          price="$375,000"
          address="123 Desert View Ln, Phoenix, AZ 85001"
          bedrooms={2}
          bathrooms={2}
          imageUrl="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&auto=format&fit=crop"
          status="inactive"
          primaryActionLabel="Reactivate"
          primaryActionVariant="orange"
          showHide={true}
          onPrimaryAction={() => {}}
          onHide={() => {}}
        />
      </div>
    </div>
  ),
};

export const DarkMode: Story = {
  args: {
    price: '$450,000',
    address: '345 Rim Shadows Dr, Sedona, AZ 86336',
    bedrooms: 3,
    bathrooms: 2,
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop',
    status: 'active',
    primaryActionLabel: 'Create Ad',
    showEditDelete: true,
    onPrimaryAction: () => console.log('Primary action'),
    onEdit: () => console.log('Edit'),
    onDelete: () => console.log('Delete'),
  },
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
