// Function to create a new project element
function createProjectElement(projectName) {
  const projectElement = document.createElement('div');
  projectElement.classList.add('project');
  projectElement.textContent = projectName;
  return projectElement;
}

// Function to save projects to a cookie
function saveProjectsToCookie(projects) {
  const jsonProjects = JSON.stringify(projects);
  document.cookie = `projects=${encodeURIComponent(jsonProjects)}`;
}

// Function to load projects from a cookie
function loadProjectsFromCookie() {
  const cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)projects\s*\=\s*([^;]*).*$)|^.*$/, "$1");
  if (cookieValue) {
    const decodedValue = decodeURIComponent(cookieValue);
    return JSON.parse(decodedValue);
  }
  return [];
}

// Function to display projects
function displayProjects() {
  const projectList = document.getElementById('projectList');
  projectList.innerHTML = '';

  const projects = loadProjectsFromCookie();

  // Generate project elements
  projects.forEach(projectName => {
    const projectElement = createProjectElement(projectName);
    projectList.appendChild(projectElement);
  });
}

// Function to handle form submission
function handleFormSubmit(event) {
  event.preventDefault();
  
  const projectNameInput = document.getElementById('projectName');
  const projectName = projectNameInput.value.trim();
  
  if (projectName) {
    const projectElement = createProjectElement(projectName);
    const projectList = document.getElementById('projectList');
    projectList.appendChild(projectElement);

    projectNameInput.value = '';
    
    const projects = loadProjectsFromCookie();
    projects.push(projectName);
    saveProjectsToCookie(projects);
  }
}

// Event listener for form submission
document.getElementById('projectForm').addEventListener('submit', handleFormSubmit);

// Display initial projects on page load
displayProjects();
