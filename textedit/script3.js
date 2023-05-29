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

// Event listener for the "Save" button
document.getElementById("saveBtn").addEventListener("click", function () {
    var markdownText = editor.getValue();
    var blob = new Blob([markdownText], { type: "text/plain;charset=utf-8" });
    saveAs(blob, "document.md"); // Save the file with a default name "document.md"
});

// Update preview on editor change
editor.on("change", function () {
    var markdownText = editor.getValue();
    var htmlText = converter.makeHtml(markdownText);
    document.getElementById("preview").innerHTML = htmlText;
});
