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
  location: "Berbasis Bogor, layanan online se-Indonesia",
  instagramHandle: "designtuntas",
  instagramUrl: "https://instagram.com/designtuntas"
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
    title: "Resume Profesional ATS",
    category: "CV",
    note: "Data engineer & PM, identitas fiktif",
    image: "/portfolio/portfolio-cv-ats.jpg",
    pdf: "/portfolio/cv/cv-profesional-data-engineer.pdf"
  },
  {
    title: "CV Maintenance & Instrumentasi",
    category: "CV",
    note: "Teknisi industri, data disamarkan",
    image: "/portfolio/portfolio-cv-instrumentasi.jpg",
    pdf: "/portfolio/cv/cv-maintenance-instrumentasi.pdf"
  },
  {
    title: "CV Accounting Programmer",
    category: "CV",
    note: "Fresh graduate D3, magna cum laude",
    image: "/portfolio/portfolio-cv-accounting.jpg",
    pdf: "/portfolio/cv/cv-accounting-programmer.pdf"
  },
  {
    title: "CV Fresh Graduate",
    category: "CV",
    note: "Mahasiswa S1 Teknologi Pangan, anonim",
    image: "/portfolio/portfolio-cv-fresh.jpg",
    pdf: "/portfolio/cv/cv-fresh-graduate-teknologi-pangan.pdf"
  },
  {
    title: "Outline Skripsi",
    category: "Skripsi",
    note: "Struktur bab, tanpa data pribadi",
    image: "/portfolio/portfolio-skripsi-outline.jpg"
  },
  {
    title: "Sampul Sempro",
    category: "Skripsi",
    note: "Contoh naskah anonim S1 Teknik",
    image: "/portfolio/portfolio-skripsi-sempro.jpg"
  },
  {
    title: "Poster Seminar",
    category: "Visual",
    note: "Poster event kampus (sample)",
    image: "/portfolio/portfolio-poster-event.jpg"
  },
  {
    title: "Logo UMKM",
    category: "Visual",
    note: "Identitas Kopi Savana (sample)",
    image: "/portfolio/portfolio-logo-umkm.jpg"
  },
  {
    title: "Feed Instagram",
    category: "Visual",
    note: "Sistem visual toko tanaman (sample)",
    image: "/portfolio/portfolio-feed-ig.jpg"
  },
  {
    title: "Gambar Teknik — Food Crusher",
    category: "3D",
    note: "Drawing assembly mesin food crusher (SolidWorks)",
    image: "/portfolio/3d/portfolio-3d-food-crusher-anon.png"
  },
  {
    title: "Gambar Teknik — Dudukan Pisau",
    category: "3D",
    note: "Detail part dudukan pisau cutmix (SolidWorks)",
    image: "/portfolio/3d/portfolio-3d-dudukan-pisau-anon.png"
  },
  {
    title: "Model 3D — Kapal Nelayan",
    category: "3D",
    note: "Scene Blender, render still frame",
    image: "/portfolio/3d/portfolio-3d-kapal-nelayan.png"
  },
  {
    title: "Desain 3D — Layout Pabrik Makanan",
    category: "3D",
    note: "Layout pabrik makanan, SketchUp",
    image: "/portfolio/3d/portfolio-3d-packing-bumbu.png"
  },
  {
    title: "Animasi 3D — Study Scene",
    category: "3D",
    note: "Character & environment render, Blender",
    image: "/portfolio/3d/portfolio-3d-animasi-study.png"
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
