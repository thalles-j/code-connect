export const initPublish = () => {
  const btnPublish = document.querySelector('.btn-publish');

  const publishProject = (formNome, formDesc, tagsForm) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const deuCerto = Math.random() > 0.5;

        if (deuCerto) {
          resolve('Projeto publicado com sucesso.');
        } else {
          reject('Erro ao enviar o projeto.');
        }
      }, 2000);
    });
  };

  btnPublish.addEventListener('click', async (e) => {
    e.preventDefault();

    const formNome = document.querySelector('.form-Name').value;
    const formDesc = document.querySelector('.form-Desc').value;
    const tagsForm = Array.from(document.querySelector('.list-tags').querySelectorAll("p")).map((tag) => tag.textContent);

    try {
      const result = await publishProject(formNome, formDesc, tagsForm);
      alert(result);
    } catch (erro) {
      alert(erro);
    }
  });
};