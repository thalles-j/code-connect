import { verificarPalavraOfensiva } from "./verificarPalavras.js";

const uploadBtn = document.querySelector("#btn-upload");
const inputUpload = document.querySelector("#img-upload");

//ativar a input file escondida no button
uploadBtn.addEventListener('click', () => {
    inputUpload.click();
})

//Function para ler o arquivo como uma promise e retorna se esta certo ou errado.

export function lerConteudoArquivo(arquivo){
  return new Promise((resolve, reject) => {
    const leitor = new FileReader();
    //Se o File estiver completo, 
    leitor.onload = () =>{
      resolve({url: leitor.result, nome: arquivo.name})

    }
    //Se o File nao for completo a arrow funciton vai retornar a mensagem de erro
    leitor.onerror = () =>{
      reject(`Erro na leitura do arquivo ${arquivo.name}`)
    }

    leitor.readAsDataURL(arquivo)
  });
}

const imgPrincipal = document.querySelector('.main-img');
const nomeImg = document.querySelector('.container-img-name p');

inputUpload.addEventListener('change', async (e) => {
  const arquivo = e.target.files[0];

  if(arquivo){
    try {
      const conteudoArquivo = await lerConteudoArquivo(arquivo);
      imgPrincipal.src = conteudoArquivo.url;
      nomeImg.textContent = conteudoArquivo.nome;
      }
      catch (erro){
        console.error('Erro na leitura do arquivo');


      }
  }
});

//adicionar tags do projeto
const inputTags = document.querySelector('#input-tags');
const listTags = document.querySelector('.list-tags');

inputTags.addEventListener('keypress', (e) =>{
    if(e.key === 'Enter'){
        //função para nao atualizar a pagina.
        e.preventDefault();

        const tagText = inputTags.value.trim().toLowerCase();
        if (tagText !== "") {
            // Chama a função que verifica se a palavra é ofensiva
            const isOffensive = verificarPalavraOfensiva(tagText);

            if (isOffensive) {
                inputTags.classList.add('danger');
                inputTags.innerHTML = 'Palavra Ofensiva!'
                
            } else {
                inputTags.classList.remove('danger');
                const newTag = document.createElement('li');
                newTag.innerHTML = `<p>${tagText}</p> <img src="/src/img/close-black.svg" class="remove-tag">`;
                listTags.appendChild(newTag);
                inputTags.value = ""; // Limpa o campo de entrada
            }
        }
    }
});