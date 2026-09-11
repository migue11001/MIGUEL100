# migue100.com — Project Documentation

**Author:** Miguel Otero  
**Deployed:** Railway  
**Topic:** Machining Engineering Blog

---

## Structure

```
migue100/
├── index.html                                    ← Homepage + auth sidebar
├── rooms/                                        ← One page per module (index page for that topic)
│   ├── turning.html            MODULE 01
│   ├── milling.html            MODULE 02
│   ├── tool-library.html       MODULE 03
│   ├── safety.html             MODULE 04   (card id is legacy "card-cnc")
│   ├── metrology.html          MODULE 05
│   ├── tech-assistant.html     MODULE 06   ("Human-Machine Loop" — AI essays)
│   ├── sheet-metal.html        MODULE 07
│   ├── welding.html            MODULE 08
│   ├── machinery.html          MODULE 09
│   └── cnc-compiler.html       legacy — not linked from index.html anymore
├── <module>-<slug>.html                          ← Standalone article pages, one per published post (see below)
├── backend/                                      ← Flask + Supabase API
│   ├── app.py
│   ├── requirements.txt
│   └── Procfile
├── package.json
└── railway.json
```

---

## Frontend

**Server:** `serve` (npm), Node ≥ 18  
**Start:** `serve . -p ${PORT:-8080}` — no `-s` flag (SPA mode off, rooms need direct file resolution)

### Design tokens

| Variable | Value | Role |
|---|---|---|
| `--neon-blue` | `#00d4ff` | Accents, borders, glow |
| `--neon-dim` | `#0099cc` | Secondary labels |
| `--steel-dark` | `#08090d` | Body background |
| `--steel-panel` | `#1a1e28` | Cards |
| `--chrome` | `#8ab4cc` | Subtitles |
| `--text-main` | `#cce8f4` | Body text |

Fonts: **Share Tech Mono** (mono / headings) + **Rajdhani** (body) — Google Fonts.

### index.html

**Nav**
- `Login` button → opens auth sidebar on login form
- `Register` button → opens auth sidebar on register form
- When logged in: logo shows username, Register becomes "Logout"

**Auth sidebar**
- Slides in from right
- JWT stored in `localStorage` as `migue100_token` + `migue100_session`
- Backend: `https://ejercicios-de-prueba-production.up.railway.app`
- Login → `POST /token` with `{ email, password }`
- Register → `POST /register` with `{ email, password }`

**Module cards → rooms**

Each card also has a CSS rule `#<card-id> { background-image: linear-gradient(...), url('.../images/card-<name>.png') }` (+ a `:hover` variant with a lighter gradient, same image) for its hero background in the grid.

| Card ID | Page | Module | Contributions key (`MODULE` const) |
|---|---|---|---|
| `card-turning` | `rooms/turning.html` | 01 — Turning | `turning` |
| `card-milling` | `rooms/milling.html` | 02 — Milling | `milling` |
| `card-tools` | `rooms/tool-library.html` | 03 — Tool Library | `tool-library` |
| `card-cnc` | `rooms/safety.html` | 04 — Safety (id kept for legacy reasons) | `safety` |
| `card-metro` | `rooms/metrology.html` | 05 — Metrology | `metrology` |
| `card-ai` | `rooms/tech-assistant.html` | 06 — Human-Machine Loop (AI essays) | `tech-assistant` |
| `card-sheet-metal` | `rooms/sheet-metal.html` | 07 — Sheet Metal | `sheet-metal` |
| `card-welding` | `rooms/welding.html` | 08 — Welding | `welding` |
| `card-machinery` | `rooms/machinery.html` | 09 — Machinery | `machinery` |

`rooms/cnc-compiler.html` still exists on disk (its own `MODULE = 'cnc-compiler'`) but has no card in `index.html` anymore — treat it as legacy unless it gets relinked.

### rooms/ pages

Every room in the table above (01–09) shares the same structure:
- Fixed nav: logo → `../index.html`, language switch, `← Home` button → `../index.html`
- `.room-header` → `.room-tag` (`MODULE 0N`), `.room-title`, `.room-intro` (module 06 currently only has the tag — no title/intro yet)
- `.posts-section` → `.posts-grid` of `.post-card` links, one per published article:
  ```html
  <a class="post-card" href="../<module>-<slug>.html">
    <div class="post-card-img">
      <img src="<image-url>" alt="..." loading="lazy">
      <!-- or, before an image URL is supplied: -->
      <div class="img-placeholder">IMAGE PENDING</div>
    </div>
    <div class="post-card-body">
      <h3 class="post-card-title">…</h3>
      <p class="post-card-desc">…</p>
      <div class="post-card-footer"><span class="post-card-date">…</span><span class="post-card-read">→ READ</span></div>
    </div>
  </a>
  ```
- `.contributions-section` → community links/PDFs/books, fetched from the backend `/contributions/<MODULE>` endpoint (see below), filtered client-side by type
- `cnc-compiler.html` (legacy, unlinked) and `tech-assistant.html` before its module‑06 cleanup are the only pages that used the older dynamic pattern: `.blog-section` / `.data-grid` / `.formula-block` fed by `renderArticle()` off the Supabase `/articles` endpoint. Every currently linked room uses the static `post-card` pattern above instead — **published articles are static HTML files, not rows fetched from Supabase**, despite the `/articles` API existing in the backend (only `admin.html` and `cnc-compiler.html` still call it).

### Standalone article pages (`<module>-<slug>.html`)

