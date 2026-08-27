(() => {
  const pageName = window.location.pathname.split('/').pop();
  const isTopPage = !pageName || pageName === 'index_a.html';
  if (!isTopPage) return;

  const targets = document.querySelectorAll('[data-visitor-counter]');
  if (!targets.length) return;

  if (['localhost', '127.0.0.1'].includes(window.location.hostname)) {
    return;
  }

  // 2026-08-27 に累計をリセットした識別子。公開ページのURL自体は変わりません。
  const trackedUrl = 'https://truenorth24300.github.io/hokuto-website/index_a.html?counter=reset-20260827';
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
