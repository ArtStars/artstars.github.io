// Sample resource data
const resources = [
  {
    name: "Lospec Palette List",
    location: "Online",
    type: "Palette List",
    description: "A collection of color palettes for pixel art and game development.",
    website: "https://lospec.com/palette-list"
  },
  {
    name: "Lospec",
    location: "Online",
    type: "Website",
    description: "A platform for pixel art, game graphics, and demoscene content.",
    website: "https://lospec.com/"
  },
  // Add more resource objects as needed
];

// Function to generate HTML for each resource
function generateResourceHTML(resource) {
  return `
    <div class="resource">
      <h2>${resource.name}</h2>
      <p><strong>Location:</strong> ${resource.location}</p>
      <p><strong>Type:</strong> ${resource.type}</p>
      <p>${resource.description}</p>
      <a href="${resource.website}" target="_blank">Visit Website</a>
    </div>
  `;
}

// Function to display resources
function displayResources() {
  const resourceList = document.getElementById('resourceList');
  resourceList.innerHTML = '';

  // Filter resources based on search input
  const searchInput = document.getElementById('searchInput').value.toLowerCase();
  const filteredResources = resources.filter(resource =>
    resource.name.toLowerCase().includes(searchInput) ||
    resource.location.toLowerCase().includes(searchInput) ||
    resource.type.toLowerCase().includes(searchInput)
  );

  // Generate HTML for each filtered resource
  filteredResources.forEach(resource => {
    const resourceHTML = generateResourceHTML(resource);
    resourceList.insertAdjacentHTML('beforeend', resourceHTML);
  });
}

// Event listener for search input
document.getElementById('searchInput').addEventListener('input', displayResources);

// Display initial list of resources on page load
displayResources();
