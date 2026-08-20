# Exlo — Figma Plugin

Batch multi-format exporter. Select a frame → export SVG, PDF, PNG 1x, PNG 2x, JPG all at once.

## Architecture

Figma plugins run in two sandboxed JS environments that communicate via messages:

| Thread | File | Access |
|--------|------|--------|
| **Plugin thread** | `code.js` | `figma.*` API, selected nodes, `exportAsync` |
| **UI thread** | `ui.html` | DOM, Blob, download triggers — no `figma.*` |

**Plugin → UI:** `figma.ui.postMessage(data)`  
**UI → Plugin:** `parent.postMessage({ pluginMessage: data }, '*')`  
**UI receives:** `window.onmessage = ({ data: { pluginMessage } }) => ...`

## Key API calls

```js
// Get selected node
const node = figma.currentPage.selection[0];

// Export as PNG @2x
const bytes = await node.exportAsync({ format: 'PNG', constraint: { type: 'SCALE', value: 2 } });

// Export as SVG / PDF (no constraint needed)
const bytes = await node.exportAsync({ format: 'SVG' });
```

`exportAsync` returns a `Uint8Array`. Convert to `Array.from(bytes)` before postMessage (structured clone handles arrays, not typed arrays across threads).

## Load locally

1. Figma Desktop → Plugins → Development → Import plugin from manifest
2. Select `manifest.json` in this folder
3. Select a frame on canvas → Plugins → Development → Exlo → Run

## Publish description

**Tagline:** Export once. Deliver everything.

**Description:**
> Exlo exports your logos, components, or frames into multiple file formats at once — SVG, PDF, PNG 1×, PNG 2×, and JPG — bundled into a single ZIP, ready to hand off immediately. Select one frame or many. No repetition, no waiting.

Use the tagline as the short description and the paragraph as the full description when submitting to the Figma Community.

## Publish checklist

- [ ] Generate a real plugin ID at figma.com/plugin/create
- [ ] Replace `"id": "exlo-dev"` in `manifest.json`
- [ ] Add icon (32×32 and 128×128 PNG) and reference in manifest
- [ ] Submit via Figma → Plugins → Development → Publish

## Roadmap (add when needed)

- Multi-selection support (loop over `figma.currentPage.selection`)
- ZIP bundling via JSZip (one download instead of N)
- Custom scale input for rasters
- TypeScript + esbuild (when code grows complex enough)
