const imageInput = document.querySelector('#image-input');
const captionInput = document.querySelector('#caption-input');
const textInput = document.querySelector('#text-input');
const addButton = document.querySelector('#add-button');
const saveButton = document.querySelector('#save-button');
const loadButton = document.querySelector('#load-button');
const container = document.querySelector('#container');

let references = [];

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
Expand All	@@ -33,36 +33,51 @@ function displayReference(reference) {
   const div = document.createElement('div');
   const img = document.createElement('img');
   const p = document.createElement('p');
   const removeButton = document.createElement('button');

   img.src = reference.imageURL;
   p.textContent = reference.text;
   removeButton.innerHTML = '<i class="fas fa-times"></i>';

   div.appendChild(img);
   div.appendChild(p);
   div.appendChild(removeButton);

   container.appendChild(div);

   // Event listener for remove button click
   removeButton.addEventListener('click', () => {
     // Remove the reference from the array
     const index = references.indexOf(reference);
     if (index > -1) {
       references.splice(index, 1);
     }

     // Remove the reference from the container
     container.removeChild(div);
   });
 }

 // Event listener for saving data
 saveButton.addEventListener('click', () => {
   // Convert references array to JSON string
   const data = JSON.stringify(references);

   // Create a Blob object with the data
   const blob = new Blob([data], { type: 'application/json' });

   // Create a download URL for the Blob object
   const downloadURL = URL.createObjectURL(blob);

   // Create a temporary <a> element to trigger the download
   const link = document.createElement('a');
   link.href = downloadURL;
   link.download = 'references.json';

   // Append the link to the document and trigger the click event
   document.body.appendChild(link);
   link.click();

   // Clean up by removing the temporary link
   document.body.removeChild(link);
 });
Expand All	@@ -72,33 +87,33 @@ loadButton.addEventListener('click', () => {
   // Create an input element of type 'file'
   const fileInput = document.createElement('input');
   fileInput.type = 'file';

   // Trigger the file input dialog when the input element is clicked
   fileInput.click();

   // Event listener for file input change
   fileInput.addEventListener('change', () => {
     // Retrieve the selected file
     const file = fileInput.files[0];

     // Create a FileReader object
     const reader = new FileReader();

     // Event listener for file reading completion
     reader.addEventListener('load', () => {
       // Parse the JSON string from the loaded file
       const data = reader.result;
       references = JSON.parse(data);

       // Clear the container
       container.innerHTML = '';

       // Display all references
       references.forEach(reference => {
         displayReference(reference);
       });
     });

     // Read the file as text
     reader.readAsText(file);
   });
