# Font Sourcing — Neef Studios Brand Typefaces (October 2026)

## What happened to the designer's fonts
The brand package (`assets/Assets-20261008T001116Z-1-001/`) arrived from a macOS
archive in which **all 160 font files are empty AppleDouble `._` metadata stubs
(176 bytes each — zero font data)**. Only the logos, cover banners and the
guideline PDF survived. There is no recoverable font data locally (checked
Downloads, Trash, temp files).

## Where each brand typeface stands

### 1. Sora — brand primary typeface ✅ OBTAINED & LIVE
- **Licence:** SIL Open Font License 1.1 — free for any use, including
  commercial web embedding and self-hosting. No permission needed.
- **Source:** Google Fonts (official distribution).
- **Status:** Downloaded as a variable WOFF2 (weights 100–800, latin subset,
  25 KB) at `assets/fonts/sora/sora-latin-var.woff2`, self-hosted, preloaded,
  and wired in as the body/UI typeface on all 12 pages.
- **Action required:** none.

### 2. Display face: Fraunces retained (Bodoni Moda trial reverted 2026-10-08)
- Bodoni Moda was installed as an Arviel stand-in and trialled on the live
  site; the owner reviewed it and **reverted to Fraunces** the same day.
- Fraunces (SIL OFL) remains the display face; Fraunces woff2 stays
  self-hosted and preloaded. No Bodoni files remain in the project.

### 3. RCL Arviel — original brand display typeface ⚠️ NOT EMBEDDED (by choice)
- **Designer:** Roomspace Creative Lab (roomspacecreativelab.com).
- **Availability:** free DEMO (personal use only) on 1001fonts / FontSpace /
  Fontesk; full family (18 weights + italics) sold via the foundry and
  Creative Market; web-font licences offered via marketplaces such as
  YouWorkForThem.
- **Decision (owner, 2026-10-08):** keep **Fraunces** (SIL OFL, already tuned)
  as the site's display face instead of purchasing.
- **If this changes later:** buy the web licence from the foundry, place the
  granted WOFF2 files in `assets/fonts/arviel/`, then swap the `--font-display`
  stack. Do NOT embed the free DEMO files on a commercial site.

### 4. Jeorg — unknown role ❌ NOT NEEDED
- Identified as "Jeorg Sans" (Webhance), sold via Envato Elements /
  Creative Fabrica under subscription licences.
- It is **not referenced anywhere in the brand guideline's typography
  section**, so it plays no defined role in the identity. Not pursued.

## Current web type system (all self-hosted, licence-clean)
| Role | Font | Licence | File |
|---|---|---|---|
| Display (headlines, quotes) | Fraunces variable | SIL OFL | `assets/fonts/fraunces-latin.woff2` |
| Body / UI (brand primary) | Sora variable | SIL OFL | `assets/fonts/sora/sora-latin-var.woff2` |
| Fallback (unused unless Sora fails) | Inter variable | SIL OFL | `assets/fonts/inter-latin.woff2` |

Both brand-guide obligations met within licence law: Sora is the brand's own
primary face; the expressive display role is covered by Fraunces until/unless
RCL Arviel is licensed.

## If the designer re-sends fonts
Ask for: (1) a properly compressed zip (not macOS Finder "Compress" of a
folder with resource forks — or have them zip via "Compress" then verify on a
Windows/Linux machine), (2) written confirmation of which licence they hold
for RCL Arviel and whether it covers web embedding for client sites, (3) the
intended role of Jeorg. Then re-evaluate.
