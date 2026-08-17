#!/usr/bin/env python3
"""Anonymize technical drawing PDFs and export portfolio PNGs."""

from __future__ import annotations

from pathlib import Path

import fitz
from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parents[1]
OUT_DIR = ROOT / "web" / "public" / "portfolio" / "3d"

FOOD_CRUSHER_PDF = Path(
    r"f:\backup F\DRAWING 3D\Food crusher\MCH 0078 MC. FOOD CRUSHER F.I.D GEMPOL.pdf"
)
DUDUKAN_PDF = Path(
    r"f:\backup F\DRAWING 3D\Dudukan Pisau Cutmix\dudukan pisau cutmix.pdf"
)

REPLACEMENTS = [
    ("Dudukan Cutter Mixer", "Dudukan Pisau"),
    ("Dudukan Pisau Cutter Mixer.", "Dudukan Pisau."),
    ("Dudukan Pisau Cuter Mixer.", "Dudukan Pisau."),
    ("Dudukan Pisau Cutter Mixer", "Dudukan Pisau"),
    ("Assembly Dudukan Cutter\nPisau Mixer", "Assembly Dudukan Pisau"),
    ("Assembly Dudukan Cutter", "Assembly Dudukan Pisau"),
]

COMPANY_TERMS = [
    "PT. Indofood CBP Sukses Makmur Tbk.",
    "Indofood",
    "Tanjung Api-Api",
    "Banyu Asin",
    "Sumatera Selatan",
    "Destrix",
    "GEMPOL",
    "CV.",
    "CV ",
    "Sentral",
    "SENTRAL",
]


def redact_rect(page: fitz.Page, rect: fitz.Rect, fill: tuple[float, float, float] = (1, 1, 1)) -> None:
    page.add_redact_annot(rect, fill=fill)
    page.apply_redactions()


def redact_terms(page: fitz.Page, terms: list[str]) -> None:
    for term in terms:
        for rect in page.search_for(term):
            expanded = rect + (-2, -2, 2, 2)
            redact_rect(page, expanded)


def replace_text(page: fitz.Page, old: str, new: str, fontsize: float = 9) -> None:
    hits = page.search_for(old)
    if not hits:
        return
    rect = hits[0]
    redact_rect(page, rect + (-1, -1, 1, 1))
    width = fitz.get_text_length(new, fontname="helv", fontsize=fontsize)
    x = rect.x0
    if width > rect.width + 40:
        fontsize = max(6.5, fontsize * rect.width / max(width, 1))
    page.insert_text(
        (x, rect.y1 - 2),
        new,
        fontsize=fontsize,
        fontname="helv",
        color=(0, 0, 0),
    )


def anonymize_title_block(page: fitz.Page) -> None:
    """Cover fabrication title blocks on image-based drawings."""
    r = page.rect
    redact_rect(page, fitz.Rect(0, r.height * 0.62, r.width * 0.42, r.height))
    redact_rect(page, fitz.Rect(r.width * 0.20, r.height * 0.80, r.width * 0.58, r.height * 0.97))
    redact_rect(page, fitz.Rect(r.width * 0.48, r.height * 0.72, r.width, r.height))
    # CV / company box on food-crusher sheet (bottom-left corner).
    redact_rect(page, fitz.Rect(20, 755, 360, 842))


def anonymize_dudukan_page(page: fitz.Page) -> None:
    for old, new in REPLACEMENTS:
        replace_text(page, old, new)
    for old, new in [
        ("Pisau Mixer", "Pisau"),
        ("Cutter Mixer", "Pisau"),
        ("Cuter Mixer", "Pisau"),
    ]:
        for rect in page.search_for(old):
            redact_rect(page, rect + (-1, -1, 1, 1))
            page.insert_text((rect.x0, rect.y1 - 2), new, fontsize=8, fontname="helv", color=(0, 0, 0))

    redact_terms(page, COMPANY_TERMS)

    r = page.rect
    # Company address block on title strip.
    redact_rect(page, fitz.Rect(115, 768, 465, 806))
    redact_rect(page, fitz.Rect(r.width * 0.62, r.height * 0.76, r.width * 0.80, r.height * 0.84))


def mask_png_regions(path: Path, regions: list[tuple[float, float, float, float]]) -> None:
    img = Image.open(path)
    draw = ImageDraw.Draw(img)
    w, h = img.size
    for x0, y0, x1, y1 in regions:
        draw.rectangle([int(x0 * w), int(y0 * h), int(x1 * w), int(y1 * h)], fill="white")
    img.save(path)


def post_process_food_crusher_png(path: Path) -> None:
    # Sheet rotated: left strip = BOM, CV, signatures, drawing number (identity block).
    mask_png_regions(
        path,
        [
            (0.0, 0.0, 0.38, 1.0),    # full left column — BOM + CV + drawn/checked/approved
            (0.0, 0.52, 0.28, 0.72),  # mid-left company / designation fallback
            (0.62, 0.0, 0.72, 0.12),  # top-right revision header strip
        ],
    )


def post_process_dudukan_png(path: Path) -> None:
    # Bottom title block — company, address, drafter, part title variants.
    mask_png_regions(
        path,
        [
            (0.0, 0.68, 1.0, 1.0),
        ],
    )


def export_page(doc: fitz.Document, page_index: int, out_name: str) -> Path:
    page = doc[page_index]
    mat = fitz.Matrix(2.5, 2.5)
    pix = page.get_pixmap(matrix=mat, alpha=False)
    out = OUT_DIR / out_name
    pix.save(str(out))
    return out


def process_dudukan() -> Path:
    doc = fitz.open(DUDUKAN_PDF)
    page = doc[4]  # A-A detail — best portfolio view
    anonymize_dudukan_page(page)
    out = export_page(doc, 4, "portfolio-3d-dudukan-pisau-anon.png")
    post_process_dudukan_png(out)
    doc.close()
    return out


def process_food_crusher() -> Path:
    doc = fitz.open(FOOD_CRUSHER_PDF)
    page = doc[2]  # assembly view
    anonymize_title_block(page)
    # Image-only pages: mask any detected text fragments.
    redact_terms(page, COMPANY_TERMS)
    out = export_page(doc, 2, "portfolio-3d-food-crusher-anon.png")
    post_process_food_crusher_png(out)
    doc.close()
    return out


def main() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    a = process_food_crusher()
    b = process_dudukan()
    print(f"Updated {a}")
    print(f"Updated {b}")


if __name__ == "__main__":
    main()
