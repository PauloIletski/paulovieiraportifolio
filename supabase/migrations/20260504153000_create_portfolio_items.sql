create extension if not exists pgcrypto;

create table if not exists public.portfolio_items (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  summary text,
  description text,
  category text not null,
  tags text[] not null default '{}',
  status text not null default 'draft',
  image_url text,
  image_public_id text,
  external_url text,
  sort_order integer not null default 0,
  featured boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint portfolio_items_category_check check (
    category in ('skill', 'project', 'experience', 'education', 'certification')
  ),
  constraint portfolio_items_status_check check (
    status in ('draft', 'published')
  )
);

create index if not exists portfolio_items_status_idx
  on public.portfolio_items (status);

create index if not exists portfolio_items_category_idx
  on public.portfolio_items (category);

create index if not exists portfolio_items_featured_idx
  on public.portfolio_items (featured)
  where featured = true;

create index if not exists portfolio_items_sort_order_idx
  on public.portfolio_items (sort_order, created_at desc);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_portfolio_items_updated_at on public.portfolio_items;

create trigger set_portfolio_items_updated_at
before update on public.portfolio_items
for each row
execute function public.set_updated_at();

alter table public.portfolio_items enable row level security;

drop policy if exists "Public can read published portfolio items"
  on public.portfolio_items;

create policy "Public can read published portfolio items"
on public.portfolio_items
for select
using (status = 'published');
