// Titik masuk: sambungkan elemen HTML ke modul.
(() => {
  const canvas = document.getElementById('cv');
  const input = document.getElementById('txt');
  const button = document.getElementById('dl');

  const update = () => Brat.renderer.render(canvas, input.value);

  input.addEventListener('input', update);
  button.addEventListener('click', () => Brat.exporter.download(canvas, input.value));
  update();
})();
