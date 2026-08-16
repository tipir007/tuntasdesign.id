# tuntasdesign.id / designtuntas.id

Website jasa: Resume CV, Konsultasi Skripsi, Design Visual, dan Design 3D.

- **Live:** https://designtuntas.vercel.app
- **Brand:** designtuntas.id
- **Stack:** Next.js + Tuti AI (OpenRouter) + WhatsApp CTA
- **App folder:** [`web/`](web/)

## Development

```powershell
Set-Location -LiteralPath "web"
copy .env.example .env.local
# isi OPENROUTER_API_KEY
npm install
npm run dev
```

## Environment

Lihat `web/.env.example`:

- `OPENROUTER_API_KEY` (server only)
- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_WA_NUMBER`

Jangan commit file `.env.local`.

## Deploy

Vercel Hobby — Root Directory = `web`.
