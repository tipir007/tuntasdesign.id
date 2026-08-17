#!/usr/bin/env python3
"""Generate anonymized sample CV PDFs for designtuntas.id portfolio."""

from __future__ import annotations

from pathlib import Path

import fitz
from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_JUSTIFY, TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import cm, mm
from reportlab.platypus import (
    HRFlowable,
    PageBreak,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
)

ROOT = Path(__file__).resolve().parents[1]
OUT_DIR = ROOT / "web" / "public" / "portfolio" / "cv"
FOOTER = "Contoh CV anonim — designtuntas.id · Identitas fiktif untuk portofolio"

styles = getSampleStyleSheet()
styles.add(
    ParagraphStyle(
        name="CVTitle",
        parent=styles["Heading1"],
        fontSize=16,
        leading=20,
        spaceAfter=4,
        textColor=colors.HexColor("#1a1a1a"),
    )
)
styles.add(
    ParagraphStyle(
        name="CVSubtitle",
        parent=styles["Normal"],
        fontSize=10,
        leading=13,
        spaceAfter=10,
        textColor=colors.HexColor("#333333"),
    )
)
styles.add(
    ParagraphStyle(
        name="CVContact",
        parent=styles["Normal"],
        fontSize=9,
        leading=12,
        spaceAfter=14,
        textColor=colors.HexColor("#444444"),
    )
)
styles.add(
    ParagraphStyle(
        name="CVSection",
        parent=styles["Heading2"],
        fontSize=11,
        leading=14,
        spaceBefore=10,
        spaceAfter=6,
        textColor=colors.HexColor("#0d7377"),
        borderPadding=2,
    )
)
styles.add(
    ParagraphStyle(
        name="CVBody",
        parent=styles["Normal"],
        fontSize=9,
        leading=12,
        spaceAfter=6,
        alignment=TA_JUSTIFY,
    )
)
styles.add(
    ParagraphStyle(
        name="CVBullet",
        parent=styles["Normal"],
        fontSize=9,
        leading=12,
        leftIndent=12,
        spaceAfter=3,
        bulletIndent=0,
    )
)
styles.add(
    ParagraphStyle(
        name="CVJobTitle",
        parent=styles["Normal"],
        fontSize=9,
        leading=12,
        spaceAfter=2,
        fontName="Helvetica-Bold",
    )
)
styles.add(
    ParagraphStyle(
        name="CVJobMeta",
        parent=styles["Normal"],
        fontSize=8.5,
        leading=11,
        spaceAfter=4,
        textColor=colors.HexColor("#555555"),
        fontName="Helvetica-Oblique",
    )
)
styles.add(
    ParagraphStyle(
        name="CVUpperTitle",
        parent=styles["Heading1"],
        fontSize=14,
        leading=16,
        alignment=TA_CENTER,
        spaceAfter=4,
        fontName="Helvetica-Bold",
    )
)
styles.add(
    ParagraphStyle(
        name="CVUpperSubtitle",
        parent=styles["Normal"],
        fontSize=10,
        leading=12,
        alignment=TA_CENTER,
        spaceAfter=12,
        fontName="Helvetica-Bold",
    )
)
styles.add(
    ParagraphStyle(
        name="CVUpperSection",
        parent=styles["Heading2"],
        fontSize=10,
        leading=12,
        spaceBefore=8,
        spaceAfter=4,
        fontName="Helvetica-Bold",
        textColor=colors.black,
    )
)
styles.add(
    ParagraphStyle(
        name="CVUpperBody",
        parent=styles["Normal"],
        fontSize=8.5,
        leading=11,
        spaceAfter=4,
    )
)
styles.add(
    ParagraphStyle(
        name="CVFooter",
        parent=styles["Normal"],
        fontSize=7,
        leading=9,
        textColor=colors.HexColor("#888888"),
        alignment=TA_CENTER,
    )
)


