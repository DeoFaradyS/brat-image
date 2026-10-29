// Menggambar hasil layout ke canvas.
window.Brat = window.Brat || {};

Brat.renderer = (() => {
  const { size, margin, font, lineHeight, background, color } = Brat.config;
  const boxSize = size - margin * 2;

  // Justify: renggangkan spasi antar kata. Baris terakhir / satu kata: tengah.
  function drawLine(ctx, line, y) {
    const words = line.text.split(' ');
    if (line.last || words.length < 2) {
      ctx.textAlign = 'center';
      ctx.fillText(line.text, size / 2, y);
      return;
    }
    ctx.textAlign = 'left';
    const wordsWidth = words.reduce((sum, w) => sum + ctx.measureText(w).width, 0);
    const gap = (boxSize - wordsWidth) / (words.length - 1);
    let x = margin;
    for (const w of words) {
      ctx.fillText(w, x, y);
      x += ctx.measureText(w).width + gap;
    }
  }

  function render(canvas, rawText) {
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = background;
    ctx.fillRect(0, 0, size, size);

    const text = rawText.trim();
    if (!text) return;

    const { fontSize, lines } = Brat.layout.fit(ctx, text);
    const lh = fontSize * lineHeight;
    const top = (size - lines.length * lh) / 2 + lh / 2;

    ctx.font = `${fontSize}px ${font}`;
    ctx.fillStyle = color;
    ctx.textBaseline = 'middle';
    lines.forEach((line, i) => drawLine(ctx, line, top + i * lh));
  }

  return { render };
})();
