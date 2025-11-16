import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Design System/Brand Guidelines',
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const ColorCard = ({ name, hsl, hex, usage }: { name: string; hsl: string; hex: string; usage: string }) => (
  <div className="flex flex-col gap-2">
    <div className="h-32 rounded-lg border shadow-sm" style={{ backgroundColor: hex }} />
    <div>
      <div className="font-semibold text-sm">{name}</div>
      <div className="text-xs text-muted-foreground font-mono">{hex}</div>
      <div className="text-xs text-muted-foreground font-mono">{hsl}</div>
      <div className="text-xs text-muted-foreground mt-1">{usage}</div>
    </div>
  </div>
);

export const BrandColors: Story = {
  render: () => (
    <div className="space-y-8 max-w-6xl">
      <div>
        <h1 className="text-3xl font-bold mb-2">PropertySimple Brand Guidelines</h1>
        <p className="text-muted-foreground">
          Our design system uses a warm, trustworthy palette for light mode and a premium dark palette for dark mode.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Light Mode - Warm & Trustworthy</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Our light mode uses terracotta and warm neutrals to create an inviting, home-focused feeling.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <ColorCard
            name="Primary (Terracotta)"
            hsl="hsl(15 65% 52%)"
            hex="#D4653D"
            usage="Main brand color for CTAs and accents"
          />
          <ColorCard
            name="Accent (Gold)"
            hsl="hsl(45 85% 48%)"
            hex="#F4B61A"
            usage="Secondary accents and highlights"
          />
          <ColorCard
            name="Background (Cream)"
            hsl="hsl(35 30% 96%)"
            hex="#FAF8F5"
            usage="Page background"
          />
          <ColorCard
            name="Foreground (Charcoal)"
            hsl="hsl(25 20% 12%)"
            hex="#231815"
            usage="Primary text color"
          />
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Dark Mode - Premium & Modern</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Our dark mode uses vibrant purple accents on a nearly-black background for a premium feel.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <ColorCard
            name="Primary (Purple)"
            hsl="hsl(250 70% 60%)"
            hex="#6D5CFF"
            usage="Main interactive elements"
          />
          <ColorCard
            name="Background (Nearly Black)"
            hsl="hsl(0 0% 4%)"
            hex="#0A0A0A"
            usage="Page background"
          />
          <ColorCard
            name="Card (Elevated)"
            hsl="hsl(0 0% 6%)"
            hex="#0F0F0F"
            usage="Card surfaces"
          />
          <ColorCard
            name="Foreground (Crisp White)"
            hsl="hsl(0 0% 98%)"
            hex="#FAFAFA"
            usage="Primary text"
          />
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Semantic Colors</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Consistent across both modes for clear communication.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <ColorCard
            name="Success (Green)"
            hsl="hsl(142 55% 40%)"
            hex="#2E864E"
            usage="Success states, positive actions"
          />
          <ColorCard
            name="Warning (Amber)"
            hsl="hsl(38 92% 50%)"
            hex="#F59E0B"
            usage="Warning states, caution"
          />
          <ColorCard
            name="Destructive (Red)"
            hsl="hsl(0 72% 51%)"
            hex="#DC2626"
            usage="Errors, delete actions"
          />
          <ColorCard
            name="Info (Blue)"
            hsl="hsl(199 89% 48%)"
            hex="#0EA5E9"
            usage="Information, tips (dark mode)"
          />
        </div>
      </div>
    </div>
  ),
};

export const Typography: Story = {
  render: () => (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h2 className="text-2xl font-bold mb-4">Typography System</h2>
        <p className="text-muted-foreground mb-6">
          We use Cabinet Grotesk for headings (bold, distinctive) and Outfit for body text (clean, readable).
        </p>
      </div>

      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold mb-4 text-muted-foreground">Display Typography</h3>
        <div className="space-y-6">
          <div>
            <p className="text-xs text-muted-foreground mb-2">text-4xl font-bold (Cabinet Grotesk)</p>
            <h1 className="text-4xl font-bold">Create Better Campaigns</h1>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-2">text-3xl font-bold (Cabinet Grotesk)</p>
            <h2 className="text-3xl font-bold">Campaign Performance</h2>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-2">text-2xl font-bold (Cabinet Grotesk)</p>
            <h3 className="text-2xl font-bold">Lead Generation</h3>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-2">text-xl font-semibold (Cabinet Grotesk)</p>
            <h4 className="text-xl font-semibold">Section Header</h4>
          </div>
        </div>
      </div>

      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold mb-4 text-muted-foreground">Body Typography</h3>
        <div className="space-y-4">
          <div>
            <p className="text-xs text-muted-foreground mb-2">text-lg (Outfit Regular - 18px)</p>
            <p className="text-lg">Large body text for emphasis. Track your campaigns across Meta Ads, Google Ads, and more.</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-2">text-base (Outfit Regular - 16px)</p>
            <p className="text-base">Default body text. PropertySimple helps real estate agents automate their marketing and lead generation.</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-2">text-sm (Outfit Regular - 14px)</p>
            <p className="text-sm">Small text for secondary information, labels, and captions.</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-2">text-xs (Outfit Regular - 12px)</p>
            <p className="text-xs">Extra small text for timestamps, metadata, and fine print.</p>
          </div>
        </div>
      </div>

      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold mb-4 text-muted-foreground">Font Weights</h3>
        <div className="space-y-2">
          <p className="font-normal">Normal (400) - Default body text weight</p>
          <p className="font-medium">Medium (500) - Subtle emphasis</p>
          <p className="font-semibold">Semibold (600) - Section headers, labels</p>
          <p className="font-bold">Bold (700) - Headings, important text</p>
        </div>
      </div>
    </div>
  ),
};

