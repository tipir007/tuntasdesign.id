# designtuntas.id — Fase 1 (web)

## Menjalankan lokal

Path folder parent mengandung `&` (Windows). Gunakan PowerShell:

```powershell
Set-Location -LiteralPath "D:\Resume CV & Konsultan Skripsi online\web"
npm run dev
```

Buka http://localhost:3000

## Environment

Salin `.env.example` → `.env.local`:

- `OPENROUTER_API_KEY` — wajib untuk Tuti AI
- `NEXT_PUBLIC_SITE_URL` — `http://localhost:3000` (lokal) atau URL Vercel

## Deploy Vercel (gratis / Hobby)

1. Push repo ke GitHub (root monorepo atau folder `web`)
2. Import di Vercel → Root Directory = `web`
3. Isi Environment Variables sama seperti `.env.local`
4. Deploy — dapatkan URL `*.vercel.app`

Domain `designtuntas.id` ditunda sampai siap beli.
