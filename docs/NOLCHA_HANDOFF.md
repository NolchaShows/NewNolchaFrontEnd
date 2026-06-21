# Nolcha — Full Project Handoff

**Last updated:** May 2026  
**Audience:** Developers, CMS editors, and ops taking over the Nolcha marketing site.

This document covers the **Next.js frontend** and **Strapi backend** as one system. The two repositories work together; neither is useful in isolation for content or deployment.

| Repository | Path | Role |
|------------|------|------|
| **Frontend** | `/Users/abdullah/NewNolchaFrontEnd` | Public website (Next.js 15) |
| **Backend** | `/Users/abdullah/NewNolchaBackend` | Headless CMS (Strapi 5) |

---

## Table of contents

1. [System overview](#1-system-overview)
2. [Tech stack](#2-tech-stack)
3. [Local development](#3-local-development)
4. [Environment variables](#4-environment-variables)
5. [Frontend architecture](#5-frontend-architecture)
6. [Routes & data sources](#6-routes--data-sources)
7. [Strapi CMS — complete reference](#7-strapi-cms--complete-reference)
8. [Content editor guide](#8-content-editor-guide)
9. [API & integration patterns](#9-api--integration-patterns)
10. [Media & assets](#10-media--assets)
11. [Forms & email](#11-forms--email)
12. [Deployment](#12-deployment)
13. [Known issues & maintenance](#13-known-issues--maintenance)
14. [Quick reference](#14-quick-reference)

---

## 1. System overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         End users (browser)                        │
└───────────────────────────────┬─────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│  Next.js 15 (Vercel) — NewNolchaFrontEnd                         │
│  • App Router under src/app/                                       │
│  • ISR revalidate: 60s on most pages                              │
│  • REST + GraphQL clients → Strapi                                 │
└───────────────────────────────┬─────────────────────────────────┘
                                │ HTTPS
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│  Strapi 5.33 (Render) — NewNolchaBackend                         │
│  • REST /api/* + GraphQL /graphql                                │
│  • Custom by-slug routes, contact, newsletter                    │
│  • Postgres (production) / SQLite (local)                          │
└───────────────┬─────────────────────────────┬───────────────────┘
                │                             │
                ▼                             ▼
     ┌──────────────────┐          ┌──────────────────┐
     │ Cloudflare R2    │          │ SMTP (Nodemailer) │
     │ (media uploads)  │          │ form notifications│
     └──────────────────┘          └──────────────────┘
```

**Production URLs (defaults in code):**

- Strapi API: `https://new-nolcha-strapi-uiai.onrender.com`
- Frontend: set via `NEXT_PUBLIC_SITE_URL` / Vercel (`VERCEL_URL`)
- Media CDN: Cloudflare R2 public URLs (also whitelisted in `next.config.mjs`)

---

## 2. Tech stack

### Frontend (`NewNolchaFrontEnd`)

| Layer | Technology |
|-------|------------|
| Framework | Next.js **15.4.10** (App Router, `src/app/`) |
| UI | React **19.1.0** |
| Styling | Tailwind CSS **v4** (`@tailwindcss/postcss`) |
| Font | IBM Plex Sans (400/500/700) via `next/font/google` |
| CMS client | REST (`src/lib/strapi.js`) + Apollo GraphQL |
| Rich text | `@strapi/blocks-react-renderer`, `react-markdown` |
| Animation | GSAP, Framer Motion, Lenis smooth scroll |
| Package manager | **pnpm** (`pnpm-lock.yaml`) |
| Language | JavaScript + TypeScript (`allowJs: true`) |

### Backend (`NewNolchaBackend`)

| Layer | Technology |
|-------|------------|
| CMS | Strapi **5.33.3** |
| Runtime | Node **20–24** |
| Database (local) | SQLite (`better-sqlite3`, `.tmp/data.db`) |
| Database (prod) | PostgreSQL on Render |
| Uploads | `@strapi/provider-upload-aws-s3` → **Cloudflare R2** |
| Email | `@strapi/provider-email-nodemailer` |
| Auth | `@strapi/plugin-users-permissions` |
| API | REST + `@strapi/plugin-graphql` |

---

## 3. Local development

### Prerequisites

- Node.js 20+
- pnpm (frontend) / npm (backend)
- Strapi admin access for content (or local SQLite with seeded data)

### Start backend (Strapi)

```bash
cd /Users/abdullah/NewNolchaBackend
cp .env.example .env
# Fill APP_KEYS, JWT_SECRET, ADMIN_JWT_SECRET, API_TOKEN_SALT, ENCRYPTION_KEY
npm install
npm run develop   # http://localhost:1337/admin
```

Local Strapi uses SQLite by default. R2 and SMTP are optional for local dev unless testing uploads or forms.

### Start frontend (Next.js)

```bash
cd /Users/abdullah/NewNolchaFrontEnd
pnpm install

# Create .env.local (see section 4)
echo 'NEXT_PUBLIC_STRAPI_URL=http://localhost:1337' > .env.local

pnpm dev   # http://localhost:3000
```

### Useful scripts

**Frontend**

| Script | Command |
|--------|---------|
| Dev | `pnpm dev` |
| Build | `pnpm build` |
| Production | `pnpm start` |
| Lint | `pnpm lint` |
| GraphQL codegen | `pnpm codegen` |

**Backend**

| Script | Command |
|--------|---------|
| Dev | `npm run develop` |
| Build | `npm run build` |
| Production | `npm run start` |
| Strapi console | `npm run console` |

---

## 4. Environment variables

Neither repo ships a complete `.env.example` for production. Use this as the source of truth.

### Frontend (`.env.local`)

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_STRAPI_URL` | Yes | Strapi base URL, e.g. `http://localhost:1337` or Render URL |
| `NEXT_PUBLIC_STRAPI_API_TOKEN` | Recommended | Bearer token for server REST fetches (`fetchFromStrapi`) |
| `NEXT_PUBLIC_STRAPI_GRAPHQL_ENDPOINT` | Optional | Defaults to `{STRAPI_URL}/graphql` |
| `STRAPI_SERVER_TOKEN` | Optional | Server-side GraphQL auth (preferred over client token) |
| `NEXT_PUBLIC_STRAPI_CLIENT_TOKEN` | Optional | Client GraphQL fallback |
| `NEXT_PUBLIC_SITE_URL` | Prod | Canonical site URL for sitemap/metadata |
| `VERCEL_URL` | Auto | Set by Vercel |
| `VERCEL_ENV` | Auto | `preview` disables search indexing |
| `ROBOTS_BLOCK` | Optional | `"true"` blocks all crawlers |

### Backend (`.env`)

**From `.env.example` (required for Strapi):**

```
HOST=0.0.0.0
PORT=1337
APP_KEYS="key1,key2"
API_TOKEN_SALT=...
ADMIN_JWT_SECRET=...
TRANSFER_TOKEN_SALT=...
JWT_SECRET=...
ENCRYPTION_KEY=...
```

**Additional (production / features):**

| Variable | Purpose |
|----------|---------|
| `PUBLIC_URL` | Public Strapi URL (Render or custom domain) |
| `PROXY` | `true` on Render |
| `DATABASE_CLIENT` | `sqlite` (local) or `postgres` (prod) |
| `DATABASE_URL` | Postgres connection string |
| `DATABASE_SSL` | `true` on Render |
| `R2_ENDPOINT`, `R2_BUCKET`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY` | Cloudflare R2 uploads |
| `R2_PUBLIC_URL` | Public CDN base for media |
| `R2_ROOT_PATH` | Optional upload prefix (e.g. `uploads`) |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USERNAME`, `SMTP_PASSWORD` | Email delivery |
| `SMTP_DEFAULT_FROM`, `SMTP_DEFAULT_REPLY_TO` | From/reply addresses |
| `CONTACT_FORM_TO_EMAIL` | Fallback recipient if CMS not set |
| `GRAPHQL_LANDING_PAGE`, `GRAPHQL_INTROSPECTION` | Usually `false` in production |

---

## 5. Frontend architecture

### Directory structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.js           # Root layout, fonts, metadata
│   ├── ConditionalLayout.js # Navbar + Footer + modals (server nav fetch)
│   ├── page.js             # Homepage
│   ├── sitemap.js, robots.js
│   └── [routes]/           # All public pages
├── components/
│   ├── common/             # Navbar, Footer, heroes, shared UI
│   ├── home/               # Homepage sections
│   ├── experience/         # Shared detail template sections
│   ├── experiences/        # Experiences index
│   ├── legal/              # Legal shells + static fallbacks
│   └── Modals/             # Let's Chat, Inner Circle, etc.
├── lib/                    # Strapi clients, fetchers, mappers
├── utils/                  # Client hooks, footer/nav transforms
└── data/                   # Static fallbacks (upcoming events, tweets)
```

**Path alias:** `@/*` → `src/*`

### Layout shell

Every page is wrapped by `ConditionalLayout.js`, which:

1. Server-fetches navigation data (experiences, charity, menu, home upcoming events)
2. Renders `Navbar` with `initialNavData`
3. Renders page `children`
4. Renders `Footer` (client-fetches footer from Strapi on mount)
5. Mounts `LetsChatModalHost` for global contact modal

### Strapi integration layers

| Layer | File(s) | Use case |
|-------|---------|----------|
| REST client | `src/lib/strapi.js` | Most pages, footer, nav, collections |
| Structured fetch | `src/lib/fetchStructuredPageBySlug.ts` | by-slug routes, home split fetch |
| GraphQL | `src/lib/graphql/apollo-client.ts` | About (white-label), Press |
| Media | `src/lib/strapiMediaUrl.js` | Resolve Strapi/R2 URLs, v4/v5 formats |
| Flatten | `src/lib/strapiFlatten.ts` | Normalize Strapi v5 document shape |
| Rich text | `src/lib/strapiRichText.ts`, `StrapiRichDescription.jsx` | Blocks + markdown rendering |

### Caching

- Most RSC pages: `export const revalidate = 60` (ISR, 60 seconds)
- `fetchStructuredPageBySlug` uses `next: { revalidate: 60 }`
- Strapi home-page GET responses: custom middleware `Cache-Control: s-maxage=60, stale-while-revalidate=300`

### Shared page template

`ExperienceDetailPageClient` is reused for:

- `/experiences/[slug]`
- `/charity/[slug]`
- `/designers/[slug]`
- `/featured-artists/[slug]`

Each route has its own fetcher/mapper but shares the same visual template (hero, detail rows, gallery).

---

## 6. Routes & data sources

| Route | Rendering | Primary CMS source | Fallback |
|-------|-----------|-------------------|----------|
| `/` | RSC | `home-page` + `home-page/below-fold` | Static slides, `tweetsData.js` |
| `/white-label` | RSC | GraphQL `aboutPage` + REST | `DUMMY_ABOUT_PAGE` |
| `/press` | RSC | GraphQL `pressPage` | REST + static video |
| `/speakers` | RSC | `speakers-page/by-slug` + home speaker section | Fallback gallery media |
| `/experiences` | RSC | `experiences-page` + `experience-pages` | `EXPERIENCES_INDEX_DEFAULTS` |
| `/experiences/[slug]` | RSC | `experience-pages/by-slug/:slug` | — |
| `/charity/[slug]` | RSC | `charity-pages/by-slug/:slug` | — |
| `/designers` | **Client** | `designer-page` + `designers` | Default hero video |
| `/designers/[slug]` | RSC | `designers/by-slug/:slug` | — |
| `/featured-artists` | **Client** | `featured-artists-page` + collection | Default hero |
| `/featured-artists/[slug]` | RSC | `featured-artists/by-slug/:slug` | — |
| `/privacy-policy` | RSC | `privacy-policy-page` | `PrivacyPolicyFallback` |
| `/terms-of-use` | RSC | `terms-of-use-page` | `TermsOfUseFallback` |
| `/portfolio` | Redirect | → `/experiences` | — |

**Sitemap** (`src/app/sitemap.js`): static routes + dynamic slugs from Strapi collections.

**Note:** Designers and Featured Artists **listing** pages fetch CMS data in `useEffect` (client-side only). Detail pages use SSR/ISR.

---

## 7. Strapi CMS — complete reference

### Admin access

- Local: `http://localhost:1337/admin`
- Production: `https://new-nolcha-strapi-uiai.onrender.com/admin` (or your `PUBLIC_URL`)

All content types use **Draft & Publish**. Public API custom controllers only return entries where `publishedAt` is set. **Always publish** after editing.

### Content type summary

#### Single types (site-wide pages / settings)

| Admin name | API UID | Frontend usage |
|------------|---------|----------------|
| **Home** | `home-page` | `/` homepage sections |
| **About** | `about-page` | `/white-label` |
| **Site footer** | `footer` | Footer + header X social link |
| **Navigation** | `navigation-menu` | Navbar structure |
| **Press** | `press-page` | `/press` |
| **Experiences (index)** | `experiences-page` | `/experiences` labels/SEO |
| **Speakers** | `speakers-page` | `/speakers` |
| **Designers (listing)** | `designer-page` | `/designers` hero/section |
| **Featured artists (listing)** | `featured-artists-page` | `/featured-artists` |
| **Privacy Policy** | `privacy-policy-page` | `/privacy-policy` |
| **Terms of Use** | `terms-of-use-page` | `/terms-of-use` |
| **Form notifications** | `form-notifications` | Email recipient for forms |

#### Collection types (repeatable entries)

| Admin name | API plural | Frontend usage |
|------------|------------|----------------|
| **Experience** | `experience-pages` | `/experiences/[slug]` + nav + homepage featured |
| **Experience Category** | `experience-categories` | Experiences index grouping + nav dropdown |
| **Charity** | `charity-pages` | `/charity/[slug]` + nav dropdown |
| **Designer** | `designers` | `/designers/[slug]` + listing |
| **Featured Artist** | `featured-artists` | `/featured-artists/[slug]` + listing |
| **Shared Speaker** | `shared-speaker-sections` | Homepage + speakers page |
| **Shared Tweet Carousel** | `shared-tweet-carousels` | Tweet carousels (bulk import supported) |

### Key field relationships

```
experience-page ←──manyToMany──→ experience-category

home-page ──manyToOne──→ shared-speaker-section
home-page ──manyToOne──→ shared-tweet-carousel
home-page ──manyToMany──→ experience-page (featured_experiences)

speakers-page ──manyToOne──→ shared-speaker-section
experience-page ──manyToOne──→ shared-tweet-carousel
```

### Home page sections (field → frontend component)

| Strapi field | Section |
|--------------|---------|
| `hero` | Video hero |
| `build_momentum_section` | Build Momentum |
| `image_gallery_slider` | Image gallery slider |
| `logo_slider` | Logo slider |
| `upcoming_events_section` | Upcoming events (also feeds navbar) |
| `evening_recap_section` | Evening recap |
| `service_section` | Explore services |
| `clients_section` | Our clients |
| `nolcha_experience_section` | Past experiences accordion |
| `shared_speaker_section` | Past speakers |
| `texthero_section` | Text hero slider |
| `artist_section` | Artists |
| `gallery_section` | Gallery |
| `shared_tweet_carousel` | Tweet carousel |
| `featured_experiences` | Past experiences cards |
| `contact_section` | Contact / Let's Talk target |

Home is split for performance:

- `GET /api/home-page` — above-the-fold
- `GET /api/home-page/below-fold` — rest of page

### Experience page fields

| Field | Purpose |
|-------|---------|
| `title`, `slug` | Page title and URL (`/experiences/{slug}`) |
| `hero` | Video hero (title, subtitle, video, thumbnail) |
| `listingImage` | Nav dropdown + index preview image |
| `tags` | Colored tags under event name on index |
| `categories` | Grouping on experiences index |
| `detail_rows` | Label/title/description rows on detail page |
| `gallery` | Media gallery with featured intervals |
| `shared_tweet_carousel` | Optional tweet section |
| `seo` | Meta title, description, OG image |

### Charity page fields

Same structure as experience minus `tags` and `categories`. Includes `listingImage` for nav hover previews.

### Footer fields

| Field | Purpose |
|-------|---------|
| `stay_informed_title`, `stay_informed_description` | Newsletter column copy |
| `logo`, `description` | Brand column |
| `social_links` | **Repeatable** social icons (platform, url, label) — preferred |
| `social_linkedin`, `social_instagram`, `social_x` | Legacy single URL fields (fallback) |
| `quick_links`, `resources` | Link columns (`shared.footer-column`) |
| `contact` | Address, email, company |
| `copyright` | Copyright line |

**Header X icon** reads the `x` entry from `social_links` (same footer singleton).

### Navigation menu

Repeatable `shared.navigation-item`:

- `label`, `href`, `subtitle`, `image`
- `children` → `shared.navigation-child-item` (label, slug, href, externalUrl, image)

Special behavior in frontend:

- **Experiences** children are merged from `experience-categories` collection
- **Charity** children from `charity-pages` collection
- **Upcoming** children from home page events + static `upcomingEvents.js` fallback

### Shared components (62 total)

Grouped by namespace in `NewNolchaBackend/src/components/`:

| Namespace | Examples |
|-----------|----------|
| `about.*` | statement, services, clients, press sections |
| `blocks.*` | gallery, tags, evening recap, image rows |
| `experience.*` | hero |
| `home.*` | build momentum, upcoming event, speaker item, contact |
| `press.*` | press cards, statement, media coverage |
| `project.*` | detail-row, media-gallery |
| `shared.*` | seo, navigation, footer links, tweet-item |

**Orphan components** (exist in Strapi but not attached to any content type): `white-label/*`, `designer/*`, some `home.*` and `shared.*` — safe to ignore or wire up later.

### Custom API routes (backend)

| Method | Path | Purpose |
|--------|------|---------|
| GET | `/api/home-page/below-fold` | Homepage lower sections |
| GET | `/api/experience-pages/by-slug/:slug` | Experience detail |
| GET | `/api/charity-pages/navigation` | Charity nav dropdown data |
| GET | `/api/charity-pages/by-slug/:slug` | Charity detail |
| GET | `/api/designers/by-slug/:slug` | Designer detail |
| GET | `/api/featured-artists/by-slug/:slug` | Featured artist detail |
| GET | `/api/speakers-page/by-slug/:slug` | Speakers page (singleton) |
| POST | `/api/contact/send` | Contact / Let's Chat / sponsorship |
| POST | `/api/newsletter/subscribe` | Footer newsletter |

### GraphQL custom queries

Registered in `NewNolchaBackend/src/index.ts`:

- `experiencePageBySlug(slug)`
- `charityPageBySlug(slug)`
- `designerBySlug(slug)`
- `featuredArtistBySlug(slug)`

Frontend uses hand-written `gql` queries for About and Press (codegen optional: `pnpm codegen`).

### Bootstrap permissions

On Strapi startup, `src/index.ts` auto-grants Public role permissions for many content APIs. **Gaps** — may need manual admin setup under Settings → Users & Permissions → Public:

- `about-page` find
- `designer-page` find
- `featured-artists-page` find
- `featured-artist` findBySlug
- `charity-page` listPublished

Contact and newsletter routes use `auth: false` and work without permissions.

---

## 8. Content editor guide

### Publishing workflow

1. Edit content in Strapi admin
2. Click **Publish** (draft content is not visible on the live site)
3. Wait up to **60 seconds** for frontend ISR cache to refresh (or trigger a Vercel redeploy for immediate effect)

### Common tasks

| Task | Where in Strapi |
|------|-----------------|
| Change homepage hero | Home → `hero` |
| Add upcoming event | Home → `upcoming_events_section` → events |
| Edit nav labels | Navigation → `items` |
| Add experience | Experience (collection) → new entry → assign categories → publish |
| Experience index labels | Experiences (index) → `label`, `filterLabel` |
| Add charity page | Charity (collection) |
| Footer social links | Site footer → **Social links** (add platform + URL) |
| Footer links | Site footer → Quick links / Resources |
| Legal text | Privacy Policy / Terms of Use single types |
| Form email recipient | Form notifications → `submissionRecipientEmail` |
| Tweet carousel | Shared Tweet Carousel → paste IDs in `bulkTweetIds` |

### Social links (footer + header)

Use **Social links** repeatable component:

| Platform | Icon |
|----------|------|
| `linkedin` | LinkedIn |
| `instagram` | Instagram |
| `x` | X (Twitter) — also shown in **header** on desktop and mobile menu |
| `facebook`, `youtube`, `tiktok`, `other` | Supported in footer |

Legacy fields `social_linkedin`, `social_instagram`, `social_x` still work as fallback if `social_links` is empty.

### Experience categories & index

- Categories are managed in **Experience Category** collection
- Each **Experience** links to one or more categories
- Index page groups experiences by category
- `tags` live on each **Experience** entry (not on category)
- `listingImage` on experience/charity drives navbar hover preview images

---

## 9. API & integration patterns

### REST fetch (frontend)

```javascript
// src/lib/strapi.js
const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

// GET https://{STRAPI}/api/{endpoint}
// Optional: Authorization: Bearer {NEXT_PUBLIC_STRAPI_API_TOKEN}
```

**Populate style (Strapi v5):**

```
populate[logo]=true
populate[quick_links][populate][links]=true
populate[0]=field&populate[1]=field.nested
```

**Response shapes:** Code handles both Strapi v4 (`data.attributes`) and v5 (flat documents) via `unwrapStrapiEntry()` and `flattenStrapiEntity()`.

### Footer client fetch

`Footer.jsx` uses `useFooterContent()` → `getFooterData()` on mount. Defaults in `DEFAULT_FOOTER_CONTENT` (`footerUtils.js`) apply until/unless Strapi responds.

### Navbar data flow

1. `ConditionalLayout` server-fetches nav collections
2. `Navbar` merges Strapi menu with dynamic children
3. X social URL from same footer Strapi data (`useFooterContent`)

### Forms

| Form | Endpoint | Frontend component |
|------|----------|-------------------|
| Let's Chat / Contact | `POST /api/contact/send` | `LetsChatModal.jsx` |
| Sponsorship | `POST /api/contact/send` | `SponsorshipDetailsModal` |
| Newsletter | `POST /api/newsletter/subscribe` | `Footer.jsx` |
| Inner Circle | `POST /api/join-inner-circle` | `InnerCircleModal` ⚠️ **broken** — no Next.js API route exists |

---

## 10. Media & assets

### Strapi uploads (production)

- Stored on **Cloudflare R2** via S3-compatible provider
- Public URLs via `R2_PUBLIC_URL`
- Responsive formats: xlarge, large, medium, small, xsmall

### Frontend image domains

Configured in `next.config.mjs` `images.remotePatterns`:

- Strapi / Render host
- Cloudflare R2 buckets (`pub-*.r2.dev`)
- Unsplash (if used)

### Static assets

- `public/` — logos, navbar images, fallback menu dropdown images
- Some hero videos reference R2 URLs directly in code fallbacks

### Media URL resolution

Use `resolveStrapiFileUrl()` from `strapiMediaUrl.js` — picks best format (large → medium → small → original).

---

## 11. Forms & email

### Recipient resolution

`getSubmissionRecipientEmail.ts` (backend):

1. Published **Form notifications** singleton in Strapi
2. `CONTACT_FORM_TO_EMAIL` env var
3. Default fallback email in code

### SMTP

Configured in `config/plugins.ts`. Required env vars: `SMTP_HOST`, `SMTP_PORT`, `SMTP_USERNAME`, `SMTP_PASSWORD`, `SMTP_DEFAULT_FROM`.

### Contact payload

`POST /api/contact/send` — used for general contact and sponsorship inquiries. Validated in `contact` controller; sends via Nodemailer.

---

## 12. Deployment

### Frontend — Vercel (inferred)

- Connect `NewNolchaFrontEnd` repo
- Set environment variables (section 4)
- Build: `pnpm build`
- `VERCEL_ENV=preview` automatically blocks indexing via `robots.js`

No `vercel.json` in repo; defaults apply.

### Backend — Render

Defined in `NewNolchaBackend/render.yaml`:

| Service | Details |
|---------|---------|
| Web | `new-nolcha-strapi`, Node starter |
| Build | `npm ci && npm run build` |
| Start | `npm run start` |
| Health | `/admin` |
| Database | Postgres `new-nolcha-postgres` (basic-256mb) |
| Disk | 5 GB at `public/uploads` (secondary to R2) |

**Manual secrets in Render dashboard:**

- `PUBLIC_URL`
- R2 credentials (`R2_ENDPOINT`, `R2_BUCKET`, keys, `R2_PUBLIC_URL`)
- SMTP credentials
- `APP_KEYS` and JWT secrets (auto-generated on first deploy)

### Deploy checklist

- [ ] Strapi: schema changes → `npm run build` on Render (or auto on push)
- [ ] Strapi: publish all singletons after schema migration
- [ ] Frontend: `NEXT_PUBLIC_STRAPI_URL` points to production Strapi
- [ ] Frontend: API tokens set for server fetches
- [ ] R2: bucket public access / CDN URL correct
- [ ] SMTP: test contact form + newsletter
- [ ] Verify Public role permissions for new content types

---

## 13. Known issues & maintenance

### High priority

| Issue | Detail | Action |
|-------|--------|--------|
| **Inner Circle modal broken** | Posts to `/api/join-inner-circle` but no Next.js API route exists | Add API route or point to Strapi endpoint |
| **No `.env.example` on frontend** | New devs lack env template | Copy section 4 into `.env.example` |
| **Dual Strapi URL defaults** | Some files default to different Render hosts | Standardize `NEXT_PUBLIC_STRAPI_URL` |

### Medium priority

| Issue | Detail |
|-------|--------|
| Client-side listing pages | `/designers` and `/featured-artists` fetch in `useEffect` — no SSR for CMS content |
| Legacy `strapi.js` exports | Old fetchers (`getLandingPageData`, etc.) unused — may confuse |
| GraphQL codegen not run | No `__generated__/` folder; queries are manual |
| Duplicate route files | Charity and experience custom routes registered in two files each |
| Bootstrap permission gaps | Some endpoints may 403 until manually enabled in admin |

### Low priority / cleanup

- Orphan Strapi components (`white-label/*`, unused `designer/*`)
- Footer legacy social fields (`social_linkedin`, etc.) — migrate fully to `social_links`
- Unused npm deps on frontend: `mongoose`, `nodemailer`, `node-fetch`
### After schema changes

1. Restart Strapi locally (`npm run develop`)
2. Rebuild Strapi on Render
3. Re-publish affected content types
4. Verify frontend fetchers still populate correct fields

---

## 14. Quick reference

### Frontend key files

| File | Purpose |
|------|---------|
| `src/lib/strapi.js` | Main REST client + fetchers |
| `src/lib/fetchStructuredPageBySlug.ts` | by-slug + home split |
| `src/lib/experiencesIndexData.ts` | Experiences index + nav |
| `src/utils/footerUtils.js` | Footer mapping + hook |
| `src/components/common/Navbar.jsx` | Navigation UI |
| `src/components/common/Footer.jsx` | Footer UI |
| `src/app/ConditionalLayout.js` | Global layout wrapper |

### Backend key files

| File | Purpose |
|------|---------|
| `src/index.ts` | GraphQL extensions + bootstrap permissions |
| `config/plugins.ts` | R2 upload + SMTP email |
| `config/database.ts` | SQLite / Postgres |
| `config/middlewares.ts` | CSP, cache headers |
| `render.yaml` | Production deployment |
| `src/api/*/controllers/*.ts` | Custom find/by-slug logic |

### Content type counts

| Type | Count |
|------|-------|
| Single types | 13 |
| Collection types | 7 |
| Custom route APIs | 2 (contact, newsletter) |
| Shared components | 62 |

---

## Support contacts & credentials

Store securely (not in git):

- Strapi admin credentials
- Render dashboard access
- Vercel project access
- Cloudflare R2 bucket credentials
- SMTP provider credentials
- Strapi API tokens (full access + read-only for frontend)

---

*End of handoff document. For questions about a specific page, search this doc for the route name, then follow the Strapi content type and frontend file references.*