One flat HTML file per published article, at the project root (not inside `rooms/`), named `<module>-<slug-of-title>.html` (e.g. `sheet-metal-punches-and-dies.html`). All of them share one template:

- `nav .nav-badge` — short topic tag (e.g. `DIE TOOLING`, `ARC WELDING`)
- `.post-header` → `.module-tag` (`<Topic> · Module <Room Title>`), `h1` (+ optional `.subhead`), `.subtitle`
- Body built from repeatable blocks: `.chapter` (numbered heading + decorative line), `.narrative` paragraphs, `.pull-question` callouts, occasionally `.checklist` / `.stat-grid` ("in numbers") / `.focus-box` ("// Did You Know?")
- `.footer-row` → link back to `rooms/<module>.html`
- Same Google Translate (ES/IT) footer script as the rooms

**Mobile fix (Sep 2026):** `.chapter h2` used `white-space: nowrap`, which overflowed the viewport horizontally on long chapter titles at narrow widths (text ran past the page margin instead of wrapping). Fixed across all 17 article pages by adding, inside each file's `@media (max-width: 600px)` block:
```css
.chapter { flex-wrap: wrap; }
.chapter h2 { white-space: normal; flex: 1 1 auto; min-width: 0; }
.chapter-line { flex: 1 1 100%; margin-top: 6px; }
```
Apply the same three rules to any new article page copied from this template.

### SEO & Favicon
- Favicon: 🪙 via SVG data URI
- `<meta name="author" content="Miguel Otero">`
- `<meta name="robots" content="index, follow">`
- Description targets: *mechanism of Miguel Otero*

---

## Backend

**Stack:** Python, Flask, Supabase, Gunicorn  
**Deployed on:** Railway (separate service from frontend)

### Environment variables
```
SUPABASE_URL=<project-url>
SUPABASE_KEY=<service-role-or-anon-key>
```

### Route guard
Only paths listed in `ALLOWED_PATHS` are accepted; everything else returns `403`.

```python
ALLOWED_PATHS = ["/register", "/token", "/publications", "/articles", "/videos", "/models"]
```

---

## API Reference

### Auth

| Method | Path | Auth | Description |
|---|---|---|---|
| POST | `/register` | None | Create user (Supabase `sign_up`) |
| POST | `/token` | None | Login, returns `access_token` |

```json
// POST /register  or  POST /token  body:
{ "email": "user@example.com", "password": "secret" }

// POST /token response:
{ "access_token": "<jwt>", "token_type": "bearer" }
```

---

### Articles

| Method | Path | Auth | Description |
|---|---|---|---|
| GET | `/articles` | None | List all. Filter: `?module=turning` |
| GET | `/articles/<slug>` | None | Single article |
| POST | `/articles` | Bearer JWT | Create |
| DELETE | `/articles/<id>` | Bearer JWT | Delete |

**Supabase table: `articles`**

| Column | Type |
|---|---|
| `id` | uuid PK |
| `user_id` | uuid → auth.users |
| `title` | text |
| `slug` | text unique |
| `content` | text |
| `module` | text |
| `summary` | text |
| `cover_image` | text (URL) |
| `created_at` | timestamptz |

---

### Videos

| Method | Path | Auth | Description |
|---|---|---|---|
| GET | `/videos` | None | List all. Filter: `?module=milling` |
| GET | `/videos/<slug>` | None | Single video |
| POST | `/videos` | Bearer JWT | Create |
| DELETE | `/videos/<id>` | Bearer JWT | Delete |

**Supabase table: `videos`**

| Column | Type |
|---|---|
| `id` | uuid PK |
| `user_id` | uuid → auth.users |
| `title` | text |
| `slug` | text unique |
| `video_url` | text |
| `module` | text |
| `thumbnail` | text (URL) |
| `description` | text |
| `created_at` | timestamptz |

---

### 3D Models

| Method | Path | Auth | Description |
|---|---|---|---|
| GET | `/models` | None | List all. Filter: `?module=tool-library` |
| GET | `/models/<slug>` | None | Single model |
| POST | `/models` | Bearer JWT | Create |
| DELETE | `/models/<id>` | Bearer JWT | Delete |

**Supabase table: `models`**

| Column | Type |
|---|---|
| `id` | uuid PK |
| `user_id` | uuid → auth.users |
| `title` | text |
| `slug` | text unique |
| `file_url` | text |
| `format` | text (`glb`, `stl`, `step`) |
| `module` | text |
| `thumbnail` | text (URL) |
| `description` | text |
| `created_at` | timestamptz |

---

## Supabase Setup

```sql
create table articles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id),
  title text not null,
  slug text unique not null,
  content text,
  module text,
  summary text,
  cover_image text,
  created_at timestamptz default now()
);

create table videos (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id),
  title text not null,
  slug text unique not null,
  video_url text not null,
  module text,
  thumbnail text,
  description text,
  created_at timestamptz default now()
);

create table models (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id),
  title text not null,
  slug text unique not null,
  file_url text not null,
  format text,
  module text,
  thumbnail text,
  description text,
  created_at timestamptz default now()
);
```

**RLS policies for each table:**
- `SELECT` — public
- `INSERT` / `DELETE` — `auth.uid() = user_id`

---

## Deployment

| Service | Runtime | Start command |
|---|---|---|
| Frontend | Node ≥ 18 | `npm start` → `serve . -p ${PORT:-8080}` |
| Backend | Python | `gunicorn app:app` (Procfile) |

```bash
# Deploy
git add .
git commit -m "message"
! git push   # run with ! prefix inside Claude Code terminal
```

Railway auto-deploys on push to `main`.
