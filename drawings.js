/* ═══════════════════════════════════════════════════════════
   DRAWING CATALOG — shared by index.html (gallery) and drawing.html (detail page).
   Add a drawing here and it shows up in the gallery and gets its own
   page at drawing.html#<name>. G-code programs live in drawing.html (PROGRAMS).
   After adding one, upload its gallery thumbnail to Supabase images/miniaturas/<name>.jpg
   (./scripts/make-thumbs.sh can generate it into thumbs/).
═══════════════════════════════════════════════════════════ */
const DRAWINGS_URL = 'https://jzvezovdglfzjyslahoz.supabase.co/storage/v1/object/public/images/DRAWINGS/';
/* Gallery thumbnails (800px JPG, uploaded by hand as <name>.jpg) */
const THUMBS_URL   = 'https://jzvezovdglfzjyslahoz.supabase.co/storage/v1/object/public/images/miniaturas/';

const DRAWINGS = [
    { name: 'D2', file: 'D2.png', title: 'D2 — TECHNICAL DRAWING',             id: 'DWG-D2-001', project: 'D2' },
    { name: 'D10', file: 'D10.png', title: 'D10 — TECHNICAL DRAWING',          id: 'DWG-D10-001', project: 'D10' },
    { name: 'D4', file: 'D4.png', title: 'A4-PROJECT CAM — TECHNICAL DRAWING', id: 'DWG-A4-001', project: 'A4-PROJECT CAM' },
    { name: 'D6', file: 'D6.png', title: 'A6-PROJECT CAM — TECHNICAL DRAWING', id: 'DWG-A6-001', project: 'A6-PROJECT CAM' },
];

/* Gallery layout: one horizontal row per entry (up to ~20 drawings per row), by drawing name */
const GALLERY_ROWS = [
    { title: 'Technical drawings', drawings: ['D2', 'D10', 'D4', 'D6'] },
];

function findDrawing(name) {
    return DRAWINGS.find(d => d.name === name) || null;
}
