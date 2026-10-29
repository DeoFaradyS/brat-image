// Logika tata letak murni: pecah baris dan cari ukuran font terbesar yang muat.
// Tidak menggambar apa pun.
window.Brat = window.Brat || {};

Brat.layout = (() => {
  const { size, margin, font, lineHeight, minFont, maxFont } = Brat.config;
  const boxSize = size - margin * 2;

  // Pecah teks jadi baris {text, last}. last = baris terakhir paragraf.
  function wrap(ctx, text, fontSize) {
    ctx.font = `${fontSize}px ${font}`;
    const lines = [];
    for (const para of text.split('\n')) {
      let line = '';
      for (const word of para.split(/\s+/).filter(Boolean)) {
        const test = line ? `${line} ${word}` : word;
        if (line && ctx.measureText(test).width > boxSize) {
          lines.push({ text: line, last: false });
          line = word;
        } else {
          line = test;
        }
      }
      lines.push({ text: line, last: true });
    }
    return lines;
  }

  function fits(ctx, lines, fontSize) {
    ctx.font = `${fontSize}px ${font}`;
    return (
      lines.length * fontSize * lineHeight <= boxSize &&
      lines.every((l) => ctx.measureText(l.text).width <= boxSize)
    );
  }

  // Binary search ukuran font terbesar yang masih muat.
  function fit(ctx, text) {
    let lo = minFont, hi = maxFont, best = minFont;
    while (lo <= hi) {
      const mid = (lo + hi) >> 1;
      if (fits(ctx, wrap(ctx, text, mid), mid)) { best = mid; lo = mid + 1; }
      else hi = mid - 1;
    }
    return { fontSize: best, lines: wrap(ctx, text, best) };
  }

  return { fit };
})();
