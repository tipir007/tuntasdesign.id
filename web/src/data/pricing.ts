export type PriceRow = {
  item: string;
  price: string;
};

export type PriceTable = {
  heading?: string;
  rows: PriceRow[];
};

export type PriceGroup = {
  id: string;
  title: string;
  duration: string;
  notes?: string[];
  tables: PriceTable[];
};

export const PRICE_GROUPS: PriceGroup[] = [
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
          { item: "Bab I (Pendahuluan)", price: "Rp 200.000" },
          { item: "Bab I (Pendahuluan) Bahasa Inggris", price: "Rp 220.000" },
          { item: "Bab II (Tinjauan Pustaka)", price: "Rp 400.000" },
          { item: "Bab II (Tinjauan Pustaka) Bahasa Inggris", price: "Rp 420.000" },
          { item: "Bab III (Metodologi)", price: "Rp 200.000" },
          { item: "Bab III (Metodologi) Bahasa Inggris", price: "Rp 220.000" },
          { item: "Bab IV (Hasil & Pembahasan)", price: "Rp 650.000" },
          { item: "Bab IV (Hasil & Pembahasan) Bahasa Inggris", price: "Rp 800.000" },
          { item: "Bab V (Kesimpulan & Saran)", price: "Rp 650.000" },
          { item: "Bab V (Kesimpulan & Saran) Bahasa Inggris", price: "Rp 220.000" },
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
          { item: "Domestik (gambar teknik, animasi, karakter, interior)", price: "Rp 150.000–300.000" },
          { item: "Internasional", price: "USD 20–50" }
        ]
      }
    ]
  }
];

export const PRICE_POLICIES = [
  "DP 50% sebelum pengerjaan",
  "Revisi selama proses hingga klien nyatakan valid",
  "Tidak ada refund (disepakati dari awal)",
  "Pembayaran: DANA, transfer bank, MasterCard",
  "Penawaran final via WhatsApp"
] as const;

export function formatPricingForPrompt(): string {
  return PRICE_GROUPS.map((group) => {
    const tables = group.tables
      .map((table) => {
        const heading = table.heading ? `${table.heading}:\n` : "";
        const rows = table.rows.map((row) => `- ${row.item}: ${row.price}`).join("\n");
        return `${heading}${rows}`;
      })
      .join("\n");
    const notes = (group.notes ?? []).map((note) => `- ${note}`).join("\n");
    return `${group.title}\nDuration: ${group.duration}${notes ? `\n${notes}` : ""}\n${tables}`;
  }).join("\n\n");
}