def add_footer(canvas, doc):
    canvas.saveState()
    canvas.setFont("Helvetica", 7)
    canvas.setFillColor(colors.HexColor("#888888"))
    canvas.drawCentredString(A4[0] / 2, 12 * mm, FOOTER)
    canvas.restoreState()


def bullet(text: str) -> Paragraph:
    return Paragraph(f"• {text}", styles["CVBullet"])


def section(title: str) -> list:
    return [Paragraph(title.upper(), styles["CVSection"]), HRFlowable(width="100%", thickness=0.5, color=colors.HexColor("#0d7377")), Spacer(1, 4)]


def build_cv_professional(path: Path) -> None:
    doc = SimpleDocTemplate(
        str(path),
        pagesize=A4,
        rightMargin=1.8 * cm,
        leftMargin=1.8 * cm,
        topMargin=1.5 * cm,
        bottomMargin=1.8 * cm,
    )
    story: list = []

    story.append(Paragraph("Rizky Aditya, ST., PMP", styles["CVTitle"]))
    story.append(
        Paragraph(
            "Project Management / Data Engineering / Data Science / Statistical Analysis",
            styles["CVSubtitle"],
        )
    )
    story.append(
        Paragraph(
            "Jakarta, Indonesia | +62 812-3456-7890 | rizky.aditya.sample@email.com | LinkedIn | Github",
            styles["CVContact"],
        )
    )

    story.extend(section("Summary"))
    story.append(
        Paragraph(
            "Results-driven professional with 6 years of experience in Project Management and a strong "
            "technical foundation in Data Engineering, Data Science, and Data Analytics. Skilled in designing "
            "and implementing data-driven solutions to optimize business processes and enhance decision-making. "
            "Proficient in Python, SQL, Machine Learning, and Statistical Analysis, with proven ability to "
            "translate complex data into actionable insights. Achievements include leading cross-functional "
            "projects that reduced operational downtime by 20%, developing predictive models that improved "
            "forecast accuracy by 30%, and implementing ETL pipelines that cut data processing time by 40%. "
            "Currently pursuing a Master's Degree in Statistics &amp; Data Science (2026–Present).",
            styles["CVBody"],
        )
    )

    story.extend(section("Skills"))
    for line in [
        "<b>General Skills:</b> Data Engineering, Data Science, Project Management, Data Analysis",
        "<b>Programming Language:</b> Python, JavaScript, SQL, HTML, CSS",
        "<b>Visualization Tools:</b> Tableau, Looker Studio, Canva",
        "<b>Libraries / Framework:</b> TensorFlow, Scikit-learn, Pyspark, Pandas, Numpy, Matplotlib, Seaborn, Node.js, React.js",
        "<b>Tools:</b> MS Project, Apache Airflow, Apache Kafka, Docker, Jupyter Notebook, PostgreSQL, MongoDB",
        "<b>Techniques:</b> ETL Automation Pipeline, Machine Learning, Time Series Forecast, Statistical Analysis",
    ]:
        story.append(Paragraph(line, styles["CVBody"]))

    story.extend(section("Projects"))
    projects = [
        (
            "Data Automation and Statistical Analysis for Retail F&B (Bootcamp Data Analytics)",
            "November 2025",
            "Developed an ETL automation pipeline that reduced data processing time by 45%. Performed statistical "
            "analysis and time-series forecasting on sales data, resulting in a 25% improvement in sales prediction accuracy.",
            "Pandas, Statsmodel, SQL, Pyspark, Airflow, MongoDB",
        ),
        (
            "Machine Learning Model for Image Processing (Online Course)",
            "October 2025",
            "Designed and trained a machine learning model for image classification, achieving 92% accuracy on test data.",
            "TensorFlow, Scikit-learn, Pandas, NumPy",
        ),
        (
            "Barcode System for Mixing Production (Manufacturing Company)",
            "December 2024",
            "Led a project to develop a barcode verification system for tracking raw material usage and implemented "
            "a poka-yoke mechanism. Reduced material waste by 15%.",
            "SQL, PLC Automation Software, Production Database",
        ),
    ]
    for title, date, desc, stack in projects:
        story.append(Paragraph(f"<b>{title}</b> &nbsp; <i>{date}</i>", styles["CVJobTitle"]))
        story.append(Paragraph(desc, styles["CVBody"]))
        story.append(Paragraph(f"<i>Tech Stack: {stack}</i>", styles["CVJobMeta"]))
        story.append(Spacer(1, 4))

    story.append(PageBreak())

    story.extend(section("Work Experiences"))
    jobs = [
        (
            "PT. Manufaktur Elastomer Indonesia Tbk.",
            "Bogor, Indonesia",
            "Assistant Manager Engineering Department",
            "December 2023 – Present",
            [
                "Lead preventive and predictive maintenance programs to improve equipment reliability",
                "Coordinate Engineering, Production, and Quality teams for continuous improvement",
                "Implement plant optimization and cost-saving initiatives to enhance efficiency",
                "Oversee audits and ensure compliance with operational standards",
            ],
        ),
        (
            "PT. Industri Pangan Nasional Tbk.",
            "Palembang, Indonesia",
            "Department Head, Engineering",
            "December 2019 – November 2023",
            [
                "Directed maintenance programs and major engineering projects",
                "Supervised 25 team members and ensured operational excellence",
                "Managed department budget and executed cost reduction initiatives",
                "Led internal audits to maintain safety and quality compliance",
            ],
        ),
    ]
    for company, loc, role, period, items in jobs:
        story.append(Paragraph(f"<b>{company}</b> &nbsp; {loc}", styles["CVJobTitle"]))
        story.append(Paragraph(f"{role} &nbsp; <i>{period}</i>", styles["CVJobMeta"]))
        for item in items:
            story.append(bullet(item))
        story.append(Spacer(1, 6))

    story.extend(section("Educations"))
    edus = [
        ("Universitas Terkemuka Indonesia", "Bogor, Indonesia", "Master's Degree in Statistics & Data Science (Ongoing)", "January 2026 – Present"),
        ("Bootcamp Data Analytics", "Jakarta, Indonesia", "Data Analyst Program. Score: 91.2% (Passed)", "August 2025 – November 2025"),
        ("Institut Teknologi Nasional", "Surabaya, Indonesia", "Bachelor of Engineering Physics. GPA: 3.30 (Passed)", "August 2015 – August 2019"),
    ]
    for uni, loc, degree, period in edus:
        story.append(Paragraph(f"<b>{uni}</b> &nbsp; {loc}", styles["CVJobTitle"]))
        story.append(Paragraph(f"{degree} &nbsp; <i>{period}</i>", styles["CVJobMeta"]))

    story.extend(section("Certifications"))
    certs = [
        "Situational Leadership II — PT. Manufaktur Elastomer Indonesia (January 2026)",
        "Comprehensive Data Analyst Program — Bootcamp Data Analytics (November 2025)",
        "Six-Sigma Yellow Belt — PT. Manufaktur Elastomer Indonesia (September 2025)",
        "Project Management Certification Program — Project Management Institute (May 2023, expires May 2029)",
    ]
    for cert in certs:
        story.append(bullet(cert))

    doc.build(story, onFirstPage=add_footer, onLaterPages=add_footer)


