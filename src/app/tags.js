// tags.js
const inputTags = document.querySelector('#input-tags');
const divInputTags = document.querySelector('.input-tags-box');
const listTags = document.querySelector('.list-tags');
const btnInputTags = document.querySelector('#btnInputTags');

const tagsOn = {
  'frontend': 'Front-end',
  'front-end': 'Front-end',
  'front end': 'Front-end',
  'front': 'Front-end',
  'backend': 'Back-end',
  'back-end': 'Back-end',
  'back end': 'Back-end',
  'back': 'Back-end',
  'fullstack': 'Full-stack',
  'full-stack': 'Full-stack',
  'full stack': 'Full-stack',
  'programacao': 'Programação',
  'programação': 'Programação',
  'datascience': 'Data Science',
  'data-science': 'Data Science',
  'data science': 'Data Science',
  'design grafico': 'Design Gráfico',
  'design gráfico': 'Design Gráfico',
  'desing grafico': 'Design Gráfico',
  'desing gráfico': 'Design Gráfico'
};

function normalizarTexto(texto) {
  return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

async function verificaTagsOn(tagText) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(tagsOn.hasOwnProperty(normalizarTexto(tagText)));
    }, 1000);
  });
}

btnInputTags.addEventListener('click', async (e) => {
  e.preventDefault();
  const tagText = inputTags.value.trim();
  const tagTextNormalizado = normalizarTexto(tagText);
  if (tagText.length > 20) {
    divInputTags.classList.add('danger');
    inputTags.value = "Máximo de 20 caracteres!";
    return;
  }
  if (tagText !== "") {
    const tagOnly = await verificaTagsOn(tagTextNormalizado);
    if (!tagOnly) {
      divInputTags.classList.add('danger');
      inputTags.value = '';
      inputTags.placeholder = "Tag não permitida!";
    } else {
      divInputTags.classList.remove('danger');
      const formattedTag = tagsOn[tagTextNormalizado];
      const newTag = document.createElement('li');
      newTag.innerHTML = `<p>${formattedTag}</p> <img src="src/assets/img/close-black.svg" class="remove-tag">`;
      listTags.appendChild(newTag);
      inputTags.value = "";
    }
  }
});

listTags.addEventListener('click', (e) => {
  if (e.target.classList.contains('remove-tag')) {
    const tagRemovedora = e.target.parentElement;
    listTags.removeChild(tagRemovedora);
  }
});
