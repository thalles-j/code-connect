export const initUpload = () => {
  const uploadBtn = document.querySelector("#btn-upload");
  const inputUpload = document.querySelector("#img-upload");
  const imgPrincipal = document.querySelector('.main-img');
  const nomeImg = document.querySelector('.container-img-name p');

  // Ativar o input de arquivo escondido ao clicar no botão de upload
  uploadBtn.addEventListener('click', () => {
    inputUpload.click();
  });

  // Função para ler o arquivo como uma promise e retornar o conteúdo ou erro
  const lerConteudoArquivo = (arquivo) => {
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
  };

  // Evento para mostrar a imagem e o nome após o upload
  inputUpload.addEventListener('change', async (e) => {
    const arquivo = e.target.files[0];

    if (arquivo && arquivo.type.startsWith('image/')) {
      try {
        const conteudoArquivo = await lerConteudoArquivo(arquivo);
        imgPrincipal.src = conteudoArquivo.url;
        nomeImg.innerHTML = conteudoArquivo.nome;
      } catch (erro) {
        console.error('Erro na leitura do arquivo', erro);
      }
    } else {
      alert("Por favor, selecione uma imagem válida.");
    }
  });

  const btnRemoveForm = document.querySelector('#btn-remove-upload');
  btnRemoveForm.addEventListener('click', (e) => {
    e.preventDefault();
    imgPrincipal.src = 'src/assets/img/imagem1.png'; // Caminho da imagem padrão
    nomeImg.textContent = 'imagem-projeto.png'; // Nome padrão
    inputUpload.value = ""; // Limpa o input de upload
  });
};