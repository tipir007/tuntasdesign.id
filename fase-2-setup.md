# Fase 2 Setup — Order system (gratis)

Ikuti langkah ini sekali agar form order, lacak status, dan admin aktif di Vercel.

## 1. Buat project Supabase (free)

1. Buka https://supabase.com → New project
2. Simpan **Project URL**
3. Key server (salah satu):
   - **service_role** (paling aman, recommended), atau
   - **publishable / anon** (boleh untuk soft launch; jangan di-commit ke git publik sebagai `NEXT_PUBLIC_`)
4. Di SQL Editor, jalankan **seluruh** script di bawah:

```sql
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

-- Soft launch: izinkan akses via anon/publishable key dari server Next.js saja
-- (key tidak di-expose ke browser). Nanti bisa diperketat + ganti service_role.
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
```

## 2. (Disarankan) Resend untuk email order baru

1. https://resend.com → API key
2. Verifikasi domain pengirim, atau pakai `onboarding@resend.dev` untuk uji

## 3. Env di lokal & Vercel

Tambahkan ke `web/.env.local` dan Vercel → Project → Settings → Environment Variables:

```
SUPABASE_URL=https://YOUR_PROJECT.supabase.co
SUPABASE_ANON_KEY=sb_publishable_...   # atau SUPABASE_SERVICE_ROLE_KEY=...
ADMIN_SECRET=ganti-dengan-string-rahasia-panjang
ADMIN_EMAIL=christopherhamonangan007@gmail.com
RESEND_API_KEY=
RESEND_FROM=designtuntas <onboarding@resend.dev>
```

`ADMIN_SECRET` dipakai untuk membuka `/admin/orders?secret=...`

Setelah mengubah env di Vercel: **Redeploy** Production.

## 4. Uji

- `/order` → submit form → dapat kode `DT-XXXX`
- `/lacak?kode=DT-XXXX` → status `baru`
- `/admin/orders?secret=...` → ubah status

Tanpa env Supabase, API mengembalikan error konfigurasi (halaman tetap tampil).
