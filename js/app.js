let listaAmigos = [];

function adicionar() {
    let nomeAmigo = document.getElementById('nome-amigo');

    // Validação campo vazio
    if (nomeAmigo.value == '') {
        alert('Digite um nome!');
        return;
    } 
    
    // Validação nome repetido
    if (listaAmigos.includes(nomeAmigo.value.toUpperCase())) {
        alert('Caso tenha mais de um amigo com o mesmo nome, utilize a incial do sobrenome para identificar cada um (Ex.: Pedro B. e Pedro L.)');
        return;
    }
    
    // Validação limite de participantes
    if (listaAmigos.length < 5) {
        listaAmigos.push(nomeAmigo.value.toUpperCase());
    } else {
        alert('O número máximo de participantes é 5!');
        return;
    }

    nomeAmigo.value = '';

    atualizarLista();
    atualizarSorteio();
}

function sortear() {
    let listaSorteioDisplay = document.getElementById('lista-sorteio');
    let botaoSortear = document.getElementById('botao-sortear');

    // Validação mínimo de participantes para sorteio
    if (listaAmigos.length < 4) {
        alert('Adicione pelo menos 4 pessoas à lista primeiro!');
        return;
    } 
    
    // Limpa a lista de nomes para refazer o sorteio com os mesmos participantes
    if (listaSorteioDisplay.textContent != '') {
        listaSorteioDisplay.textContent = '';
    }

    embaralhaLista(listaAmigos);

    // Exibe em tela a lista dos nomes sorteados
    for (i = 0; i < listaAmigos.length; i++) {
        if (i == listaAmigos.length - 1) {
            listaSorteioDisplay.innerHTML += `${converteNomes(listaAmigos[i])} --> ${converteNomes(listaAmigos[0])} <br>`;
        } else {
            listaSorteioDisplay.innerHTML += `${converteNomes(listaAmigos[i])} --> ${converteNomes(listaAmigos[i + 1])} <br>`;
        }
        
    }

    botaoSortear.textContent = 'Repetir';
}

function excluirAmigo(index) {
    listaAmigos.splice(index, 1);
    atualizarLista();
    atualizarSorteio();
}

function atualizarSorteio() {
    let sorteio = document.getElementById('lista-sorteio');
    sorteio.innerHTML = '';
}


function atualizarLista() {
    let lista = document.getElementById('lista-amigos');
    lista.innerHTML = '';

    for (let i = 0; i < listaAmigos.length; i++) {
        // Cria um elemento de parágrafo para cada amigo
        let paragrafo = document.createElement('p');
        paragrafo.textContent = converteNomes(listaAmigos[i]);
       
        // Adiciona um evento de clique para excluir o amigo
        paragrafo.addEventListener('click', function() {
            excluirAmigo(i);
        });

        // Adiciona o parágrafo à lista
        lista.appendChild(paragrafo);
    }
}

function reiniciar() {
    listaAmigos = [];
    document.getElementById('nome-amigo').value = '';
    document.getElementById('lista-amigos').textContent = '';
    document.getElementById('lista-sorteio').innerHTML = '';
    document.getElementById('botao-sortear').textContent = 'Sortear';
}

function embaralhaLista(lista) {
    for (let indice = lista.length; indice; indice--) {
        const indiceAleatorio = Math.floor(Math.random() * indice);
        [lista[indice - 1], lista[indiceAleatorio]] = [lista[indiceAleatorio], lista[indice - 1]];
    }
}

// Converte os nomes maiúsculos da lista de amigos para o formato "capitalize"
function converteNomes(nome) {
    return nome.charAt(0).toUpperCase() + nome.slice(1).toLowerCase();
}