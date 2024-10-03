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
      nomeImg.innerHTML = conteudoArquivo.nome;

      }
      catch (erro){
        console.error('Erro na leitura do arquivo');


      }
  }
});

const btnRemoveImg = document.querySelector('#btn-remove-upload');

btnRemoveImg.addEventListener('click', () =>{
  // Verificar se existe uma imagem carregada
  if (imgPrincipal.src && imgPrincipal.src !== window.location.href) {
    // Se tiver imagem, remover a imagem e o nome
    imgPrincipal.src = ""; 
    nomeImg.innerHTML = ""; 
    inputUpload.value = ""; // Limpar o input file
  } else {
    // Se não tiver imagem, exibir mensagem de alerta
    alert("Não há imagem carregada para remover.");
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
                inputTags.value = "Palavra Ofensiva!!"
                
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

listTags.addEventListener('click', (e) =>{
  if(e.target.classList.contains('remove-tag')){
    const tagRemovedora = e.target.parentElement;
    listTags.removeChild(tagRemovedora);
  }
});

const tagsOn = ['Front-end','Programação','Data Science','Back-end','Full-stack','Desing Gráfico'];

async function verificaTagsOn(tagText) {
  return new Promise((resolve) =>{
    setTimeout(() =>{
      resolve(tagsOn.includes(tagText));

    }, 1000);
  });
  
}