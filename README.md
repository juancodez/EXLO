# Exlo

**Export once. Deliver everything.**

Exlo is a Figma plugin that exports your logos, components, or frames into multiple file formats at once — SVG, PDF, PNG 1×, PNG 2×, and JPG — bundled into a single ZIP, ready to hand off immediately. Select one frame or many. No repetition, no waiting.

---

## Features

- **Multi-format export** — SVG, PDF, PNG 1×, PNG 2×, JPG in one action
- **Multi-selection** — select multiple frames and export all at once
- **Smart download** — single format downloads directly; multiple formats bundle into one ZIP
- **Color profiles** — Document (default), sRGB, Display P3 for raster exports
- **No backend** — runs entirely inside Figma, nothing leaves your machine

## Install

[**Get it on the Figma Community →**](https://www.figma.com/community/plugin/1672407387388463996)

## Usage

1. Select one or more frames on your canvas
2. Open **Plugins → Exlo**
3. Pick your formats and color profile
4. Click **Export selection**

A single format downloads directly. Multiple formats are bundled into `exports.zip`.

## Development

No build step. Pure vanilla JS.

```
exlo/
├── manifest.json   # Plugin config
├── code.js         # Plugin thread — reads selection, calls exportAsync
├── ui.html         # UI thread — format picker, ZIP bundling
├── jszip.min.js    # Bundled locally (no CDN dependency)
├── icon.svg        # Signet mark
└── wordmark.svg    # Logotype
```

**Load locally in Figma:**

1. Figma Desktop → Plugins → Development → Import plugin from manifest
2. Select `manifest.json`
3. Select a frame → Plugins → Development → Exlo

## License

MIT © [Juan Gomez Vara](https://github.com/juancodez)
