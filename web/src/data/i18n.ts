export type Locale = "id" | "en";

export const LOCALES: Locale[] = ["id", "en"];
export const LOCALE_STORAGE_KEY = "designtuntas-locale";

type ServiceCopy = {
  title: string;
  summary: string;
  duration: string;
  priceFrom: string;
  highlights: string[];
};

type ProcessStep = { title: string; detail: string };

type PortfolioCopy = { title: string; category: string; note: string };

type PriceRow = { item: string; price: string };
type PriceTable = { heading?: string; rows: PriceRow[] };
type PriceGroup = {
  id: string;
  title: string;
  duration: string;
  notes?: string[];
  tables: PriceTable[];
};

export type Dictionary = {
  nav: {
    services: string;
    pricing: string;
    howItWorks: string;
    tuti: string;
    portfolio: string;
    whatsapp: string;
  };
  hero: {
    headline: string;
    support: string;
    ctaWa: string;
    ctaTuti: string;
    waMessage: string;
  };
  services: {
    eyebrow: string;
    title: string;
    intro: string;
    items: Record<string, ServiceCopy>;
  };
  pricing: {
    eyebrow: string;
    title: string;
    intro: string;
    cta: string;
    waMessage: string;
    policies: string[];
    groups: PriceGroup[];
  };
  howItWorks: {
    eyebrow: string;
    title: string;
    steps: ProcessStep[];
  };
  tuti: {
    eyebrow: string;
    title: string;
    intro: string;
    ctaWa: string;
    waMessage: string;
    placeholder: string;
    send: string;
    welcome: string;
    starterPrompts: string[];
    errRateLimit: string;
    errUnavailable: string;
    errGeneric: string;
  };
  portfolio: {
    eyebrow: string;
    title: string;
    intro: string;
    viewDownload: string;
    download: string;
    items: PortfolioCopy[];
  };
  cta: {
    title: string;
    body: string;
    button: string;
    waMessage: string;
  };
  footer: {
    services: string;
    contact: string;
    priceList: string;
    rights: string;
    visitorStats: (unique: number, views: number) => string;
  };
  brand: {
    tagline: string;
    location: string;
    hours: string;
  };
};