def build_cv_instrumentation(path: Path) -> None:
    doc = SimpleDocTemplate(
        str(path),
        pagesize=A4,
        rightMargin=1.5 * cm,
        leftMargin=1.5 * cm,
        topMargin=1.5 * cm,
        bottomMargin=1.8 * cm,
    )
    story: list = []

    story.append(Paragraph("BUDI SANTOSO", styles["CVUpperTitle"]))
    story.append(Paragraph("MAINTENANCE ELECTRICAL AND INSTRUMENTATION", styles["CVUpperSubtitle"]))

    for label, value in [
        ("ADDRESS", "Perumahan Griya Industri Blok B/12 No. 5, Cilegon, Banten 42454"),
        ("CONTACT", "+62 812-9876-5432"),
        ("E-MAIL", "budi.santoso.sample@email.com"),
    ]:
        story.append(Paragraph(label, styles["CVUpperSection"]))
        story.append(Paragraph(value, styles["CVUpperBody"]))

    story.append(Paragraph("PROFESSIONAL PROFILE", styles["CVUpperSection"]))
    story.append(
        Paragraph(
            "Experienced Maintenance Electrical and Instrumentation technician with a demonstrated history "
            "of working in the electrical and industrial engineering industry. Motivated to constantly develop "
            "skills and grow professionally. Confident in ability as a professional electrical and instrumentation "
            "technician with good attitude, discipline, communicative, creative, honest, and responsible.",
            styles["CVUpperBody"],
        )
    )

    story.append(Paragraph("WORK EXPERIENCE", styles["CVUpperSection"]))
    story.append(Paragraph("PT. BAJA INDUSTRI NASIONAL", styles["CVUpperBody"]))
    story.append(Paragraph("ELECTRICAL AND INSTRUMENT TECHNICIAN", styles["CVUpperBody"]))
    story.append(Paragraph("AUGUST 2016 – PRESENT", styles["CVUpperBody"]))
    for line in [
        "Preventive, predictive, breakdown, and corrective maintenance for electrical instrumentation.",
        "Drive system: PLC (Fuji, Mitsubishi, Siemens S7-400). DCS (Siemens). Inverters (Fuji, Mitsubishi, Hitachi). SCADA.",
        "Electric motors: measurement and adjustment brake, insulation resistance, winding resistance, greasing motor.",
        "Substation 25 MVA transformer. Experience with high and medium voltage equipment: trafo, capacitor bank, ACB, VCB, MCC.",
        "Maintained crane, compressor, elevator, and boiler systems.",
        "Inspection sensors: proximity, photo sensors, limit switches, pressure switches, flow switches.",
    ]:
        story.append(Paragraph(line, styles["CVUpperBody"]))

    story.append(Spacer(1, 6))
    story.append(Paragraph("PT. TEKNOLOGI INDUSTRI INDONESIA", styles["CVUpperBody"]))
    story.append(Paragraph("ELECTRICAL TECHNICIAN", styles["CVUpperBody"]))
    story.append(Paragraph("JUNE 2015 – DECEMBER 2015", styles["CVUpperBody"]))
    story.append(
        Paragraph(
            "Preventive, predictive, breakdown, and corrective maintenance for electrical instrumentation. "
            "Inspection sensors and electric motors maintenance.",
            styles["CVUpperBody"],
        )
    )

    story.append(Spacer(1, 6))
    story.append(Paragraph("PT. PETROKIMIA REGIONAL", styles["CVUpperBody"]))
    story.append(Paragraph("ON THE JOB TRAINING", styles["CVUpperBody"]))
    story.append(Paragraph("DECEMBER 2013", styles["CVUpperBody"]))
    story.append(Paragraph("Troubleshooting PLC, micro controller, protection relay.", styles["CVUpperBody"]))

    story.append(Paragraph("PERSONAL SKILL", styles["CVUpperSection"]))
    story.append(Paragraph("Android Development · Design SketchUp", styles["CVUpperBody"]))

    story.append(Paragraph("EDUCATION", styles["CVUpperSection"]))
    story.append(Paragraph("INSTITUT TEKNOLOGI INDUSTRI — ELECTRICAL ENGINEERING (2017 – Present)", styles["CVUpperBody"]))
    story.append(Paragraph("SMK NEGERI 1 CILEGON — ELECTRICAL/AUTOMATION INDUSTRY (2012 – 2015)", styles["CVUpperBody"]))

    story.append(Paragraph("ACHIEVEMENTS", styles["CVUpperSection"]))
    for item in [
        "1st Winner Applied Technology Competition (Smart Weigher and Filling Machine)",
        "Certificate of Recognition for Valuable Contribution — Commissioning Stage",
        "The Best Students at School",
        "2nd Winner Taekwondo Competition O2SN",
    ]:
        story.append(Paragraph(f"• {item}", styles["CVUpperBody"]))

    story.append(Paragraph("ORGANIZATIONS, TRAINING, AND COURSE", styles["CVUpperSection"]))
    for item in [
        "Lubrication Analysis Training",
        "Emergency Response Team Training (ERT)",
        "Crane Certification / ISO Crane",
        "Fire Fighting Training",
        "Basic Electrical and Instrumentation Training — BBLKI Serang",
        "Human Capital Training — PT. Baja Industri Nasional",
    ]:
        story.append(Paragraph(f"• {item}", styles["CVUpperBody"]))

    doc.build(story, onFirstPage=add_footer, onLaterPages=add_footer)


