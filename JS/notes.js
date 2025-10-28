const api = {
      list: '/api/files',
      upload: '/api/upload'
    };

    // Theme toggle persist
    const body = document.body;
    const themeBtn = document.getElementById('themeBtn');
    const saved = localStorage.getItem('theme');
    if (saved) body.setAttribute('data-theme', saved);
    themeBtn.addEventListener('click', () => {
      const next = body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      body.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
    });

    // Fetch & render files
    async function fetchFiles(q = '') {
      try {
        const res = await fetch(api.list + (q ? `?q=${encodeURIComponent(q)}` : ''));
        if (!res.ok) throw new Error('Failed to fetch');
        const files = await res.json();
        renderFiles(files);
      } catch (e) {
        console.error(e);
        document.getElementById('files').innerHTML = '<div class="fmeta">Unable to load files.</div>';
      }
    }

    function renderFiles(files) {
      const container = document.getElementById('files');
      container.innerHTML = '';
      if (!files.length) {
        container.innerHTML = '<div class="fmeta">No files found.</div>'; return;
      }
      files.forEach(f => {
        const row = document.createElement('div');
        row.className = 'file-row';
        row.innerHTML = `
          <div class="file-meta">
            <div class="file-icon" aria-hidden="true"></div>
            <div>
              <div class="fname">${escapeHtml(f.name)}</div>
              <div class="fmeta">${f.mimeType} • ${f.size ? humanSize(f.size) : '—'}</div>
            </div>
          </div>
          <div class="actions">
            <a href="${f.webViewLink}" target="_blank" rel="noopener">View</a>
            ${f.webContentLink ? `<a href="${f.webContentLink}" target="_blank" rel="noopener">Download</a>` : ''}
          </div>`;
        container.appendChild(row);
      });
    }

    // Upload handler
    const uploadForm = document.getElementById('uploadForm');
    uploadForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const fileInput = document.getElementById('fileInput');
      if (!fileInput.files.length) return alert('Select a file first');
      const fd = new FormData();
      fd.append('file', fileInput.files[0]);
      const contributor = document.getElementById('contributor').value.trim();
      if (contributor) fd.append('contributor', contributor);
      try {
        const res = await fetch(api.upload, { method: 'POST', body: fd });
        if (!res.ok) throw new Error('Upload failed');
        alert('Uploaded successfully');
        fileInput.value = '';
        fetchFiles();
      } catch (err) {
        console.error(err);
        alert('Upload error');
      }
    });

    // Refresh & search
    document.getElementById('refreshBtn').addEventListener('click', () => fetchFiles());
    document.getElementById('search').addEventListener('input', (e) => {
      const q = e.target.value.trim();
      fetchFiles(q);
    });

    // Filter tags
    document.querySelectorAll('.tag').forEach(btn => {
      btn.addEventListener('click', () => {
        const f = btn.getAttribute('data-filter');
        document.getElementById('search').value = f;
        fetchFiles(f);
      });
    });

    // Helpers
    function escapeHtml(s) { return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }
    function humanSize(bytes) {
      if (!bytes) return '';
      const units = ['B', 'KB', 'MB', 'GB'];
      let i = 0; let n = bytes;
      while (n >= 1024 && i < units.length - 1) { n /= 1024; i++; }
      return `${Math.round(n * 10) / 10}${units[i]}`;
    }

    // initial load
    fetchFiles();