// Simpan canvas jadi file PNG.
window.Brat = window.Brat || {};

Brat.exporter = (() => {
  function toFileName(text) {
    const slug = text.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 30);
    return `${slug || 'brat'}.png`;
  }

  function download(canvas, text) {
    canvas.toBlob((blob) => {
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = toFileName(text);
      a.click();
      URL.revokeObjectURL(a.href);
    }, 'image/png');
  }

  return { download };
})();
