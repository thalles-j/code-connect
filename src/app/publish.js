// publish.js
const btnPublish = document.querySelector('.btn-publish');

function publishProject(formNome, formDesc, tagsForm) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const deuCerto = Math.random() > 0.5;
      if (deuCerto) {
        resolve('projeto publicado com sucesso.');
      } else {
        reject('erro ao enviar o projeto.');
      }
    }, 2000);
  });
}

btnPublish.addEventListener('click', async (e) => {
  e.preventDefault();
  const formNome = document.querySelector('.form-Name').value;
  const formDesc = document.querySelector('.form-Desc').value;
  const tagsForm = Array.from(document.querySelectorAll('.list-tags p')).map((tag) => tag.textContent);
  try {
    const result = await publishProject(formNome, formDesc, tagsForm);
    alert("deu certo");
  } catch (erro) {
    alert("deu errado");
  }
});
