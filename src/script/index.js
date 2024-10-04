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
    nomeImg.innerHTML = "Envie um arquivo"; 
    inputUpload.value = "";
  } else {
    // Se não tiver imagem, exibir mensagem de alerta
    alert("Não há imagem carregada para remover.");
  }
});


const inputTags = document.querySelector('#input-tags');
const listTags = document.querySelector('.list-tags');

listTags.addEventListener('click', (e) =>{
  if(e.target.classList.contains('remove-tag')){
    const tagRemovedora = e.target.parentElement;
    listTags.removeChild(tagRemovedora);
  }
});

const tagsOn = {
  'frontend': 'Front-end',
  'front-end': 'Front-end',
  'front end': 'Front-end',
  
  'backend': 'Back-end',
  'back-end': 'Back-end',
  'back end': 'Back-end',
  
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
  // Remove acentos e transforma em minúsculas
  return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

async function verificaTagsOn(tagText) {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Verifica se a tag está no objeto `tagsOn` após ser normalizada
      resolve(tagsOn.hasOwnProperty(normalizarTexto(tagText)));
    }, 1000);
  });
}

// adicionar tags do projeto
inputTags.addEventListener('keypress', async (e) => {
  if (e.key === 'Enter') {
    // função para não atualizar a página
    e.preventDefault();

    const tagText = inputTags.value.trim(); // Mantém o texto original
    const tagTextNormalizado = normalizarTexto(tagText); // Normaliza o texto para comparações

    // Verificação de limite de caracteres
    if (tagText.length > 20) {
      inputTags.classList.add('danger');
      inputTags.value = "Máximo de 20 caracteres!";
      return; // Impede a continuação da execução se o limite for excedido
    }

    if (tagText !== "") {
      // Chama a função que verifica se a tag está na lista permitida
      const tagOnly = await verificaTagsOn(tagTextNormalizado);

      if (!tagOnly) {
        inputTags.classList.add('danger');
        inputTags.value = "Tag não permitida!";
      } else {
        inputTags.classList.remove('danger');
        // Mapeia para o formato correto da tag
        const formattedTag = tagsOn[tagTextNormalizado];
        
        const newTag = document.createElement('li');
        newTag.innerHTML = `<p>${formattedTag}</p> <img src="/src/img/close-black.svg" class="remove-tag">`;
        listTags.appendChild(newTag);
        inputTags.value = ""; // limpa o campo de entrada
      }
    }
  }
});
