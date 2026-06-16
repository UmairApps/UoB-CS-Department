// Teacher data with PDF files
const teachers = [
  {
    name: 'Abdul Basit',
    title: 'Chair Person',
    file: 'Abdul Basit.pdf',
    initials: 'AB'
  },
  {
    name: 'Dr. Atiq Ahmed',
    title: 'Assistant Professor',
    file: 'Dr. Atiq Ahmed.pdf',
    initials: 'AA'
  },
  {
    name: 'Dr. Waheed',
    title: 'Associate Professor',
    file: 'Dr.Waheed.pdf',
    initials: 'DW'
  },
  {
    name: 'Dr. Junaid',
    title: 'Associate Professor',
    file: 'DrJunaid.pdf',
    initials: 'DJ'
  },
  {
    name: 'Dr. Maheen',
    title: 'Assistant Professor',
    file: 'DrMaheen.pdf',
    initials: 'DM'
  },
  {
    name: 'Dr. Shumail',
    title: 'Assistant Professor',
    file: 'DrShumail.pdf',
    initials: 'DS'
  },
  {
    name: 'Ihsan Ullah',
    title: 'Associate Professor',
    file: 'IhsanUllah.pdf',
    initials: 'IU'
  }
];

// Sort teachers alphabetically by name
const sortedTeachers = [...teachers].sort((a, b) => a.name.localeCompare(b.name));
let filteredTeachers = [...sortedTeachers];

function renderTeachers() {
  const grid = document.getElementById('teachersGrid');
  grid.innerHTML = '';

  if (filteredTeachers.length === 0) {
    grid.innerHTML = `
      <div class="no-results">
        <ion-icon name="search"></ion-icon>
        <p>No teachers found. Try a different search.</p>
      </div>
    `;
    return;
  }

  filteredTeachers.forEach((teacher) => {
    const card = document.createElement('div');
    card.className = 'teacher-card';
    card.innerHTML = `
      <div class="teacher-avatar">${teacher.initials}</div>
      <div class="teacher-content">
        <div class="teacher-name">${teacher.name}</div>
        <div class="teacher-title">${teacher.title}</div>
        <a  href="../FILES/${encodeURIComponent(teacher.file)}" target="_blank" class="view-btn"> 
          <ion-icon name="eye"></ion-icon>
          View PDF
        </a>
      </div>
    `;
    grid.appendChild(card);
  });
}

function filterTeachers(query) {
  const searchTerm = query.toLowerCase();
  filteredTeachers = sortedTeachers.filter((teacher) =>
    teacher.name.toLowerCase().includes(searchTerm) ||
    teacher.title.toLowerCase().includes(searchTerm)
  );
  renderTeachers();
}

// Event listeners
document.getElementById('searchInput').addEventListener('input', (e) => {
  filterTeachers(e.target.value);
});

// Initial render
document.addEventListener('DOMContentLoaded', renderTeachers);
