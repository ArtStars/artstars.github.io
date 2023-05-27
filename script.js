// Sample web app data
const webApps = [
  {
    name: "Project Management",
    url: "/management"
  },
  {
    name: "Resource Database",
    url: "/resources"
  },
  {
    name: "Collaboration Platform",
    url: "https://example.com/collaboration-platform"
  },
  // Add more web app objects as needed
];

// Function to generate HTML for each web app link
function generateAppHTML(app) {
  return `
    <div class="app">
      <a href="${app.url}" target="_blank">${app.name}</a>
    </div>
  `;
}

// Function to display web app links
function displayApps() {
  const appList = document.getElementById('appList');
  appList.innerHTML = '';

  // Generate HTML for each web app link
  webApps.forEach(app => {
    const appHTML = generateAppHTML(app);
    appList.insertAdjacentHTML('beforeend', appHTML);
  });
}

// Display initial list of web app links on page load
displayApps();