const pricingId: PriceGroup[] = [
  {
    id: "cv",
    title: "Resume / CV",
    duration: "1–3 hari (paling cepat 1×24 jam)",
    tables: [
      {
        rows: [
          { item: "CV ATS-friendly, Bahasa Indonesia, PDF & Word", price: "Rp 50.000" },
          { item: "CV kreatif, Bahasa Indonesia, PDF saja", price: "Rp 26.000" },
          { item: "CV kreatif, Bahasa Inggris, PDF saja", price: "Rp 40.000" },
          { item: "CV ATS-friendly, Bahasa Inggris, PDF & Word", price: "Rp 70.000" }
        ]
      }
    ]
  },
  {
    id: "skripsi",
    title: "Skripsi",
    duration: "7–14 hari (tergantung kesulitan dan antrian). Tugas akademik: 1 minggu – 1 bulan.",
    notes: [
      "Fokus S1 Teknik (jurusan lain konfirmasi via WA).",
      "Tidak menjamin kelulusan/nilai. Harga dapat menyesuaikan deadline & tingkat kesulitan."
    ],
    tables: [
      {
        heading: "Per bab",
        rows: [
          { item: "Abstrak", price: "Rp 100.000" },
          { item: "Abstrak (Bahasa Inggris)", price: "Rp 150.000" },
          { item: "Bab I (Pendahuluan)", price: "Rp 200.000" },
          { item: "Bab I (Pendahuluan, Bahasa Inggris)", price: "Rp 220.000" },
          { item: "Bab II (Tinjauan Pustaka)", price: "Rp 400.000" },
          { item: "Bab II (Tinjauan Pustaka, Bahasa Inggris)", price: "Rp 420.000" },
          { item: "Bab III (Metodologi)", price: "Rp 200.000" },
          { item: "Bab III (Metodologi, Bahasa Inggris)", price: "Rp 220.000" },
          { item: "Bab IV (Hasil & Pembahasan)", price: "Rp 650.000" },
          { item: "Bab IV (Hasil & Pembahasan, Bahasa Inggris)", price: "Rp 800.000" },
          { item: "Bab V (Kesimpulan & Saran)", price: "Rp 650.000" },
          { item: "Bab V (Kesimpulan & Saran, Bahasa Inggris)", price: "Rp 220.000" },
          { item: "Revisi", price: "Rp 50.000" },
          { item: "Lampiran", price: "Rp 50.000" },
          { item: "Daftar isi / tabel / gambar / pustaka / nomor halaman", price: "Rp 25.000 /item" }
        ]
      },
      {
        heading: "Paket",
        rows: [
          { item: "Paket Sempro (Bab I–III)", price: "Rp 750.000" },
          { item: "Paket Semhas (Bab I–V)", price: "Rp 2.000.000" },
          { item: "Paket Full (Bab I–V + lampiran + daftar)", price: "Rp 2.500.000" }
        ]
      },
      {
        heading: "Tugas akademik",
        rows: [
          { item: "Jasa ketik Word", price: "Rp 10.000–25.000" },
          { item: "Makalah", price: "Rp 10.000–25.000" },
          { item: "Esai", price: "Rp 50.000" },
          { item: "PPT / Presentasi", price: "Rp 25.000–50.000" },
          { item: "Tugas sekolah", price: "Rp 15.000–50.000" },
          { item: "Tugas kuliah", price: "Rp 50.000–200.000" },
          { item: "Artikel (ilmiah)", price: "Rp 150.000" },
          { item: "Artikel (syarat lulus)", price: "Rp 400.000" }
        ]
      }
    ]
  },
  {
    id: "visual",
    title: "Design Visual",
    duration:
      "Poster 1–3 hari, Logo 2–3 hari, Banner 1–3 hari, Feed IG 1–2 hari, Presentasi 4–8 hari",
    notes: ["Format: PNG, PDF, PSD sesuai kebutuhan.", "Tidak termasuk editing video."],
    tables: [
      {
        heading: "Desain custom",
        rows: [
          { item: "Poster", price: "Rp 25.000–80.000" },
          { item: "ID card", price: "Rp 15.000–35.000" },
          { item: "Banner", price: "Rp 20.000–40.000" },
          { item: "Pamflet", price: "Rp 15.000–35.000" },
          { item: "Brosur", price: "Rp 20.000–50.000" },
          { item: "Journaling", price: "Rp 5.000 /halaman" },
          { item: "Stiker", price: "Rp 15.000–30.000" },
          { item: "Feed IG", price: "Rp 15.000–25.000" },
          { item: "Story IG", price: "Rp 15.000–25.000" },
          { item: "PPT", price: "Rp 5.000 /halaman" },
          { item: "Tipografi", price: "Rp 5.000–20.000" },
          { item: "Infografis", price: "Rp 15.000–30.000" },
          { item: "Kaos", price: "Rp 25.000–50.000" }
        ]
      },
      {
        heading: "Logo",
        rows: [
          { item: "Logo only (UMKM)", price: "Rp 50.000–100.000" },
          { item: "Logo only (corporate)", price: "Rp 200.000" },
          { item: "Logo + social media pack", price: "Rp 400.000" },
          { item: "Logo + brand guideline", price: "Rp 600.000" },
          { item: "Logo + brand identity pack", price: "Rp 1.000.000" }
        ]
      }
    ]
  },
  {
    id: "3d",
    title: "Design 3D",
    duration: "Gambar teknik 4–7 hari, Animasi/karakter 14–30 hari, Interior 7–21 hari",
    notes: [
      "Tools: SolidWorks, Blender.",
      "File animasi >2GB tidak dilayani. Harga final via WhatsApp."
    ],
    tables: [
      {
        rows: [
          {
            item: "Domestik (gambar teknik, animasi, karakter, interior)",
            price: "Rp 150.000–500.000"
          },
          {
            item: "Internasional (gambar teknik, animasi, karakter, interior)",
            price: "USD 20–50"
          }
        ]
      }
    ]
  }
];

