export const BRAND = {
  name: "designtuntas.id",
  shortName: "DesignTuntas",
  tagline: "Siap menyelesaikan masalah Anda sampai tuntas.",
  assistantName: "Tuti",
  whatsappDisplay: "088901178816",
  whatsappE164: "6288901178816",
  emails: [
    "christopherhamonangan007@gmail.com",
    "kevinmorgan256@gmail.com"
  ],
  hours: "08.00–22.00 WIB",
  responseEta: "sekitar 15 menit pada jam operasional",
  location: "Berbasis Bogor, layanan online se-Indonesia"
} as const;

export const SERVICES = [
  {
    id: "cv",
    title: "Resume / CV / Portofolio",
    summary:
      "CV dari nol hingga siap lamar: penulisan, format rapi, dan ATS-friendly. Hasil PDF & Word.",
    duration: "1–3 hari (paling cepat 1×24 jam)",
    priceFrom: "Rp 50.000",
    highlights: [
      "Fresh graduate, career switcher, profesional",
      "Format PDF dan Word",
      "Revisi selama proses hingga dinyatakan valid"
    ]
  },
  {
    id: "skripsi",
    title: "Konsultasi & Bantuan Skripsi",
    summary:
      "Mode A: bantuan penyusunan/penulisan naskah. Mode B: konsultasi/review. Fokus S1 Teknik.",
    duration: "1 minggu–1 bulan",
    priceFrom: "dari Rp 200.000 / bab",
    highlights: [
      "Proposal, bab, analisis data, review",
      "Tidak menjamin kelulusan atau nilai",
      "Paket Sempro, Semhas, dan Full tersedia"
    ]
  },
  {
    id: "visual",
    title: "Design Visual",
    summary:
      "Poster, logo, banner, feed IG, presentasi, dan materi visual lain sesuai brief.",
    duration: "1–8 hari tergantung jenis",
    priceFrom: "dari Rp 15.000",
    highlights: [
      "PNG / PDF / PSD sesuai kebutuhan",
      "Tidak termasuk editing video",
      "Brief: tujuan, warna, teks, ukuran media"
    ]
  },
  {
    id: "3d",
    title: "Design 3D",
    summary:
      "Gambar teknik, animasi 3D, karakter, dan interior dengan SolidWorks & Blender.",
    duration: "4–30 hari tergantung jenis",
    priceFrom: "Rp 150.000–300.000",
    highlights: [
      "Engineering & non-engineering",
      "Format Blender / SolidWorks",
      "File animasi di atas ~2GB tidak dilayani"
    ]
  }
] as const;

export const PROCESS_STEPS = [
  { title: "Chat", detail: "Hubungi WhatsApp atau tanya Tuti dulu." },
  { title: "Brief", detail: "Kirim kebutuhan, file, dan deadline." },
  { title: "Konfirmasi", detail: "Sepakati ruang lingkup + DP 50%." },
  { title: "Pengerjaan", detail: "Tim mengerjakan sesuai brief." },
  { title: "Revisi", detail: "Revisi hingga dinyatakan valid." },
  { title: "Tuntas", detail: "Pelunasan, file final, selesai." }
] as const;

export const PORTFOLIO_ITEMS = [
  {
    title: "Resume ATS",
    category: "CV",
    note: "Contoh format profesional (placeholder)"
  },
  {
    title: "Paket Sempro",
    category: "Skripsi",
    note: "Struktur proposal yang rapi (placeholder)"
  },
  {
    title: "Poster & Feed",
    category: "Visual",
    note: "Sample visual brand (placeholder)"
  },
  {
    title: "Gambar Teknik",
    category: "3D",
    note: "Visualisasi engineering (placeholder)"
  }
] as const;

export const STARTER_PROMPTS = [
  "Layanan apa saja yang tersedia?",
  "Berapa lama buat Resume/CV?",
  "Konsultasi skripsi mencakup apa?",
  "Bisa bantu design visual untuk apa saja?",
  "Design 3D yang dilayani apa?",
  "Bagaimana cara order?",
  "Berapa kisaran harganya?"
] as const;
