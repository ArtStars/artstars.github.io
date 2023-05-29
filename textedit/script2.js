var editor = CodeMirror.fromTextArea(document.getElementById("editor"), {
    mode: "markdown",
    theme: "monokai",
});

var converter = new showdown.Converter();
editor.on("change", function () {
    var markdownText = editor.getValue();
    var htmlText = converter.makeHtml(markdownText);
    document.getElementById("preview").innerHTML = htmlText;
});