def build_cv_accounting(path: Path) -> None:
    doc = SimpleDocTemplate(
        str(path),
        pagesize=A4,
        rightMargin=2 * cm,
        leftMargin=2 * cm,
        topMargin=2 * cm,
        bottomMargin=1.8 * cm,
    )
    story: list = []

    story.append(Paragraph("Diana Putri", styles["CVTitle"]))
    story.append(Paragraph("Accounting Programmer", styles["CVSubtitle"]))
    story.append(
        Paragraph(
            "Jl. Merdeka Raya No. 15, Cilegon, 42423, Indonesia<br/>"
            "+62 813-4567-8901 · diana.putri.sample@email.com",
            styles["CVContact"],
        )
    )

    story.extend(section("Skills"))
    for skill in ["Accounting", "Database Design", "Data Management", "Problem Solving", "Critical Thinking"]:
        story.append(bullet(skill))

    story.extend(section("Software Skills"))
    for skill in ["Microsoft Office", "MySQL Database", "Laravel - PHP"]:
        story.append(bullet(skill))

    story.extend(section("Education"))
    story.append(Paragraph("<b>Politeknik Negeri Sumatera</b>, Palembang", styles["CVJobTitle"]))
    story.append(Paragraph("Diploma III — July 2022 – July 2025", styles["CVJobMeta"]))
    story.append(Paragraph("Graduated with <b>magna cum laude</b>. Cumulative GPA: 3.90 / 4.00", styles["CVBody"]))
    story.append(
        Paragraph(
            "<b>Undergraduate Final Project:</b> Design Cashflow Application for PT. XYZ Perusahaan",
            styles["CVBody"],
        )
    )

    story.extend(section("Internships"))
    story.append(Paragraph("<b>PT. Layanan Pos Nasional</b>, Customer Service — Cilegon", styles["CVJobTitle"]))
    story.append(Paragraph("September 2023 – December 2023", styles["CVJobMeta"]))
    story.append(
        Paragraph(
            "Studied operational process in post office. Assisted officers in customer service. "
            "Helped build accounting database and application for cash management.",
            styles["CVBody"],
        )
    )

    story.extend(section("Extra-curricular Activities"))
    story.append(Paragraph("<b>Chess Competition Woman in Banten</b>, Athlete — Tangerang", styles["CVJobTitle"]))
    story.append(Paragraph("December 2024 – December 2025", styles["CVJobMeta"]))
    story.append(
        Paragraph(
            "Represented Cilegon at province-level chess tournament as an athlete.",
            styles["CVBody"],
        )
    )

    story.extend(section("Hobbies"))
    story.append(Paragraph("Jogging, reading, listening to music, playing chess.", styles["CVBody"]))

    doc.build(story, onFirstPage=add_footer, onLaterPages=add_footer)


