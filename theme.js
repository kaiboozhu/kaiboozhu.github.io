(() => {
  'use strict';
  const button = document.getElementById('theme-toggle');
  const root = document.documentElement;
  const meta = document.querySelector('meta[name="theme-color"]');
  if (!button) return;
  function applyTheme(theme) {
    const dark = theme === 'dark';
    root.dataset.theme = dark ? 'dark' : 'light';
    const label = dark ? 'Switch to light mode' : 'Switch to dark mode';
    button.setAttribute('aria-label', label);
    button.title = label;
    button.setAttribute('aria-pressed', String(dark));
    if (meta) meta.content = dark ? '#202124' : '#ffffff';
  }
  applyTheme(root.dataset.theme);
  button.hidden = false;
  button.addEventListener('click', () => {
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    try { localStorage.setItem('kaibo-site-theme', next); } catch (_) {}
  });
  window.addEventListener('storage', event => {
    if (event.key === 'kaibo-site-theme' || event.key === null) {
      applyTheme(event.newValue === 'dark' ? 'dark' : 'light');
    }
  });
})();