const pricingEn: PriceGroup[] = [
  {
    id: "cv",
    title: "Resume / CV",
    duration: "1–3 days (fastest within 24 hours)",
    tables: [
      {
        rows: [
          { item: "ATS-friendly CV, Indonesian, PDF & Word", price: "Rp 50.000" },
          { item: "Creative CV, Indonesian, PDF only", price: "Rp 26.000" },
          { item: "Creative CV, English, PDF only", price: "Rp 40.000" },
          { item: "ATS-friendly CV, English, PDF & Word", price: "Rp 70.000" }
        ]
      }
    ]
  },
  {
    id: "skripsi",
    title: "Thesis",
    duration: "7–14 days (depends on difficulty and queue). Academic tasks: 1 week – 1 month.",
    notes: [
      "Focus: undergraduate Engineering (other majors confirm via WhatsApp).",
      "No guarantee of graduation/grades. Price may adjust for deadline & difficulty."
    ],
    tables: [
      {
        heading: "Per chapter",
        rows: [
          { item: "Abstract", price: "Rp 100.000" },
          { item: "Abstract (English)", price: "Rp 150.000" },
          { item: "Chapter I (Introduction)", price: "Rp 200.000" },
          { item: "Chapter I (Introduction, English)", price: "Rp 220.000" },
          { item: "Chapter II (Literature Review)", price: "Rp 400.000" },
          { item: "Chapter II (Literature Review, English)", price: "Rp 420.000" },
          { item: "Chapter III (Methodology)", price: "Rp 200.000" },
          { item: "Chapter III (Methodology, English)", price: "Rp 220.000" },
          { item: "Chapter IV (Results & Discussion)", price: "Rp 650.000" },
          { item: "Chapter IV (Results & Discussion, English)", price: "Rp 800.000" },
          { item: "Chapter V (Conclusion & Suggestions)", price: "Rp 650.000" },
          { item: "Chapter V (Conclusion & Suggestions, English)", price: "Rp 220.000" },
          { item: "Revision", price: "Rp 50.000" },
          { item: "Appendix", price: "Rp 50.000" },
          { item: "TOC / tables / figures / references / page numbers", price: "Rp 25.000 /item" }
        ]
      },
      {
        heading: "Packages",
        rows: [
          { item: "Proposal seminar package (Ch. I–III)", price: "Rp 750.000" },
          { item: "Final seminar package (Ch. I–V)", price: "Rp 2.000.000" },
          { item: "Full package (Ch. I–V + appendix + lists)", price: "Rp 2.500.000" }
        ]
      },
      {
        heading: "Academic tasks",
        rows: [
          { item: "Word typing", price: "Rp 10.000–25.000" },
          { item: "Paper / essay assignment", price: "Rp 10.000–25.000" },
          { item: "Essay", price: "Rp 50.000" },
          { item: "PPT / Presentation", price: "Rp 25.000–50.000" },
          { item: "School assignment", price: "Rp 15.000–50.000" },
          { item: "College assignment", price: "Rp 50.000–200.000" },
          { item: "Article (academic)", price: "Rp 150.000" },
          { item: "Article (graduation requirement)", price: "Rp 400.000" }
        ]
      }
    ]
  },
  {
    id: "visual",
    title: "Visual Design",
    duration: "Poster 1–3d, Logo 2–3d, Banner 1–3d, IG feed 1–2d, Presentation 4–8d",
    notes: ["Formats: PNG, PDF, PSD as needed.", "Video editing not included."],
    tables: [
      {
        heading: "Custom design",
        rows: [
          { item: "Poster", price: "Rp 25.000–80.000" },
          { item: "ID card", price: "Rp 15.000–35.000" },
          { item: "Banner", price: "Rp 20.000–40.000" },
          { item: "Pamphlet", price: "Rp 15.000–35.000" },
          { item: "Brochure", price: "Rp 20.000–50.000" },
          { item: "Journaling", price: "Rp 5.000 /page" },
          { item: "Sticker", price: "Rp 15.000–30.000" },
          { item: "IG feed", price: "Rp 15.000–25.000" },
          { item: "IG story", price: "Rp 15.000–25.000" },
          { item: "PPT", price: "Rp 5.000 /page" },
          { item: "Typography", price: "Rp 5.000–20.000" },
          { item: "Infographic", price: "Rp 15.000–30.000" },
          { item: "T-shirt design", price: "Rp 25.000–50.000" }
        ]
      },
      {
        heading: "Logo",
        rows: [
          { item: "Logo only (SME)", price: "Rp 50.000–100.000" },
          { item: "Logo only (corporate)", price: "Rp 200.000" },
          { item: "Logo + social media pack", price: "Rp 400.000" },
          { item: "Logo + brand guideline", price: "Rp 600.000" },
          { item: "Logo + brand identity pack", price: "Rp 1.000.000" }
        ]
      }
    ]
  },
  {
    id: "3d",
    title: "3D Design",
    duration: "Technical drawings 4–7d, Animation/character 14–30d, Interior 7–21d",
    notes: [
      "Tools: SolidWorks, Blender.",
      "Animated files >2GB not accepted. Final quote via WhatsApp."
    ],
    tables: [
      {
        rows: [
          {
            item: "Domestic (technical drawing, animation, character, interior)",
            price: "Rp 150.000–500.000"
          },
          {
            item: "International (technical drawing, animation, character, interior)",
            price: "USD 20–50"
          }
        ]
      }
    ]
  }
];

