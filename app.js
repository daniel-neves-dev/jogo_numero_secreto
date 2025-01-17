let listaNumerosSorteados = []
let limiteNumeros = 10;
let numeroSecreto = gerarNumeroAleatorio()
let tentativas = 1;

console.log(numeroSecreto)

function exibirTextoNatela(tag, texto){
    let elemento = document.querySelector(tag);
    elemento.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate: 1.2})
}
function menssagemInicial(){
    exibirTextoNatela('h1', 'Jogo do número secreto');
    exibirTextoNatela('p', `Escolha um número entre 1 e ${limiteNumeros}`);
}

menssagemInicial();

function gerarNumeroAleatorio(){
    let numeroSorteado = parseInt(Math.random() * limiteNumeros + 1);
    if (listaNumerosSorteados.length == limiteNumeros - 2){
        listaNumerosSorteados = [];
    }
    if (listaNumerosSorteados.includes(numeroSorteado)){
        return gerarNumeroAleatorio();
    } else {
        listaNumerosSorteados.push(numeroSorteado);
        console.log(listaNumerosSorteados)
        return numeroSorteado;
    }
}

function advinharNumero(){
    let numeroUsuario = document.querySelector('input').value;
    let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
    let menssagem = `Você acertou com ${tentativas} ${palavraTentativa}`;

    if (numeroSecreto == numeroUsuario){
        exibirTextoNatela('h1', 'Acertou!');
        exibirTextoNatela('p', menssagem);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if(numeroUsuario > numeroSecreto){
            exibirTextoNatela('p', 'Número secreto é menor.')
        } else {
            exibirTextoNatela('p', 'Número secreto é maior.')
        }
        tentativas++;
        limparInput();
    }
}

function limparInput(){
    let numeroUsuario = document.querySelector('input');
    numeroUsuario.value = '';

}

function resetarJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    limparInput();
    menssagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
    tentativas = 1;
}