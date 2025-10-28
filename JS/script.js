function toggleTheme() {
  const body = document.body;
  const currentTheme = body.getAttribute("data-theme");
  body.setAttribute("data-theme", currentTheme === "light" ? "dark" : "light");
  const saved = localStorage.getItem('data-theme');
}

// const body = document.body;
//     const themeBtn = document.getElementById('themeBtn');
//     const saved = localStorage.getItem('theme');
//     if (saved) body.setAttribute('data-theme', saved);
//     themeBtn.addEventListener('click', () => {
//       const next = body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
//       body.setAttribute('data-theme', next);
//       localStorage.setItem('theme', next);
// });