def build_cv_fresh_graduate(path: Path) -> None:
    doc = SimpleDocTemplate(
        str(path),
        pagesize=A4,
        rightMargin=2 * cm,
        leftMargin=2 * cm,
        topMargin=2 * cm,
        bottomMargin=1.8 * cm,
    )
    story: list = []

    story.append(Paragraph("MAYA ANGGRAINI", styles["CVTitle"]))
    story.append(Paragraph("TEKNOLOGI PANGAN — UNIVERSITAS TEKNOLOGI PANGAN NUSANTARA", styles["CVSubtitle"]))
    story.append(
        Paragraph(
            "Jl. Kemuning No. 42 RT 05/RW 08, Surabaya<br/>"
            "23033010099@student.utpn.ac.id · 0851-1234-5678",
            styles["CVContact"],
        )
    )

    story.extend(section("Ringkasan"))
    story.append(
        Paragraph(
            "Mahasiswa S1 semester 5 di Fakultas Teknik dan Sains, Jurusan Teknologi Pangan yang memiliki "
            "keinginan untuk mengembangkan diri dan mengeksplor melalui kegiatan di dalam dan di luar kampus. "
            "Siap berkontribusi melalui program magang sebagai langkah membangun kompetensi profesional.",
            styles["CVBody"],
        )
    )

    story.extend(section("Edukasi"))
    story.append(Paragraph("<b>Universitas Teknologi Pangan Nusantara</b>", styles["CVJobTitle"]))
    story.append(Paragraph("Teknologi Pangan (S1) — 2023 – Sekarang", styles["CVJobMeta"]))
    story.append(
        Paragraph(
            "Indeks prestasi 3.5/4.0 dengan 101 SKS. Mata kuliah: Manajemen Industri Pangan, "
            "Prinsip Teknik Pangan, Analisa Pangan, Keamanan dan Sanitasi Pangan.",
            styles["CVBody"],
        )
    )
    story.append(Spacer(1, 4))
    story.append(Paragraph("<b>SMA Negeri 12 Jakarta</b> (MIPA)", styles["CVJobTitle"]))
    story.append(Paragraph("2020 – 2023", styles["CVJobMeta"]))
    story.append(Paragraph("Menyelesaikan studi dengan nilai rata-rata 90.9.", styles["CVBody"]))

    story.extend(section("Pengalaman Kepanitiaan"))
    committees = [
        (
            "Panitia Seminar Nasional Teknologi Pangan — UTPN",
            "2024 & 2025",
            [
                "Menghubungkan dan menawarkan kerja sama sponsor kepada lebih dari 30 perusahaan.",
                "Menyapa dan menerima tamu undangan dari dalam dan luar kampus.",
                "Menjadi operator Zoom Meeting dengan lebih dari 200 peserta.",
            ],
        ),
        (
            "Ketua Pelaksana Serap Aspirasi Bersama Birokrat",
            "2024",
            [
                "Merancang kegiatan forum aspirasi bersama birokrat setingkat fakultas.",
                "Menyusun daftar aspirasi dan keluhan mahasiswa dengan pembagian yang rata.",
            ],
        ),
        (
            "Ketua Tim PKM 2024 (Lolos Tahap Fakultas)",
            "2024",
            [
                "Mengikuti serangkaian pendaftaran PKM, berdiskusi dengan dosen, menyusun proposal.",
                "Judul: Efektivitas Artificial Rice Berbasis Singkong dengan Penambahan Ekstrak Bekatul "
                "sebagai Penurun Gula Darah untuk Diabetes Melitus tipe 2.",
            ],
        ),
    ]
    for title, period, items in committees:
        story.append(Paragraph(f"<b>{title}</b> &nbsp; <i>{period}</i>", styles["CVJobTitle"]))
        for item in items:
            story.append(bullet(item))
        story.append(Spacer(1, 4))

    story.append(PageBreak())

    story.extend(section("Pengalaman Organisasi"))
    orgs = [
        (
            "Kepala Departemen Advokesma HIMA TEPAN — UTPN",
            "2023 – 2024",
            [
                "Memimpin rapat dengan kepala program studi dan wakil dekan mengenai akademik dan fasilitas.",
                "Memberikan ilmu administrasi dan advokasi kepada mahasiswa baru.",
                "Membimbing pengajuan banding dan relaksasi UKT dengan lebih dari 60% diterima.",
            ],
        ),
        (
            "Kepala Divisi Acara PANGSIT — Field Trip PT. Minuman Fermentasi & PT. Cokelat Nusantara",
            "2025",
            [
                "Merancang konsep kegiatan PANGSIT 2025 serta menyusun rundown untuk 100+ peserta.",
                "Bekerja sama dengan berbagai pihak internal dan eksternal.",
                "Melakukan briefing kepada seluruh panitia dan peserta sebelum kegiatan.",
            ],
        ),
    ]
    for title, period, items in orgs:
        story.append(Paragraph(f"<b>{title}</b> &nbsp; <i>{period}</i>", styles["CVJobTitle"]))
        for item in items:
            story.append(bullet(item))
        story.append(Spacer(1, 4))

    story.extend(section("Informasi Tambahan"))
    story.append(Paragraph("<b>Bahasa:</b> Bahasa Indonesia (Asli), Bahasa Inggris (Fasih)", styles["CVBody"]))
    story.append(
        Paragraph(
            "<b>Penghargaan:</b> Pemateri PKMMB 2024, Best Staff BEJ HIMA TEPAN 2024, Master of Ceremony Dies Natalis 2024",
            styles["CVBody"],
        )
    )
    story.append(Paragraph("<b>Kemampuan:</b> Canva, Word, Excel · Kerjasama Tim, Manajemen Waktu, Public Speaking", styles["CVBody"]))

    doc.build(story, onFirstPage=add_footer, onLaterPages=add_footer)


