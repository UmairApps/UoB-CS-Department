// =========================================
// Google Apps Script API URL
// =========================================

const API_URL = "https://script.google.com/macros/s/AKfycbwbnL0Of01USleb1gO4cNiGSsUD5oT0wjusdvDKFbK0XPVN92rpRV-sM2cA0pWJYJtpQw/exec";

// =========================================
// Convert Google Drive URL
// =========================================

function convertDriveImageUrl(url) {

  if (!url) return "";

  const match = url.match(/\/d\/([^/]+)/);

  if (!match) return url;

  return `https://lh3.googleusercontent.com/d/${match[1]}`;
}

function makeLinksClickable(text) {

  if (!text) return "";

  const urlRegex = /(https?:\/\/[^\s]+)/g;

  return text.replace(
    urlRegex,
    '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>'
  );
}

// =========================================
// Load Announcements
// =========================================

async function loadAnnouncements() {

  const container = document.getElementById("announcements");

  container.innerHTML = `
        <div class="loading">
            Loading announcements...
        </div>
    `;

  try {

    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("Failed to fetch announcements");
    }

    const data = await response.json();

    container.innerHTML = "";

    const activeAnnouncements = data
      .filter(item =>
        String(item.Status || "")
          .trim()
          .toLowerCase() === "active"
      )
      .sort((a, b) => new Date(b.Date) - new Date(a.Date));

    if (activeAnnouncements.length === 0) {

      container.innerHTML = `
                <div class="empty">
                    No announcements available.
                </div>
            `;

      return;
    }

    activeAnnouncements.forEach(item => {

      // console.log(item);

      const imageUrl = convertDriveImageUrl(item.ImageLink);

      const formattedDate = item.Date
        ? new Date(item.Date).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric"
        })
        : "";

      const card = document.createElement("div");


      card.className = "ann";

      card.innerHTML = `

                <h2>${item.Title || "Untitled"}</h2>

              ${formattedDate
          ? `<div class="date">${formattedDate}</div>`
          : ""
        }

                ${imageUrl
          ? `
                    <div class="media">
                        <img
                            src="${imageUrl}"
                            alt="${item.Title}"
                            loading="lazy"
                            style="max-width:100%; border-radius:10px;"
                        >
                    </div>
                    `
          : ""
        }

                ${item.VideoLink
          ? `
      <div class="media">
          <a
              href="${item.VideoLink}"
              target="_blank"
              rel="noopener noreferrer"
              class="video-btn"
          >
              ▶ Watch Video
          </a>
      </div>
      `
          : ""
        }

                ${item.Content
          ? `<div class="content">${makeLinksClickable(item.Content)}</div>`
          : ""
        }

            `;
      container.appendChild(card);
    });

  }
  catch (error) {

    console.error(error);

    container.innerHTML = `
            <div class="error">
                Failed to load announcements.
            </div>
        `;
  }
}

// =========================================
// Initial Load
// =========================================

loadAnnouncements();

// =========================================
// Auto Refresh Every 60 Seconds
// =========================================

// setInterval(loadAnnouncements, 60000);