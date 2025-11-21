import type { Meta, StoryObj } from '@storybook/react';
import { CampaignMetrics } from './CampaignMetrics';

const meta = {
  title: 'Custom/CampaignMetrics',
  component: CampaignMetrics,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CampaignMetrics>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Excellent: Story = {
  args: {
    adSpend: '$1,200',
    impressions: '45,000',
    interactions: '1,350',
  },
};

export const Good: Story = {
  args: {
    adSpend: '$850',
    impressions: '32,000',
    interactions: '960',
  },
};

export const NeedsImprovement: Story = {
  args: {
    adSpend: '$2,400',
    impressions: '28,000',
    interactions: '560',
  },
};

export const NewCampaign: Story = {
  args: {
    adSpend: '$450',
    impressions: '15,000',
    interactions: '300',
  },
};

export const HighPerformance: Story = {
  args: {
    adSpend: '$3,500',
    impressions: '125,000',
    interactions: '3,750',
  },
};

export const AllScenarios: Story = {
  args: {
    adSpend: '$1,200',
    impressions: '45,000',
    interactions: '1,350',
  },
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-3">Excellent Performance</h3>
        <p className="text-sm text-muted-foreground mb-3">
          High click rate, good engagement
        </p>
        <CampaignMetrics
          adSpend="$1,200"
          impressions="45,000"
          interactions="1,350"
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">New Campaign</h3>
        <p className="text-sm text-muted-foreground mb-3">
          Just started, getting impressions
        </p>
        <CampaignMetrics
          adSpend="$450"
          impressions="15,000"
          interactions="300"
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">High Volume</h3>
        <p className="text-sm text-muted-foreground mb-3">
          Large campaign with strong metrics
        </p>
        <CampaignMetrics
          adSpend="$3,500"
          impressions="125,000"
          interactions="3,750"
        />
      </div>
    </div>
  ),
};

export const DarkMode: Story = {
  args: {
    adSpend: '$1,200',
    impressions: '45,000',
    interactions: '1,350',
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
