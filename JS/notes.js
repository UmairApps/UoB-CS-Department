// Initialize theme on page load
function updateThemeToggleIcon(theme) {
  const icon = document.querySelector('.theme-toggle');
  if (icon) {
    icon.textContent = theme === 'light' ? '🌙' : '☀️';
  }
}

function initTheme() {
  const body = document.body;
  let theme = localStorage.getItem('theme');

  if (!theme) {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    theme = prefersDark ? 'dark' : 'light';
  }

  body.setAttribute('data-theme', theme);
  updateThemeToggleIcon(theme);
}

function toggleTheme() {
  const body = document.body;
  const currentTheme = body.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';

  body.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateThemeToggleIcon(newTheme);
}

function filterNotes(query) {
  const searchTerm = query.trim().toLowerCase();
  const noteLinks = document.querySelectorAll('.files-list a.icons');
  let visibleCount = 0;

  noteLinks.forEach(link => {
    const label = link.textContent.trim().toLowerCase();
    const visible = !searchTerm || label.includes(searchTerm);
    link.style.display = visible ? '' : 'none';
    if (visible) visibleCount++;
  });

  const filesContainer = document.getElementById('files');
  let emptyMessage = document.getElementById('no-results');

  if (!emptyMessage) {
    emptyMessage = document.createElement('div');
    emptyMessage.id = 'no-results';
    emptyMessage.className = 'fmeta';
    emptyMessage.style.marginTop = '12px';
    filesContainer.appendChild(emptyMessage);
  }

  emptyMessage.textContent = visibleCount === 0 ? 'No matching notes found.' : '';
  emptyMessage.style.display = visibleCount === 0 ? 'block' : 'none';
}

function initSearch() {
  const searchInput = document.getElementById('search');
  if (!searchInput) return;

  searchInput.addEventListener('input', event => {
    filterNotes(event.target.value);
  });
}

function initDiscordBubble() {
  const bubble = document.getElementById('discord-bubble');
  if (bubble) {
    bubble.addEventListener('click', () => {
      window.open('https://discord.gg/6PX5kjSdJG', '_blank');
    });
  }
}

initTheme();
initSearch();
initDiscordBubble();
