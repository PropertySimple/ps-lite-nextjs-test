import type { Meta, StoryObj } from '@storybook/react';
import { AiSuggestionBanner, AiSuggestionInline } from './AiSuggestionBanner';

const meta = {
  title: 'Custom/AiSuggestionBanner',
  component: AiSuggestionBanner,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'compact'],
      description: 'Visual style of the banner',
    },
  },
} satisfies Meta<typeof AiSuggestionBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    suggestion: 'Try responding with: "Thanks for reaching out! I\'d be happy to schedule a showing. Are you available this Thursday afternoon?"',
    title: 'AI Suggestion',
    variant: 'default',
    onAccept: () => console.log('Accepted'),
    onDismiss: () => console.log('Dismissed'),
  },
};

export const Compact: Story = {
  args: {
    suggestion: 'Follow up with this lead - they viewed your listing 3 times this week',
    variant: 'compact',
    onAccept: () => console.log('Accepted'),
    onDismiss: () => console.log('Dismissed'),
  },
};

export const CustomTitle: Story = {
  args: {
    suggestion: 'Schedule an open house for this Sunday at 2 PM based on recent engagement patterns',
    title: 'Smart Scheduling Tip',
    variant: 'default',
    onAccept: () => console.log('Accepted'),
    onDismiss: () => console.log('Dismissed'),
  },
};

export const LongSuggestion: Story = {
  args: {
    suggestion: 'Based on the conversation history and the contact\'s buying signals, I recommend sending a personalized follow-up email highlighting the renovated kitchen (which they mentioned loving) and including the recent comparable sales in the neighborhood to justify the pricing. You could also mention the upcoming open house this weekend as a low-pressure way to see the property again.',
    title: 'AI Recommendation',
    variant: 'default',
    onAccept: () => console.log('Accepted'),
    onDismiss: () => console.log('Dismissed'),
  },
};

export const InlineVariant: Story = {
  render: () => (
    <div className="max-w-md space-y-4">
      <p className="text-sm text-muted-foreground">
        The inline variant is perfect for use within forms or compact spaces:
      </p>
      <AiSuggestionInline
        suggestion="Great location near schools"
        onAccept={() => console.log('Accepted')}
        onDismiss={() => console.log('Dismissed')}
      />
      <AiSuggestionInline
        suggestion="Updated kitchen and bathrooms"
        onAccept={() => console.log('Accepted')}
        onDismiss={() => console.log('Dismissed')}
      />
      <AiSuggestionInline
        suggestion="Perfect for families with move-in ready condition"
        onAccept={() => console.log('Accepted')}
        onDismiss={() => console.log('Dismissed')}
      />
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-3">Default Variant</h3>
        <AiSuggestionBanner
          suggestion="This lead has viewed your listing 5 times. Consider reaching out to schedule a showing."
          onAccept={() => console.log('Default accepted')}
          onDismiss={() => console.log('Default dismissed')}
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Compact Variant</h3>
        <AiSuggestionBanner
          suggestion="Follow up with Sarah - she's highly engaged with this property"
          variant="compact"
          onAccept={() => console.log('Compact accepted')}
          onDismiss={() => console.log('Compact dismissed')}
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Inline Variant</h3>
        <AiSuggestionInline
          suggestion="Add photos of the backyard - buyers love outdoor spaces"
          onAccept={() => console.log('Inline accepted')}
          onDismiss={() => console.log('Inline dismissed')}
        />
      </div>
    </div>
  ),
};

export const UseCases: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-2">In Messaging</h3>
        <p className="text-sm text-muted-foreground mb-3">
          Suggest AI-generated replies in the inbox
        </p>
        <AiSuggestionBanner
          suggestion="Hi John! I'd love to show you 345 Rim Shadows Dr. Are you free this Saturday at 10 AM?"
          title="Suggested Reply"
          onAccept={() => {}}
          onDismiss={() => {}}
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">In Contact Management</h3>
        <p className="text-sm text-muted-foreground mb-3">
          Recommend next actions for leads
        </p>
        <AiSuggestionBanner
          suggestion="This contact hasn't engaged in 2 weeks. Send a check-in email about new listings in their price range."
          title="Next Action"
          variant="compact"
          onAccept={() => {}}
          onDismiss={() => {}}
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">In Ad Creation</h3>
        <p className="text-sm text-muted-foreground mb-3">
          Suggest improvements to ad copy
        </p>
        <AiSuggestionInline
          suggestion="Mention the mountain views - they increase engagement by 34%"
          onAccept={() => {}}
          onDismiss={() => {}}
        />
      </div>
    </div>
  ),
};

export const DarkMode: Story = {
  args: {
    suggestion: 'This property matches 3 active buyer profiles. Send targeted notifications?',
    title: 'Smart Match',
    variant: 'default',
    onAccept: () => console.log('Accepted'),
    onDismiss: () => console.log('Dismissed'),
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
