import type { Meta, StoryObj } from '@storybook/react';
import { LeadStageCards } from './LeadStageCards';

const meta = {
  title: 'Custom/LeadStageCards',
  component: LeadStageCards,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof LeadStageCards>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    stages: {
      new: 12,
      aiEngaging: 8,
      agentNeeded: 5,
      converted: 3,
    },
  },
};

export const HighVolume: Story = {
  args: {
    stages: {
      new: 45,
      aiEngaging: 32,
      agentNeeded: 18,
      converted: 12,
    },
  },
};

export const LowActivity: Story = {
  args: {
    stages: {
      new: 2,
      aiEngaging: 1,
      agentNeeded: 1,
      converted: 0,
    },
  },
};

export const AIHeavy: Story = {
  args: {
    stages: {
      new: 8,
      aiEngaging: 24,
      agentNeeded: 3,
      converted: 2,
    },
  },
};

export const ConversionFocused: Story = {
  args: {
    stages: {
      new: 5,
      aiEngaging: 3,
      agentNeeded: 8,
      converted: 15,
    },
  },
};

export const EmptyState: Story = {
  args: {
    stages: {
      new: 0,
      aiEngaging: 0,
      agentNeeded: 0,
      converted: 0,
    },
  },
};

export const AllScenarios: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-3">Typical Flow</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Balanced distribution across all stages
        </p>
        <LeadStageCards
          stages={{
            new: 12,
            aiEngaging: 8,
            agentNeeded: 5,
            converted: 3,
          }}
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">AI Working Well</h3>
        <p className="text-sm text-muted-foreground mb-4">
          AI handling most leads, few need agent intervention
        </p>
        <LeadStageCards
          stages={{
            new: 8,
            aiEngaging: 24,
            agentNeeded: 3,
            converted: 2,
          }}
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">High Conversion</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Many leads converting successfully
        </p>
        <LeadStageCards
          stages={{
            new: 5,
            aiEngaging: 3,
            agentNeeded: 8,
            converted: 15,
          }}
        />
      </div>
    </div>
  ),
};

export const DarkMode: Story = {
  args: {
    stages: {
      new: 12,
      aiEngaging: 8,
      agentNeeded: 5,
      converted: 3,
    },
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
