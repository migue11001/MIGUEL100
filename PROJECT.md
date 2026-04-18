# migue100.com — Project Documentation

**Author:** Miguel Otero  
**Deployed:** Railway  
**Topic:** Machining Engineering Blog

---

## Structure

```
migue100/
├── index.html           ← Homepage + auth sidebar
├── rooms/               ← Blog pages, one per module
│   ├── turning.html         MODULE 01
│   ├── milling.html         MODULE 02
│   ├── tool-library.html    MODULE 03
│   ├── cnc-compiler.html    MODULE 04
│   ├── metrology.html       MODULE 05
│   └── tech-assistant.html  MODULE 06
├── backend/             ← Flask + Supabase API
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

| Card ID | Page | Module |
|---|---|---|
| `card-turning` | `rooms/turning.html` | 01 — Turning |
| `card-milling` | `rooms/milling.html` | 02 — Milling |
| `card-tool-library` | `rooms/tool-library.html` | 03 — Tool Library |
| `card-cnc-compiler` | `rooms/cnc-compiler.html` | 04 — CNC Compiler |
| `card-metrology` | `rooms/metrology.html` | 05 — Metrology |
| `card-tech-assistant` | `rooms/tech-assistant.html` | 06 — Tech Assistant |

### rooms/ pages

All rooms share the same structure:
- Fixed nav: logo → `../index.html`, `← Home` button → `../index.html`
- `.room-header` → tag, title, subtitle
- `.blog-section` blocks → `.section-label`, `.section-heading`, `.blog-text`
- `.data-grid` / `.data-cell` for specs
- `.formula-block` or `.code-block` for technical content

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
