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
  const caption = captionInput.value;
  const text = textInput.value;

  const reference = { imageURL, caption, text };

  references.push(reference);

  imageInput.value = '';
  captionInput.value = '';
  textInput.value = '';

  displayReference(reference);
});

function displayReference(reference) {
  const div = document.createElement('div');
  const img = document.createElement('img');
  const pCaption = document.createElement('p');
  const pText = document.createElement('p');
  const removeButton = document.createElement('button');

  img.src = reference.imageURL;
  pCaption.textContent = reference.caption;
  pText.innerHTML = marked(reference.text);
  removeButton.innerHTML = '<i class="fas fa-times"></i>';

  div.appendChild(img);
  div.appendChild(pCaption);
  div.appendChild(pText);
  div.appendChild(removeButton);

  container.appendChild(div);

  removeButton.addEventListener('click', () => {
    const index = references.indexOf(reference);
    if (index > -1) {
      references.splice(index, 1);
    }

    container.removeChild(div);
  });
}

saveButton.addEventListener('click', () => {
  const data = JSON.stringify(references);

  const blob = new Blob([data], { type: 'application/json' });
  const downloadURL = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = downloadURL;
  link.download = 'references.json';

  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
});

loadButton.addEventListener('click', () => {
  const fileInput = document.createElement('input');
  fileInput.type = 'file';

  fileInput.click();

  fileInput.addEventListener('change', () => {
    const file = fileInput.files[0];

    const reader = new FileReader();

    reader.addEventListener('load', () => {
      const data = reader.result;
      references = JSON.parse(data);

      container.innerHTML = '';

      references.forEach(reference => {
        displayReference(reference);
      });
    });

    reader.readAsText(file);
  });
});
