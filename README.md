# migue100.com

Web personal de **Miguel Otero**: presentación (About), galería de dibujos técnicos y programas G-CODE comentados, con registro de usuarios.

Web estática (HTML + CSS + JavaScript, sin framework ni build), servida con [`serve`](https://www.npmjs.com/package/serve) en Railway.

## Estructura

| Archivo | Qué es |
|---|---|
| `index.html` | Página de inicio: header, foto + About (Pasado / Presente / Futuro), aviso de construcción y galería de dibujos |
| `drawing.html` | Página de cada dibujo (`drawing.html#D6`): plano a tamaño completo, datos y ventana G-CODE |
| `drawings.js` | Catálogo de dibujos y filas de la galería (lo usan las dos páginas) |
| `auth.js` / `auth.css` | Login / Register: botones del header y panel lateral |
| `privacy-policy.html` | Política de privacidad (RGPD), enlazada desde el registro |
| `favicon-32.png`, `favicon-192.png`, `apple-touch-icon.png` | Iconos de la web |
| `package.json`, `railway.json`, `serve.json` | Arranque y despliegue en Railway |

## Imágenes (Supabase Storage)

Todas las imágenes pesadas están en Supabase, en el bucket público `images`:

| Carpeta | Contenido | Dónde se usa |
|---|---|---|
| `images/AVATAR.jpeg` | Foto del header | `index.html` |
| `images/DRAWINGS/` | Dibujos originales (tamaño completo) | `drawing.html` |
| `images/miniaturas/` | Miniaturas de 800 px en JPG, mismo nombre que el dibujo | Galería de `index.html` |

Las imágenes se cargan solo cuando aparecen en pantalla, así que la galería puede crecer a cientos de dibujos sin que la página pese más al abrirla.

## Añadir un dibujo

1. Sube el original a `images/DRAWINGS/` (por ejemplo `D11.png`).
2. Sube su miniatura (800 px de ancho, JPG) a `images/miniaturas/D11.jpg`.
3. Añade una línea en `drawings.js`:
   ```js
   { name: 'D11', file: 'D11.png', title: 'D11 — TECHNICAL DRAWING', id: 'DWG-D11-001', project: 'D11' },
   ```
   y su nombre en `GALLERY_ROWS`.
4. Si tiene programa G-CODE, añádelo en `PROGRAMS` dentro de `drawing.html`.

Si falta la miniatura, la galería carga el original (más pesado, pero no se rompe).

## Usuarios (Login / Register)

`auth.js` habla con el backend **Flask + Supabase Auth** en Railway:

- Backend: `https://web-production-47911.up.railway.app`
- `POST /register` → `{ username, email, password, gdpr_consent, gdpr_consent_version }`
- `POST /token` → `{ email, password }` → devuelve `access_token` (JWT)
- `GET /me` → con `Authorization: Bearer <token>` → `{ email, id, is_admin }`

La sesión se guarda en el navegador (`localStorage`: `migue100_token`, `migue100_session`).

## Datos sensibles

Esta web **no contiene claves ni secretos**: todo lo que hay aquí lo puede ver cualquier visitante. Las URLs de Supabase Storage y del backend son públicas por diseño.

Las claves reales (`SUPABASE_URL`, `SUPABASE_KEY`, `ADMIN_EMAILS`, etc.) viven **solo en el backend**, como variables de entorno en Railway. Nunca las pongas en estos archivos. El `.gitignore` ya excluye `.env` y `.env*.local`.

## Idiomas

Inglés como idioma base. Español e italiano con Google Translate, que solo se carga cuando el visitante elige uno de ellos. Los textos del About y los botones tienen traducciones fijas (`data-i18n-es`, `data-i18n-it`).

## Desarrollo local

```bash
npm install
npm start        # http://localhost:8080
```
