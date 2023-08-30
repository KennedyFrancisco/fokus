const html = document.querySelector('html');
const focoBtn = document.querySelector('.app__card-button--foco');
const descansoBtn = document.querySelector('.app__card-button--curto');
const descansoLongoBtn = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const texto = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const alterarInputMusica = document.querySelector('#alternar-musica');
const startOuPause = document.querySelector('#start-pause');
const startOuPauseBtn = document.querySelector('#start-pause span');
const startOuPauseImg = document.querySelector('.app__card-primary-butto-icon');
const tempoNaTela = document.querySelector('#timer')

let tempoDecorridoEmSegundos = 1500;
let intervaloId = null;

const musica = new Audio('sons/luna-rise-part-one.mp3');
musica.loop = true;
const musicaPlay = new Audio('sons/play.wav');
const musicaPause = new Audio('sons/pause.mp3');
const musicaTempoEsgotado = new Audio('sons/beep.mp3');

alterarInputMusica.addEventListener('change', () => {
    if(musica.paused) {
        musica.play()
    } else {
        musica.pause()
    }
})

focoBtn.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500;
    alterarContexto('foco');
    focoBtn.classList.add('active');
});

descansoBtn.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300;
    alterarContexto('descanso-curto');
    descansoBtn.classList.add('active');
});

descansoLongoBtn.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900;
    alterarContexto('descanso-longo');
    descansoLongoBtn.classList.add('active');
});

function alterarContexto(contexto) {
    mostrarTempo();
    botoes.forEach((contexto) => {
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `imagens/${contexto}.png`);
    switch (contexto) {
        case 'foco':
            texto.innerHTML = `Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>`
            break;
        case 'descanso-curto':
            texto.innerHTML = `Que tal dar uma respirada? <strong class="app__title-strong">Faça uma pausa curta!</strong>`
            break;
        case 'descanso-longo':
            texto.innerHTML = `Hora de voltar à superfície.<strong class="app__title-strong"> Faça uma pausa longa.</strong>`
            break;
        default:
            break;
    }
}

const contagemRegressiva = () => {
    if (tempoDecorridoEmSegundos <= 0) {
        musicaTempoEsgotado.play();
        zerarContagem()
    }
    tempoDecorridoEmSegundos -= 1;
    mostrarTempo();
}

startOuPause.addEventListener('click', iniciarContagem);

function iniciarContagem() {
    
    if(intervaloId) {
        musicaPause.play();
        zerarContagem();  
        return
    }
    musicaPlay.play();
    intervaloId = setInterval(contagemRegressiva, 1000);
    startOuPauseBtn.textContent = "Pausa"
    startOuPauseImg.setAttribute('src', 'imagens/pause.png');
}

function zerarContagem() {
    startOuPauseBtn.textContent = "Começar"
    startOuPauseImg.setAttribute('src', 'imagens/play_arrow.png');
    clearInterval(intervaloId);
    intervaloId = null;
}

function mostrarTempo() {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000);
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'})
    tempoNaTela.innerHTML = `${tempoFormatado}`
}

mostrarTempo();