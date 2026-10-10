# Project Structure (October 2026)

```
/
├── index.html               Home
├── work.html                Portfolio (index list + filterable grid)
├── about.html               Studio story
├── packages.html            Pricing & packages
├── contact.html             Contact + FAQ + booking modal
├── privacy.html             Privacy policy
├── 404.html                 Not-found page
├── projects/                Case studies
│   ├── somewhere-slowly.html
│   └── closer-to-the-tide.html
├── journal/                 Studio journal
│   ├── index.html
│   ├── what-to-wear.html
│   └── how-it-feels.html
├── assets/
│   ├── brand/               Brand identity (web-used + source package)
│   │   ├── logo-full-brown.svg   Header/footer logo (in use)
│   │   ├── logo-icon-brown.svg   Favicon mark (in use)
│   │   ├── pattern-tile.svg      Contact-band pattern (in use)
│   │   └── source/               Designer's original package (guideline PDF,
│   │                             all logo variants, cover banners)
│   ├── fonts/               Self-hosted webfonts (all SIL OFL)
│   │   ├── fraunces-latin.woff2       Display (variable 300-600)
│   │   ├── sora/sora-latin-var.woff2  Body (variable 100-800)
│   │   ├── signature/kaushan-script-latin.woff2  Footer signature (brush script)
│   │   └── inter-latin.woff2          Fallback (variable 400-700)
│   ├── img/webp/            Photography, semantic names + width suffix
│   │   ├── family-*-480/900/1600.webp
│   │   ├── wedding-*-480/900/1600/2200.webp
│   │   ├── portrait-…  event-…  brand-…  documentary-…  editorial-…  social-…
│   ├── favicon-32x32.png
│   ├── apple-touch-icon.png
│   └── icons.svg            UI icon sprite
├── netlify/
│   └── functions/send-booking-email.js   Booking endpoint (Resend)
├── netlify.toml             Headers + publish config
├── robots.txt
├── sitemap.xml
├── site.js                  All site behaviour
├── styles.css               All styles
├── docs/                    Project documentation
    ├── PROJECT-STRUCTURE.md
    ├── FONT-SOURCING.md
    ├── ADDING-VIDEO.md
    └── DEPLOYMENT.md
```

## Naming conventions
- Images: `{subject}-{original-id}-{width}.webp` — subject describes content.
- Brand files in `assets/brand/` are canonical; `source/` is the untouched
  designer package for reference/print work. Do not hotlink from `source/`.
- Docs live in `docs/`; deployable web files never reference `docs/` or
  `assets/brand/source/`.