export const dictionaries: Record<Locale, Dictionary> = {
  id: {
    nav: {
      services: "Layanan",
      pricing: "Harga",
      howItWorks: "Cara kerja",
      tuti: "Tuti AI",
      portfolio: "Portofolio",
      whatsapp: "WhatsApp"
    },
    hero: {
      headline: "Desain & dokumen, sampai tuntas.",
      support:
        "Siap menyelesaikan masalah Anda sampai tuntas. Resume CV, bantuan skripsi, design visual, dan design 3D — satu pintu, proses jelas.",
      ctaWa: "Chat WhatsApp",
      ctaTuti: "Tanya Tuti AI",
      waMessage: "Halo, saya ingin order layanan designtuntas.id."
    },
    services: {
      eyebrow: "Layanan",
      title: "Empat jalur, satu janji: tuntas.",
      intro:
        "Mulai dari yang paling sering diminta — Resume CV dan skripsi — tanpa mengabaikan design visual dan 3D.",
      items: {
        cv: {
          title: "Resume / CV / Portofolio",
          summary:
            "CV dari nol hingga siap lamar: ATS-friendly atau kreatif, Bahasa Indonesia atau Inggris.",
          duration: "1–3 hari (paling cepat 1×24 jam)",
          priceFrom: "dari Rp 26.000",
          highlights: [
            "Fresh graduate, career switcher, profesional",
            "ATS: PDF & Word · Kreatif: PDF saja",
            "Revisi selama proses hingga dinyatakan valid"
          ]
        },
        skripsi: {
          title: "Konsultasi & Bantuan Skripsi",
          summary:
            "Mode A: bantuan penyusunan/penulisan naskah. Mode B: konsultasi/review. Fokus S1 Teknik.",
          duration: "7–14 hari (tugas 1 minggu–1 bulan)",
          priceFrom: "dari Rp 200.000 / bab",
          highlights: [
            "Proposal, bab, analisis data, review — ID & Inggris",
            "Tidak menjamin kelulusan atau nilai",
            "Paket Sempro, Semhas, Full, dan tugas akademik"
          ]
        },
        visual: {
          title: "Design Visual",
          summary: "Poster, logo, banner, feed IG, presentasi, dan materi visual lain sesuai brief.",
          duration: "1–8 hari tergantung jenis",
          priceFrom: "dari Rp 15.000",
          highlights: [
            "PNG / PDF / PSD sesuai kebutuhan",
            "Tidak termasuk editing video",
            "Brief: tujuan, warna, teks, ukuran media"
          ]
        },
        "3d": {
          title: "Design 3D",
          summary: "Gambar teknik, animasi 3D, karakter, dan interior dengan SolidWorks & Blender.",
          duration: "4–30 hari tergantung jenis",
          priceFrom: "Rp 150.000–500.000",
          highlights: [
            "Engineering & non-engineering",
            "Format Blender / SolidWorks",
            "File animasi di atas ~2GB tidak dilayani"
          ]
        }
      }
    },
    pricing: {
      eyebrow: "Harga",
      title: "Daftar harga, transparan.",
      intro:
        "Kisaran resmi designtuntas.id. Penawaran final menyesuaikan brief, deadline, dan tingkat kesulitan — konfirmasi via WhatsApp.",
      cta: "Konfirmasi via WhatsApp",
      waMessage: "Halo DesignTuntas, saya ingin konfirmasi harga layanan.",
      policies: [
        "DP 50% sebelum pengerjaan",
        "Revisi selama proses hingga klien nyatakan valid",
        "Tidak ada refund (disepakati dari awal)",
        "Pembayaran: DANA, transfer bank, MasterCard",
        "Penawaran final via WhatsApp"
      ],
      groups: pricingId
    },
    howItWorks: {
      eyebrow: "Cara kerja",
      title: "Dari chat sampai tuntas.",
      steps: [
        { title: "Chat", detail: "Hubungi WhatsApp atau tanya Tuti dulu." },
        { title: "Brief", detail: "Kirim kebutuhan, file, dan deadline." },
        { title: "Konfirmasi", detail: "Sepakati ruang lingkup + DP 50%." },
        { title: "Pengerjaan", detail: "Tim mengerjakan sesuai brief." },
        { title: "Revisi", detail: "Revisi hingga dinyatakan valid." },
        { title: "Tuntas", detail: "Pelunasan, file final, selesai." }
      ]
    },
    tuti: {
      eyebrow: "Tuti AI",
      title: "Tanya dulu, order belakangan.",
      intro:
        "Tuti menjawab seputar layanan, durasi, dan kisaran harga. Untuk brief panjang atau order, lanjut ke WhatsApp.",
      ctaWa: "Lanjut via WhatsApp",
      waMessage: "Halo, saya sudah chat dengan Tuti dan ingin lanjut order.",
      placeholder: "Tulis pertanyaan…",
      send: "Kirim",
      welcome:
        "Halo, saya Tuti, asisten AI designtuntas.id. Saya bisa bantu jelaskan layanan Resume CV, Konsultasi Skripsi, Design Visual, dan Design 3D. Mau mulai dari yang mana?",
      starterPrompts: [
        "Layanan apa saja yang tersedia?",
        "Berapa lama buat Resume/CV?",
        "Konsultasi skripsi mencakup apa?",
        "Bisa bantu design visual untuk apa saja?"
      ],
      errRateLimit: "Terlalu banyak permintaan. Tunggu sebentar lalu coba lagi.",
      errUnavailable: "Asisten sedang tidak tersedia. Coba lagi atau hubungi WhatsApp.",
      errGeneric: "Tidak bisa menghasilkan jawaban."
    },
    portfolio: {
      eyebrow: "Portofolio",
      title: "Cuplikan karya.",
      intro:
        "Sample starter — versi anonim siap unduh. CV tersedia PDF; karya 3D tersedia gambar teknik, model, dan animasi.",
      viewDownload: "Lihat & Unduh",
      download: "Unduh",
      items: [
        {
          title: "Resume Profesional ATS",
          category: "CV",
          note: "Data engineer & PM, identitas fiktif"
        },
        {
          title: "CV Maintenance & Instrumentasi",
          category: "CV",
          note: "Teknisi industri, data disamarkan"
        },
        {
          title: "CV Accounting Programmer",
          category: "CV",
          note: "Fresh graduate D3, magna cum laude"
        },
        {
          title: "CV Fresh Graduate",
          category: "CV",
          note: "Mahasiswa S1 Teknologi Pangan, anonim"
        },
        {
          title: "Outline Skripsi",
          category: "Skripsi",
          note: "Struktur bab, tanpa data pribadi"
        },
        {
          title: "Sampul Sempro",
          category: "Skripsi",
          note: "Contoh naskah anonim S1 Teknik"
        },
        {
          title: "Poster Seminar",
          category: "Visual",
          note: "Poster event kampus (sample)"
        },
        {
          title: "Logo UMKM",
          category: "Visual",
          note: "Identitas Kopi Savana (sample)"
        },
        {
          title: "Feed Instagram",
          category: "Visual",
          note: "Sistem visual toko tanaman (sample)"
        },
        {
          title: "Gambar Teknik — Food Crusher",
          category: "3D",
          note: "Drawing assembly mesin food crusher (SolidWorks)"
        },
        {
          title: "Gambar Teknik — Dudukan Pisau",
          category: "3D",
          note: "Detail part dudukan pisau cutmix (SolidWorks)"
        },
        {
          title: "Model 3D — Kapal Nelayan",
          category: "3D",
          note: "Scene Blender, render still frame"
        },
        {
          title: "Desain 3D — Layout Pabrik Makanan",
          category: "3D",
          note: "Layout pabrik makanan, SketchUp"
        },
        {
          title: "Animasi 3D — Study Scene",
          category: "3D",
          note: "Character & environment render, Blender"
        }
      ]
    },
    cta: {
      title: "Siap lanjut sampai tuntas?",
      body: "Chat WhatsApp {wa} · jam {hours}. Atau tanya Tuti AI dulu di atas.",
      button: "Buka WhatsApp",
      waMessage: "Halo DesignTuntas, saya siap order."
    },
    footer: {
      services: "Layanan",
      contact: "Kontak",
      priceList: "Daftar harga",
      rights: "Semua hak dilindungi.",
      visitorStats: (unique, views) => `${unique} pengunjung · ${views} kunjungan`
    },
    brand: {
      tagline: "Siap menyelesaikan masalah Anda sampai tuntas.",
      location: "Berbasis Bogor, layanan online se-Indonesia",
      hours: "08.00–22.00 WIB"
    }
  },
  en: {
    nav: {
      services: "Services",
      pricing: "Pricing",
      howItWorks: "How it works",
      tuti: "Tuti AI",
      portfolio: "Portfolio",
      whatsapp: "WhatsApp"
    },
    hero: {
      headline: "Design & documents, done thoroughly.",
      support:
        "Ready to solve your problems until completion. Resume/CV, thesis help, visual design, and 3D — one door, clear process.",
      ctaWa: "Chat on WhatsApp",
      ctaTuti: "Ask Tuti AI",
      waMessage: "Hi, I would like to order a designtuntas.id service."
    },
    services: {
      eyebrow: "Services",
      title: "Four paths, one promise: done thoroughly.",
      intro:
        "Start with what clients ask most — Resume/CV and thesis — without overlooking visual and 3D design.",
      items: {
        cv: {
          title: "Resume / CV / Portfolio",
          summary:
            "CV from scratch to job-ready: ATS-friendly or creative, Indonesian or English.",
          duration: "1–3 days (fastest within 24 hours)",
          priceFrom: "from Rp 26.000",
          highlights: [
            "Fresh graduates, career switchers, professionals",
            "ATS: PDF & Word · Creative: PDF only",
            "Revisions during the process until marked valid"
          ]
        },
        skripsi: {
          title: "Thesis Consulting & Support",
          summary:
            "Mode A: drafting/writing support. Mode B: consulting/review. Focus: Engineering bachelor's.",
          duration: "7–14 days (tasks 1 week–1 month)",
          priceFrom: "from Rp 200.000 / chapter",
          highlights: [
            "Proposal, chapters, data analysis, review — ID & English",
            "No guarantee of graduation or grades",
            "Seminar packages, full package, and academic tasks"
          ]
        },
        visual: {
          title: "Visual Design",
          summary: "Posters, logos, banners, IG feeds, presentations, and more based on your brief.",
          duration: "1–8 days depending on type",
          priceFrom: "from Rp 15.000",
          highlights: [
            "PNG / PDF / PSD as needed",
            "Video editing not included",
            "Brief: goal, colors, text, media size"
          ]
        },
        "3d": {
          title: "3D Design",
          summary: "Technical drawings, 3D animation, characters, and interiors with SolidWorks & Blender.",
          duration: "4–30 days depending on type",
          priceFrom: "Rp 150.000–500.000",
          highlights: [
            "Engineering & non-engineering",
            "Blender / SolidWorks formats",
            "Animated files over ~2GB not accepted"
          ]
        }
      }
    },
    pricing: {
      eyebrow: "Pricing",
      title: "Transparent price list.",
      intro:
        "Official ranges from designtuntas.id. Final quote depends on brief, deadline, and difficulty — confirm via WhatsApp.",
      cta: "Confirm via WhatsApp",
      waMessage: "Hi DesignTuntas, I would like to confirm service pricing.",
      policies: [
        "50% deposit before work starts",
        "Revisions during the process until the client marks it valid",
        "No refunds (agreed upfront)",
        "Payment: DANA, local bank transfer, MasterCard",
        "Final quote via WhatsApp"
      ],
      groups: pricingEn
    },
    howItWorks: {
      eyebrow: "How it works",
      title: "From chat to completion.",
      steps: [
        { title: "Chat", detail: "Message WhatsApp or ask Tuti first." },
        { title: "Brief", detail: "Send requirements, files, and deadline." },
        { title: "Confirm", detail: "Agree on scope + 50% deposit." },
        { title: "Production", detail: "We deliver according to the brief." },
        { title: "Revision", detail: "Revise until marked valid." },
        { title: "Done", detail: "Final payment, final files, complete." }
      ]
    },
    tuti: {
      eyebrow: "Tuti AI",
      title: "Ask first, order later.",
      intro:
        "Tuti explains services, timelines, and price ranges. For long briefs or orders, continue on WhatsApp.",
      ctaWa: "Continue on WhatsApp",
      waMessage: "Hi, I already chatted with Tuti and want to proceed with an order.",
      placeholder: "Write your question…",
      send: "Send",
      welcome:
        "Hi, I'm Tuti, the AI assistant for designtuntas.id. I can help explain Resume/CV, Thesis support, Visual Design, and 3D Design. Where would you like to start?",
      starterPrompts: [
        "What services do you offer?",
        "How long does a Resume/CV take?",
        "What does thesis support include?",
        "What visual design work can you help with?"
      ],
      errRateLimit: "Too many requests. Please wait a moment and try again.",
      errUnavailable: "The assistant is unavailable. Try again or contact WhatsApp.",
      errGeneric: "Could not generate an answer."
    },
    portfolio: {
      eyebrow: "Portfolio",
      title: "Work samples.",
      intro:
        "Starter samples — anonymized and downloadable. CVs as PDF; 3D work as technical drawings, models, and animation stills.",
      viewDownload: "View & Download",
      download: "Download",
      items: [
        {
          title: "Professional ATS Resume",
          category: "CV",
          note: "Data engineer & PM, fictional identity"
        },
        {
          title: "Maintenance & Instrumentation CV",
          category: "CV",
          note: "Industrial technician, anonymized"
        },
        {
          title: "Accounting Programmer CV",
          category: "CV",
          note: "D3 fresh graduate, magna cum laude"
        },
        {
          title: "Fresh Graduate CV",
          category: "CV",
          note: "Food Technology undergrad, anonymous"
        },
        {
          title: "Thesis Outline",
          category: "Thesis",
          note: "Chapter structure, no personal data"
        },
        {
          title: "Proposal Seminar Cover",
          category: "Thesis",
          note: "Anonymous Engineering bachelor sample"
        },
        {
          title: "Seminar Poster",
          category: "Visual",
          note: "Campus event poster (sample)"
        },
        {
          title: "SME Logo",
          category: "Visual",
          note: "Kopi Savana identity (sample)"
        },
        {
          title: "Instagram Feed",
          category: "Visual",
          note: "Plant shop visual system (sample)"
        },
        {
          title: "Technical Drawing — Food Crusher",
          category: "3D",
          note: "Food crusher assembly drawing (SolidWorks)"
        },
        {
          title: "Technical Drawing — Knife Holder",
          category: "3D",
          note: "Cutmix knife holder detail part (SolidWorks)"
        },
        {
          title: "3D Model — Fishing Boat",
          category: "3D",
          note: "Blender scene, still frame render"
        },
        {
          title: "3D Design — Food Factory Layout",
          category: "3D",
          note: "Food factory layout, SketchUp"
        },
        {
          title: "3D Animation — Study Scene",
          category: "3D",
          note: "Character & environment render, Blender"
        }
      ]
    },
    cta: {
      title: "Ready to get it done thoroughly?",
      body: "WhatsApp {wa} · hours {hours}. Or ask Tuti AI above first.",
      button: "Open WhatsApp",
      waMessage: "Hi DesignTuntas, I'm ready to order."
    },
    footer: {
      services: "Services",
      contact: "Contact",
      priceList: "Price list",
      rights: "All rights reserved.",
      visitorStats: (unique, views) => `${unique} visitors · ${views} views`
    },
    brand: {
      tagline: "Ready to solve your problems until completion.",
      location: "Based in Bogor, online across Indonesia",
      hours: "08:00–22:00 WIB"
    }
  }
};
