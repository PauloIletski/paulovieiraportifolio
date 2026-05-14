create table if not exists public.site_content_items (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null,
  section text not null,
  content_type text not null,
  label text,
  summary text,
  description text,
  href text,
  image_url text,
  image_public_id text,
  icon text,
  tags text[] not null default '{}',
  metadata jsonb not null default '{}'::jsonb,
  status text not null default 'draft',
  sort_order integer not null default 0,
  featured boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint site_content_items_section_check check (
    section in (
      'menu',
      'hero',
      'showcase',
      'skills',
      'projects',
      'experiences',
      'network',
      'floatingButtons',
      'footer'
    )
  ),
  constraint site_content_items_content_type_check check (
    content_type in (
      'nav_link',
      'highlight',
      'stat',
      'step',
      'competency',
      'skill_group',
      'project_card',
      'experience_card',
      'social_link',
      'footer_link'
    )
  ),
  constraint site_content_items_status_check check (
    status in ('draft', 'published')
  ),
  constraint site_content_items_section_slug_key unique (section, slug)
);

create index if not exists site_content_items_section_idx
  on public.site_content_items (section);

create index if not exists site_content_items_content_type_idx
  on public.site_content_items (content_type);

create index if not exists site_content_items_status_idx
  on public.site_content_items (status);

create index if not exists site_content_items_sort_order_idx
  on public.site_content_items (section, sort_order, created_at desc);

create index if not exists site_content_items_featured_idx
  on public.site_content_items (featured)
  where featured = true;

drop trigger if exists set_site_content_items_updated_at
  on public.site_content_items;

create trigger set_site_content_items_updated_at
before update on public.site_content_items
for each row
execute function public.set_updated_at();

alter table public.site_content_items enable row level security;

drop policy if exists "Public can read published site content items"
  on public.site_content_items;

create policy "Public can read published site content items"
on public.site_content_items
for select
using (status = 'published');
