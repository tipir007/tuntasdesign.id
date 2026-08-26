-- Jalankan di Supabase SQL Editor (satu kali)
-- Project: oedtiutsxyvitldrtypr

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  service text not null check (service in ('cv', 'skripsi', 'visual', '3d')),
  name text not null,
  contact text not null,
  brief text not null,
  deadline text,
  status text not null default 'baru'
    check (status in ('baru', 'diproses', 'revisi', 'selesai')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists orders_code_idx on public.orders (code);
create index if not exists orders_created_at_idx on public.orders (created_at desc);

alter table public.orders enable row level security;

drop policy if exists orders_anon_insert on public.orders;
drop policy if exists orders_anon_select on public.orders;
drop policy if exists orders_anon_update on public.orders;

create policy orders_anon_insert on public.orders
  for insert to anon, authenticated
  with check (true);

create policy orders_anon_select on public.orders
  for select to anon, authenticated
  using (true);

create policy orders_anon_update on public.orders
  for update to anon, authenticated
  using (true)
  with check (true);

grant usage on schema public to anon, authenticated;
grant select, insert, update on public.orders to anon, authenticated;