def render_thumbnails(pdf_files: dict[str, Path]) -> None:
    thumb_dir = ROOT / "web" / "public" / "portfolio"
    for thumb_name, pdf_path in pdf_files.items():
        doc = fitz.open(pdf_path)
        page = doc[0]
        mat = fitz.Matrix(2.0, 2.0)
        pix = page.get_pixmap(matrix=mat, alpha=False)
        out = thumb_dir / thumb_name
        pix.save(str(out))
        doc.close()
        print(f"  thumbnail: {out.name}")


def main() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)

    pdfs = {
        "cv-profesional-data-engineer.pdf": build_cv_professional,
        "cv-maintenance-instrumentasi.pdf": build_cv_instrumentation,
        "cv-accounting-programmer.pdf": build_cv_accounting,
        "cv-fresh-graduate-teknologi-pangan.pdf": build_cv_fresh_graduate,
    }

    thumb_map: dict[str, Path] = {}
    for filename, builder in pdfs.items():
        out_path = OUT_DIR / filename
        builder(out_path)
        print(f"Generated: {out_path}")
        thumb_map[filename.replace(".pdf", ".jpg").replace("cv-", "portfolio-cv-")] = out_path

    # Map thumbnails to portfolio naming convention
    thumb_names = {
        "portfolio-cv-ats.jpg": OUT_DIR / "cv-profesional-data-engineer.pdf",
        "portfolio-cv-instrumentasi.jpg": OUT_DIR / "cv-maintenance-instrumentasi.pdf",
        "portfolio-cv-accounting.jpg": OUT_DIR / "cv-accounting-programmer.pdf",
        "portfolio-cv-fresh.jpg": OUT_DIR / "cv-fresh-graduate-teknologi-pangan.pdf",
    }
    print("\nRendering thumbnails...")
    render_thumbnails(thumb_names)
    print("\nDone!")


if __name__ == "__main__":
    main()
