const saveButton = document.getElementById("saveBtn");

var editor = CodeMirror.fromTextArea(document.getElementById("editor"), {
    mode: "markdown",
    theme: "monokai",
});

var converter = new showdown.Converter();

// Event listener for the "New" button
document.getElementById("newBtn").addEventListener("click", function () {
    editor.setValue(""); // Reset the editor
});

// Event listener for the "Open" button
document.getElementById("openBtn").addEventListener("change", function (e) {
    var file = e.target.files[0];
    var reader = new FileReader();
    reader.onload = function (event) {
        var contents = event.target.result;
        editor.setValue(contents); // Load the file contents into the editor
    };
    reader.readAsText(file);
});

 // Event listener for saving data
 saveButton.addEventListener('click', () => {
   // Convert references array to JSON string
   const data = JSON.stringify(references);

   // Create a Blob object with the data
   const blob = new Blob([data], { type: 'text/plain;charset=utf-8' });

   // Create a download URL for the Blob object
   const downloadURL = URL.createObjectURL(blob);

   // Create a temporary <a> element to trigger the download
   const link = document.createElement('a');
   link.href = downloadURL;
   link.download = 'document.md';

   // Append the link to the document and trigger the click event
   document.body.appendChild(link);
   link.click();

   // Clean up by removing the temporary link
   document.body.removeChild(link);
 });
