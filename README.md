# Kira Landing Page (kira.id)

![Kira hero](./assets/preview.png)

## Made with ❤️ by the Kira.id open-source AI research team

Open-source code for the **Kira** marketing site.

- **Live site:** https://kira.id  
- **Repository:** https://github.com/kira-id/landingpage.kira

## Features
- Fast, responsive landing page, with unique animation
- SEO-friendly meta & Open Graph tags
- Lightweight, modern stack (Next.js + Tailwind CSS)
- Easy to customize (colors, copy, sections)

## Quick Start

### Prerequisites
- Node.js **18+** (LTS recommended)
- Package manager: **npm** (preferred) or **pnpm**/**yarn**

### Setup

```bash
# 1) Clone
git clone https://github.com/kira-id/landingpage.kira
cd landingpage.kira

# 2) Install deps
npm install
# or: pnpm install
# or: yarn

# 3) (Optional) Configure env (see .env.example if needed)
# cp .env.example .env.local

# 4) Run dev server
npm run dev
# or: pnpm dev
# or: yarn dev
# open http://localhost:3000

# 5) Build for production
npm run build
npm run start
```

## Project Structure (typical)

```
.
├─ app/                # App Router pages/layout (or pages/ if using Pages Router)
├─ components/         # Reusable UI components
├─ public/             # Static assets (images, icons, favicons)
├─ styles/             # Global styles (e.g., globals.css)
├─ tailwind.config.js  # Tailwind config (colors, fonts)
├─ next.config.js      # Next.js config
└─ package.json
```

> Note: Folders can differ based on the current implementation.

## Customize

- **Branding:** edit `tailwind.config.js` and global CSS tokens.
- **SEO:** update metadata in `app/layout.tsx` (or `_document.tsx`) and any SEO helper.
- **Content/sections:** tweak components in `components/` and page files in `app/` (or `pages/`).
- **Assets:** replace files in `public/` (logo, favicons, `og-image.png` ~ 1200×630).

## Deployment

- **Vercel (recommended):** import the repo, set environment variables if used, deploy.
- Other hosts (Netlify/Render) work if they support Next.js: `build` then `start`.

Typical commands:
```bash
npm run build && npm run start
# or: pnpm build && pnpm start
# or: yarn build && yarn start
```

## FAQ

**What is this repo?**  
Open-source code for the marketing site at **kira.id**. Lightweight Next.js/Tailwind; no app/database by default.

**Do I need environment variables?**  
Usually **no**. If you enable analytics, forms, or monitoring, copy `.env.example` → `.env.local` and fill only the keys you use.

**How do I run it locally?**  
```bash
npm install
npm run dev
# open http://localhost:3000
```
Requires Node.js **18+**.

**Where are SEO/meta tags?**  
In `app/layout.tsx` (or `_document.tsx`). Update title, description, Open Graph, and Twitter tags.

**How do I change logos, favicon, and social share image?**  
Replace assets in `public/` (e.g., `/favicon.ico`, `/apple-touch-icon.png`, `/og-image.png`).

**Can I enable analytics?**  
Yes—choose **one** provider (Plausible, Umami, GA4, PostHog), add its `NEXT_PUBLIC_*` keys, and include the small init snippet if the code paths exist.

**How do I add a contact form?**  
- API route + **Resend**: set `RESEND_API_KEY` and `CONTACT_TO_EMAIL`; post to `/api/contact`.  
- Or use an external backend (Formspree, etc.). Remove unused keys from `.env.example`.

**How do I deploy?**  
Vercel is the easiest path. Import repo → set env vars (if any) → Deploy.

**Browser support?**  
Modern evergreen browsers (last 2 versions). Mobile-first responsive.

**Trademarks/branding?**  
Code is open-source per [LICENSE](./LICENSE). **Kira** brand names, logos, and trademarks remain their owners’ property.

**How do I contribute?**  
Fork → branch (`feat/your-feature`) → PR. Open an Issue for larger changes first.

**Security reports?**  
Avoid public issues for sensitive reports. Use GitHub **Security Advisories** (if enabled) or contact maintainers privately.

## Contributing

1. Fork the repo  
2. Create a branch: `git checkout -b feat/your-feature`  
3. Commit: `git commit -m "feat: add your feature"`  
4. Push & open a PR

## License

See [LICENSE](./LICENSE).
