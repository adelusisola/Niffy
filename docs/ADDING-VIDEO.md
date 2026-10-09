# Project videos (YouTube)

## Current state

**One video per project page.**

| Page | Video | Status |
|---|---|---|
| `projects/closer-to-the-tide.html` | Wedding film | Live — `aIYp1Khz2Z8` |
| `projects/north-dock.html` | North Dock launch film | Pending — awaiting link |
| `projects/before-the-city-wakes.html` | Before the City Wakes | Pending — awaiting link |

Pending pages show a "Film coming soon" pill rather than a dead play button.

## Adding or changing a link

Edit the `data-video-id` attribute on the `<div class="case-video">` element.
**Any of these formats work** — the page extracts the ID automatically:

```html
data-video-id="https://www.youtube.com/watch?v=XXXXXXXXXXX"
data-video-id="https://youtu.be/XXXXXXXXXXX"
data-video-id="https://www.youtube.com/embed/XXXXXXXXXXX?si=abc"
data-video-id="https://www.youtube.com/shorts/XXXXXXXXXXX"
data-video-id="XXXXXXXXXXX"          <!-- bare 11-character id -->
```

Each project page holds a single `.case-video` block. If you ever want a
second film on a page, copy the whole `<div class="case-video">` element and
give it its own `data-video-title`.

## How the player behaves

- **Link present:** poster image + play button. Clicking swaps in the
  `youtube-nocookie` player with full controls (play/pause, seek, volume,
  quality, fullscreen). Nothing loads from YouTube until the visitor clicks,
  so page speed and privacy are preserved.
- **No link:** a "Film coming soon" pill replaces the play button and the
  trigger gets `aria-disabled`, so an empty slot never looks broken.

## Important

The wedding film is used with the owner's confirmation that it is his own
work or licensed to him. If that changes, update the caption and
`data-video-title` so the page does not misrepresent authorship.

## Why embeds can fail with "Error 153"

YouTube's embedded-player terms require the embed request to carry an `HTTP Referer`
header to identify the embedding site. If the Referer is suppressed, the player
shows **"Error 153: Video player configuration error"**.

Two protections are in place so this cannot happen here:

1. **`<meta name="referrer" content="strict-origin-when-cross-origin">`** in every
   page's `<head>`. This policy still sends a Referer cross-origin (only the origin
   is sent, not the full URL), which satisfies YouTube without leaking page paths.
2. **`origin` parameter in the embed URL**, built at runtime from `window.location.origin`.

Do not change the server's `Referrer-Policy` header to `same-origin` or
`no-referrer` — either value suppresses the Referer on cross-origin requests and
will immediately break every video on the site.
