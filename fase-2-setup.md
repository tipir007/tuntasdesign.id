# Fase 2 Setup — Order system (gratis)

Ikuti langkah ini sekali agar form order, lacak status, dan admin aktif di Vercel.

## 1. Buat project Supabase (free)

1. Buka https://supabase.com → New project
2. Simpan **Project URL** dan **service_role** key (Settings → API)
3. Di SQL Editor, jalankan:

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

-- Server memakai service_role; kunci RLS ketat untuk anon
alter table public.orders enable row level security;
```

## 2. (Disarankan) Resend untuk email order baru

1. https://resend.com → API key
2. Verifikasi domain pengirim, atau pakai `onboarding@resend.dev` untuk uji

## 3. Env di lokal & Vercel

Tambahkan ke `web/.env.local` dan Vercel → Project → Settings → Environment Variables:

```
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
ADMIN_SECRET=ganti-dengan-string-rahasia-panjang
ADMIN_EMAIL=christopherhamonangan007@gmail.com
RESEND_API_KEY=
RESEND_FROM=designtuntas <onboarding@resend.dev>
```

`ADMIN_SECRET` dipakai untuk membuka `/admin/orders?secret=...`

## 4. Uji

- `/order` → submit form → dapat kode `DT-XXXX`
- `/lacak?kode=DT-XXXX` → status `baru`
- `/admin/orders?secret=...` → ubah status

Tanpa env Supabase, API mengembalikan error konfigurasi (halaman tetap tampil).
