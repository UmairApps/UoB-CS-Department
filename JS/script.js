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

  // If no saved theme, detect browser preference
  if (!theme) {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    theme = prefersDark ? 'dark' : 'light';
  }

  body.setAttribute('data-theme', theme);
  updateThemeToggleIcon(theme);
}

// Toggle theme and save to localStorage
function toggleTheme() {
  const body = document.body;
  const currentTheme = body.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';

  updateThemeToggleIcon(newTheme);
  body.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
}

// Initialize theme as soon as script loads
initTheme();

// Discord bubble functionality
function initDiscordBubble() {
  const bubble = document.getElementById('discord-bubble');
  if (bubble) {
    bubble.addEventListener('click', () => {
      window.open('https://discord.gg/6PX5kjSdJG', '_blank');
    });
  }
}

initDiscordBubble();
