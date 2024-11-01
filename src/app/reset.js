// reset.js
const btnRemoveForm = document.querySelector('#btn-remove-upload');
const imgPrincipal = document.querySelector('.main-img');
const nomeImg = document.querySelector('.container-img-name p');
const listTags = document.querySelector('.list-tags');

btnRemoveForm.addEventListener('click', (e) => {
  e.preventDefault();
  const form = document.querySelector('form');
  form.reset();
  imgPrincipal.src = 'src/assets/img/imagem1.png';
  nomeImg.textContent = 'imagem-projeto.png';
  listTags.innerHTML = "";
});
