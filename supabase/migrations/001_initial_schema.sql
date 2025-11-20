-- PropertySimple Ads Database Schema
-- Run this in your Supabase SQL editor

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ============================================
-- PROFILES (extends auth.users)
-- ============================================
create table profiles (
  id uuid references auth.users on delete cascade primary key,
  email text not null,
  full_name text,
  phone text,
  cell_phone text,
  brokerage text,
  license_number text,
  photo_url text,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Enable RLS
alter table profiles enable row level security;

-- Policies
create policy "Users can view own profile"
  on profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on profiles for update
  using (auth.uid() = id);

create policy "Users can insert own profile"
  on profiles for insert
  with check (auth.uid() = id);

-- Trigger to create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', '')
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ============================================
-- PROPERTIES
-- ============================================
create table properties (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references profiles(id) on delete cascade not null,

  -- Address
  street text not null,
  city text not null,
  state text not null,
  zip text not null,

  -- Details
  price numeric not null,
  bedrooms int,
  bathrooms numeric,
  sqft int,
  lot_size numeric,
  year_built int,
  property_type text, -- 'Single Family', 'Condo', etc.

  -- Listing info
  mls_id text,
  status text default 'active', -- 'active', 'pending', 'sold', 'off-market'
  listing_type text default 'sale', -- 'sale', 'rent'

  -- Media
  images text[] default '{}',
  primary_image_index int default 0,

  -- Description
  description text,
  features text[] default '{}',

  -- Timestamps
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Enable RLS
alter table properties enable row level security;

-- Policies
create policy "Users can view own properties"
  on properties for select
  using (auth.uid() = user_id);

create policy "Users can insert own properties"
  on properties for insert
  with check (auth.uid() = user_id);

create policy "Users can update own properties"
  on properties for update
  using (auth.uid() = user_id);

create policy "Users can delete own properties"
  on properties for delete
  using (auth.uid() = user_id);

-- Index for faster lookups
create index properties_user_id_idx on properties(user_id);

-- ============================================
-- CAMPAIGNS
-- ============================================
create table campaigns (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references profiles(id) on delete cascade not null,
  property_id uuid references properties(id) on delete cascade not null,

  -- Status
  status text default 'draft', -- 'draft', 'pending_payment', 'processing', 'running', 'paused', 'completed'

  -- Videos
  video_urls jsonb default '{}', -- { property: 'url', influencer: 'url' }

  -- Meta Ads
  meta_campaign_id text,
  meta_ad_set_id text,

  -- Budget & Schedule
  budget numeric,
  daily_budget numeric,
  start_date date,
  end_date date,

  -- Targeting
  targeting jsonb default '{}', -- { zip_codes: [], radius: 25, interests: [] }

  -- Ad Creative
  ad_copy jsonb default '{}', -- { headline: '', primary_text: '', cta: '' }

  -- Timestamps
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Enable RLS
alter table campaigns enable row level security;

-- Policies
create policy "Users can view own campaigns"
  on campaigns for select
  using (auth.uid() = user_id);

create policy "Users can insert own campaigns"
  on campaigns for insert
  with check (auth.uid() = user_id);

create policy "Users can update own campaigns"
  on campaigns for update
  using (auth.uid() = user_id);

create policy "Users can delete own campaigns"
  on campaigns for delete
  using (auth.uid() = user_id);

-- Indexes
create index campaigns_user_id_idx on campaigns(user_id);
create index campaigns_property_id_idx on campaigns(property_id);
create index campaigns_status_idx on campaigns(status);

-- ============================================
-- CAMPAIGN METRICS (daily snapshots)
-- ============================================
create table campaign_metrics (
  id uuid primary key default uuid_generate_v4(),
  campaign_id uuid references campaigns(id) on delete cascade not null,

  -- Metrics
  impressions int default 0,
  clicks int default 0,
  spend numeric default 0,
  leads int default 0,

  -- Date
  date date not null,

  -- Timestamps
  created_at timestamptz default now() not null
);

-- Enable RLS
alter table campaign_metrics enable row level security;

-- Policy via campaign ownership
create policy "Users can view own campaign metrics"
  on campaign_metrics for select
  using (
    exists (
      select 1 from campaigns
      where campaigns.id = campaign_metrics.campaign_id
      and campaigns.user_id = auth.uid()
    )
  );

-- Index
create index campaign_metrics_campaign_id_idx on campaign_metrics(campaign_id);
create index campaign_metrics_date_idx on campaign_metrics(date);

-- ============================================
-- PAYMENTS
-- ============================================
create table payments (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references profiles(id) on delete cascade not null,
  campaign_id uuid references campaigns(id) on delete set null,

  -- Stripe
  stripe_payment_intent_id text unique,
  stripe_checkout_session_id text,

  -- Amount
  amount numeric not null,
  currency text default 'usd',

  -- Status
  status text default 'pending', -- 'pending', 'succeeded', 'failed', 'refunded'

  -- Timestamps
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Enable RLS
alter table payments enable row level security;

-- Policies
create policy "Users can view own payments"
  on payments for select
  using (auth.uid() = user_id);

-- Indexes
create index payments_user_id_idx on payments(user_id);
create index payments_campaign_id_idx on payments(campaign_id);
create index payments_stripe_payment_intent_id_idx on payments(stripe_payment_intent_id);

-- ============================================
-- UPDATED_AT TRIGGER
-- ============================================
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Apply to all tables with updated_at
create trigger update_profiles_updated_at
  before update on profiles
  for each row execute procedure update_updated_at_column();

create trigger update_properties_updated_at
  before update on properties
  for each row execute procedure update_updated_at_column();

create trigger update_campaigns_updated_at
  before update on campaigns
  for each row execute procedure update_updated_at_column();

create trigger update_payments_updated_at
  before update on payments
  for each row execute procedure update_updated_at_column();
