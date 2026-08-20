figma.showUI(__html__, { width: 300, height: 400 });

figma.ui.onmessage = async (msg) => {
  if (msg.type === 'resize') {
    figma.ui.resize(300, msg.height);
    return;
  }

  if (msg.type !== 'export') return;

  const selection = figma.currentPage.selection;
  if (!selection.length) {
    figma.ui.postMessage({ type: 'error', msg: 'Select at least one frame.' });
    return;
  }

  const errors = [];

  for (const node of selection) {
    for (const fmt of msg.formats) {
      const opts =
        fmt === 'PNG_2x' ? { format: 'PNG', constraint: { type: 'SCALE', value: 2 } } :
        fmt === 'PNG'    ? { format: 'PNG', constraint: { type: 'SCALE', value: 1 } } :
                          { format: fmt };
      // ponytail: colorProfile only applies to raster; SVG/PDF ignore it
      if ((fmt === 'PNG' || fmt === 'PNG_2x' || fmt === 'JPG') && msg.colorProfile) {
        opts.colorProfile = msg.colorProfile;
      }
      try {
        const bytes = await node.exportAsync(opts);
        figma.ui.postMessage({
          type: 'download',
          name: node.name,
          format: fmt,
          bytes: Array.from(bytes)
        });
      } catch (e) {
        errors.push(`${node.name} (${fmt}): ${e.message}`);
      }
    }
  }

  figma.ui.postMessage({ type: 'done', errors });
};
