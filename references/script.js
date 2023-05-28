// Retrieve elements from the DOM
const imageInput = document.querySelector('#image-input');
const textInput = document.querySelector('#text-input');
const addButton = document.querySelector('#add-button');
const saveButton = document.querySelector('#save-button');
const loadButton = document.querySelector('#load-button');
const container = document.querySelector('#container');

// Store reference data
let references = [];

// Event listeners for adding images and text
addButton.addEventListener('click', () => {
  const imageURL = imageInput.value;
  const text = textInput.value;
  
  // Create a new reference object
  const reference = { imageURL, text };
  
  // Add the reference to the array
  references.push(reference);
  
  // Clear input fields
  imageInput.value = '';
  textInput.value = '';
  
  // Display the reference
  displayReference(reference);
});

// Function to display a reference
function displayReference(reference) {
  const div = document.createElement('div');
  const img = document.createElement('img');
  const p = document.createElement('p');
  
  img.src = reference.imageURL;
  p.textContent = reference.text;
  
  div.appendChild(img);
  div.appendChild(p);
  
  container.appendChild(div);
}

// Event listener for saving data
saveButton.addEventListener('click', () => {
  // Convert references array to JSON string
  const data = JSON.stringify(references);
  
  // Save the data to local storage
  localStorage.setItem('references', data);
});

// Event listener for loading data
loadButton.addEventListener('click', () => {
  // Retrieve the data from local storage
  const data = localStorage.getItem('references');
  
  // Parse the JSON string to get the references array
  references = JSON.parse(data);
  
  // Clear the container
  container.innerHTML = '';
  
  // Display all references
  references.forEach(reference => {
    displayReference(reference);
  });
});
