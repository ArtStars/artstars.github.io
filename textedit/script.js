document.getElementById('boldBtn').addEventListener('click', function() {
    document.execCommand('bold', false, null);
});

document.getElementById('italicBtn').addEventListener('click', function() {
    document.execCommand('italic', false, null);
});

document.getElementById('underlineBtn').addEventListener('click', function() {
    document.execCommand('underline', false, null);
});
