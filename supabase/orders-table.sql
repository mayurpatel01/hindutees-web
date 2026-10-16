-- Orders table for HinduTee.com checkout
-- Run this in your Supabase SQL editor

create table if not exists orders (
  id uuid primary key default gen_random_uuid(),

  -- Payment
  stripe_session_id     text unique,
  stripe_payment_intent_id text,

  -- Fulfillment
  gelato_order_id       text,
  gelato_error          text,

  -- Status
  -- pending_payment → paid → gelato_placed → shipped
  -- (error paths: paid_no_address, paid_variant_error, gelato_error)
  status                text not null default 'pending_payment',

  -- Order contents: [{key, assetId, slug, title, size, price, gelatoProductId, fileUrl}]
  items                 jsonb not null default '[]',

  -- Shipping address collected by Stripe
  shipping_address      jsonb,

  -- Financials
  total_usd             numeric(10,2),
  customer_email        text,

  created_at            timestamptz not null default now(),
  updated_at            timestamptz not null default now()
);

-- Index for looking up by Stripe session (webhook uses this)
create index if not exists orders_stripe_session_id_idx on orders (stripe_session_id);
create index if not exists orders_status_idx on orders (status);
create index if not exists orders_created_at_idx on orders (created_at desc);

-- Auto-update updated_at
create or replace function update_orders_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists orders_updated_at on orders;
create trigger orders_updated_at
  before update on orders
  for each row execute function update_orders_updated_at();

-- RLS: orders are private (no anonymous reads)
alter table orders enable row level security;
-- Service role key bypasses RLS — used by API routes and webhook
-- No public access policy needed
