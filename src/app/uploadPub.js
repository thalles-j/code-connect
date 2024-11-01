// upload.js
const uploadBtn = document.querySelector("#btn-upload");
const inputUpload = document.querySelector("#img-upload");
const imgPrincipal = document.querySelector('.main-img');
const nomeImg = document.querySelector('.container-img-name p');

uploadBtn.addEventListener('click', () => {
    inputUpload.click();
});

export function lerConteudoArquivo(arquivo) {
  return new Promise((resolve, reject) => {
    const leitor = new FileReader();
    leitor.onload = () => {
      resolve({ url: leitor.result, nome: arquivo.name });
    };
    leitor.onerror = () => {
      reject(`Erro na leitura do arquivo ${arquivo.name}`);
    };
    leitor.readAsDataURL(arquivo);
  });
}

inputUpload.addEventListener('change', async (e) => {
  const arquivo = e.target.files[0];
  if (arquivo) {
    try {
      const conteudoArquivo = await lerConteudoArquivo(arquivo);
      imgPrincipal.src = conteudoArquivo.url;
      nomeImg.innerHTML = conteudoArquivo.nome;
    } catch (erro) {
      console.error('Erro na leitura do arquivo');
    }
  }
});
