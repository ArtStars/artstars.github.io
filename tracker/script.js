// Function to create a new task item
function createTaskItem(taskName, startTime) {
  const taskItem = document.createElement('div');
  taskItem.classList.add('task');

  const taskNameElement = document.createElement('span');
  taskNameElement.textContent = taskName;

  const startTimeElement = document.createElement('span');
  startTimeElement.textContent = startTime.toLocaleTimeString();

  const endTimeElement = document.createElement('span');

  const stopButton = document.createElement('button');
  stopButton.textContent = 'Stop';

  taskItem.appendChild(taskNameElement);
  taskItem.appendChild(document.createTextNode(' - '));
  taskItem.appendChild(startTimeElement);
  taskItem.appendChild(document.createTextNode(' - '));
  taskItem.appendChild(endTimeElement);
  taskItem.appendChild(document.createTextNode(' '));
  taskItem.appendChild(stopButton);

  return taskItem;
}

// Function to display tasks
function displayTasks() {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';

  const tasks = loadTasksFromCookie();

  // Generate task items
  tasks.forEach(task => {
    const taskItem = createTaskItem(task.name, task.startTime);
    taskList.appendChild(taskItem);
  });
}

// Function to start a new task
function startTask(taskName) {
  const startTime = new Date();
  const task = { name: taskName, startTime };

  const tasks = loadTasksFromCookie();
  tasks.push(task);

  saveTasksToCookie(tasks);
}

// Function to stop a task
function stopTask(taskIndex) {
  const tasks = loadTasksFromCookie();

  if (taskIndex >= 0 && taskIndex < tasks.length) {
    const endTime = new Date();
    tasks[taskIndex].endTime = endTime;
    saveTasksToCookie(tasks);
    displayTasks();
  }
}

// Function to save tasks to a cookie
function saveTasksToCookie(tasks) {
  const jsonTasks = JSON.stringify(tasks);
  document.cookie = `tasks=${encodeURIComponent(jsonTasks)}`;
}

// Function to load tasks from a cookie
function loadTasksFromCookie() {
  const cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)tasks\s*\=\s*([^;]*).*$)|^.*$/, "$1");
  if (cookieValue) {
    const decodedValue = decodeURIComponent(cookieValue);
    return JSON.parse(decodedValue);
  }
  return [];
}

// Event listener for form submission
document.getElementById('taskForm').addEventListener('submit', function (event) {
  event.preventDefault();
  const taskNameInput = document.getElementById('taskName');
  const taskName = taskNameInput.value.trim();

  if (taskName) {
    startTask(taskName);
    taskNameInput.value = '';
    displayTasks();
  }
});

// Event listener for stop button clicks
document.getElementById('taskList').addEventListener('click', function (event) {
  if (event.target.tagName.toLowerCase() === 'button') {
    const taskItem = event.target.closest('.task');
    const taskIndex = Array.from(taskItem.parentNode.children).indexOf(taskItem);
    stopTask(taskIndex);
  }
});

// Display initial tasks on page load
displayTasks();