export const Spacing: Story = {
  render: () => (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h2 className="text-2xl font-bold mb-4">Spacing System</h2>
        <p className="text-muted-foreground mb-6">
          Consistent spacing creates visual rhythm. We use Tailwind's 4px-based scale.
        </p>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Component Padding</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <span className="w-20 text-sm font-mono">p-2</span>
            <div className="bg-primary p-2"><div className="bg-background h-8 w-32" /></div>
            <span className="text-sm text-muted-foreground">8px - Compact buttons, badges</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="w-20 text-sm font-mono">p-4</span>
            <div className="bg-primary p-4"><div className="bg-background h-8 w-32" /></div>
            <span className="text-sm text-muted-foreground">16px - Standard buttons, inputs</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="w-20 text-sm font-mono">p-6</span>
            <div className="bg-primary p-6"><div className="bg-background h-8 w-32" /></div>
            <span className="text-sm text-muted-foreground">24px - Cards, sections</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="w-20 text-sm font-mono">p-8</span>
            <div className="bg-primary p-8"><div className="bg-background h-8 w-32" /></div>
            <span className="text-sm text-muted-foreground">32px - Page sections, hero areas</span>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">Stack Spacing (gap)</h3>
        <div className="space-y-4">
          <div>
            <span className="text-sm font-mono mb-2 block">gap-2 (8px)</span>
            <div className="flex gap-2">
              <div className="w-16 h-16 bg-primary rounded" />
              <div className="w-16 h-16 bg-primary rounded" />
              <div className="w-16 h-16 bg-primary rounded" />
            </div>
            <span className="text-xs text-muted-foreground">Tight groups (badges, icons)</span>
          </div>
          <div>
            <span className="text-sm font-mono mb-2 block">gap-4 (16px)</span>
            <div className="flex gap-4">
              <div className="w-16 h-16 bg-primary rounded" />
              <div className="w-16 h-16 bg-primary rounded" />
              <div className="w-16 h-16 bg-primary rounded" />
            </div>
            <span className="text-xs text-muted-foreground">Standard spacing (form fields, buttons)</span>
          </div>
          <div>
            <span className="text-sm font-mono mb-2 block">gap-6 (24px)</span>
            <div className="flex gap-6">
              <div className="w-16 h-16 bg-primary rounded" />
              <div className="w-16 h-16 bg-primary rounded" />
              <div className="w-16 h-16 bg-primary rounded" />
            </div>
            <span className="text-xs text-muted-foreground">Section spacing (cards, content blocks)</span>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const BorderRadius: Story = {
  render: () => (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h2 className="text-2xl font-bold mb-4">Border Radius</h2>
        <p className="text-muted-foreground mb-6">
          We use 0.75rem (12px) as our default radius for a modern, friendly feel.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        <div>
          <div className="w-full h-24 bg-primary rounded-sm mb-2" />
          <p className="text-sm font-mono">rounded-sm (2px)</p>
          <p className="text-xs text-muted-foreground">Subtle, barely rounded</p>
        </div>
        <div>
          <div className="w-full h-24 bg-primary rounded mb-2" />
          <p className="text-sm font-mono">rounded (4px)</p>
          <p className="text-xs text-muted-foreground">Slight rounding</p>
        </div>
        <div>
          <div className="w-full h-24 bg-primary rounded-md mb-2" />
          <p className="text-sm font-mono">rounded-md (6px)</p>
          <p className="text-xs text-muted-foreground">Medium rounding</p>
        </div>
        <div>
          <div className="w-full h-24 bg-primary rounded-lg mb-2" />
          <p className="text-sm font-mono">rounded-lg (8px)</p>
          <p className="text-xs text-muted-foreground">Large rounding</p>
        </div>
        <div>
          <div className="w-full h-24 bg-primary rounded-xl mb-2" />
          <p className="text-sm font-mono">rounded-xl (12px)</p>
          <p className="text-xs text-muted-foreground">Default - Cards, buttons</p>
        </div>
        <div>
          <div className="w-full h-24 bg-primary rounded-full mb-2" />
          <p className="text-sm font-mono">rounded-full</p>
          <p className="text-xs text-muted-foreground">Circular - Avatars, badges</p>
        </div>
      </div>
    </div>
  ),
};

export const SpecialEffects: Story = {
  render: () => (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h2 className="text-2xl font-bold mb-4">Special Effects</h2>
        <p className="text-muted-foreground mb-6">
          Custom effects that add premium feel to the interface.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-3">Gradient Text</h3>
          <div className="gradient-text text-5xl font-bold mb-2">
            PropertySimple
          </div>
          <p className="text-sm text-muted-foreground font-mono">className="gradient-text"</p>
          <p className="text-xs text-muted-foreground mt-1">Used for hero headlines and premium branding</p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Grain Texture</h3>
          <div className="grain-texture p-8 bg-background rounded-lg border">
            <p className="text-lg">Content with subtle film grain texture for premium feel</p>
          </div>
          <p className="text-sm text-muted-foreground font-mono mt-2">className="grain-texture"</p>
          <p className="text-xs text-muted-foreground mt-1">Adds subtle noise overlay for organic, premium feel</p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Shadows</h3>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <div className="w-full h-24 bg-card shadow-sm rounded-lg mb-2" />
              <p className="text-sm font-mono">shadow-sm</p>
            </div>
            <div>
              <div className="w-full h-24 bg-card shadow-md rounded-lg mb-2" />
              <p className="text-sm font-mono">shadow-md</p>
            </div>
            <div>
              <div className="w-full h-24 bg-card shadow-lg rounded-lg mb-2" />
              <p className="text-sm font-mono">shadow-lg</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};
