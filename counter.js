(() => {
  const targets = document.querySelectorAll('[data-visitor-counter]');
  if (!targets.length) return;

  if (['localhost', '127.0.0.1'].includes(window.location.hostname)) {
    return;
  }

  const trackedUrl = 'https://truenorth24300.github.io/hokuto-website/';
  const endpoint = 'https://hitscounter.dev/api/hit?url='
    + encodeURIComponent(trackedUrl)
    + '&output=json&tz=Asia%2FTokyo';

  fetch(endpoint, { cache: 'no-store' })
    .then((response) => {
      if (!response.ok) throw new Error('Counter request failed');
      return response.json();
    })
    .then((data) => {
      const total = Number(data.total_hits);
      if (!Number.isFinite(total)) throw new Error('Invalid counter response');
      const label = `閲覧 ${total.toLocaleString('ja-JP')}`;
      targets.forEach((target) => { target.textContent = label; });
    })
    .catch(() => {
      targets.forEach((target) => { target.textContent = '閲覧 —'; });
    });
})();
