-- Jalankan di Supabase SQL Editor (satu kali, setelah create_orders.sql)
-- Pelacakan pengunjung: page_views + agregasi via RPC

create table if not exists public.page_views (
  id uuid primary key default gen_random_uuid(),
  path text not null,
  visitor_id text not null,
  created_at timestamptz not null default now()
);

create index if not exists page_views_created_at_idx on public.page_views (created_at desc);
create index if not exists page_views_visitor_id_idx on public.page_views (visitor_id);
create index if not exists page_views_path_idx on public.page_views (path);

alter table public.page_views enable row level security;

drop policy if exists page_views_anon_insert on public.page_views;

create policy page_views_anon_insert on public.page_views
  for insert to anon, authenticated
  with check (true);

-- Agregat all-time + hari ini (WIB)
create or replace function public.analytics_summary()
returns json
language sql
stable
security definer
set search_path = public
as $$
  select json_build_object(
    'pageviews', (select count(*)::int from page_views),
    'unique_visitors', (select count(distinct visitor_id)::int from page_views),
    'pageviews_today', (
      select count(*)::int from page_views
      where (created_at at time zone 'Asia/Jakarta')::date = (now() at time zone 'Asia/Jakarta')::date
    ),
    'unique_visitors_today', (
      select count(distinct visitor_id)::int from page_views
      where (created_at at time zone 'Asia/Jakarta')::date = (now() at time zone 'Asia/Jakarta')::date
    )
  );
$$;

create or replace function public.analytics_top_paths(limit_count int default 5)
returns json
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(
    json_agg(row_to_json(t) order by t.views desc),
    '[]'::json
  )
  from (
    select path, count(*)::int as views
    from page_views
    group by path
    order by views desc
    limit greatest(1, least(limit_count, 20))
  ) t;
$$;

grant usage on schema public to anon, authenticated;
grant insert on public.page_views to anon, authenticated;
grant execute on function public.analytics_summary() to anon, authenticated;
grant execute on function public.analytics_top_paths(int) to anon, authenticated;
