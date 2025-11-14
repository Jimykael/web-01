// =============================
//   ESTADO DO JOGO
// =============================
const jogo = {
    vidas: 6,
    palavras: [],
    palavraAtual: "",
    exibicao: [],
    numPalavra: 0
};

// =============================
//   ELEMENTOS DA TELA
// =============================
const btnIniciar = document.getElementById("btn_iniciar");
const imagem = document.getElementById("img-menino");
const palavra = document.getElementById("palavra");
const boxTeclado = document.getElementById("box-teclado");

// desabilita o botão até carregar o JSON
btnIniciar.disabled = true;


// =============================
//   EVENTOS
// =============================
btnIniciar.addEventListener("click", novoJogo);

// fluxo inicial
iniciar().then(() => {
    btnIniciar.disabled = false; // só libera quando JSON carregar
});


// =============================
//   INICIALIZAÇÃO
// =============================
async function iniciar() {
    await carregarFase();
}


// =============================
//   INÍCIO DE UM NOVO JOGO
// =============================
function novoJogo() {
    jogo.vidas = 6;
    imagem.src = "assets/menino1.png";

    jogo.numPalavra = Math.floor(Math.random() * jogo.palavras.length);

    carregarPalavra(jogo.numPalavra);
}


// =============================
//   CARREGA UMA PALAVRA
// =============================
function carregarPalavra(index) {

    jogo.vidas = 6;                               // 🔰 reinicia as vidas
    imagem.src = "assets/menino1.png";            // 🔰 reinicia o boneco

    jogo.palavraAtual = jogo.palavras[index].toUpperCase();
    jogo.exibicao = Array(jogo.palavraAtual.length).fill("_");

    palavra.textContent = jogo.exibicao.join(" ");
    carregarTeclado();
}



// =============================
//   TECLADO VIRTUAL
// =============================
function carregarTeclado() {
    boxTeclado.innerHTML = "";
    const fragment = document.createDocumentFragment();
    const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    for (let letra of letras) {
        const botao = document.createElement("button");
        botao.textContent = letra;
        botao.classList.add("btn-letra");

        botao.addEventListener("click", () => verificarLetra(letra, botao));
        fragment.appendChild(botao);
    }

    boxTeclado.appendChild(fragment);
}


// =============================
//   VERIFICA LETRA ESCOLHIDA
// =============================
function verificarLetra(letra, botao) {
    botao.disabled = true;
    let acertou = false;

    [...jogo.palavraAtual].forEach((char, i) => {
        if (char === letra) {
            jogo.exibicao[i] = letra;
            acertou = true;
        }
    });

    palavra.textContent = jogo.exibicao.join(" ");

    // ERROU A LETRA
    if (!acertou) {
        jogo.vidas--;
        atualizarImagemErro();

        if (jogo.vidas === 0) {
            alert(`😢 Fim de jogo! A palavra era: ${jogo.palavraAtual}`);
            desativarTeclado();
            return;
        }
    }

    // ACERTOU TODAS AS LETRAS
    if (!jogo.exibicao.includes("_")) {
        alert(`🎉 Parabéns! Você acertou: ${jogo.palavraAtual}`);

        jogo.numPalavra++;

        // EVITA REPETIR A PRIMEIRA PALAVRA
        if (jogo.numPalavra >= jogo.palavras.length) {
            alert("🎉 Você zerou todas as palavras!");
            desativarTeclado();
            return;
        }

        carregarPalavra(jogo.numPalavra);
    }
}


// =============================
//   ATUALIZA IMAGEM DO BONECO
// =============================
function atualizarImagemErro() {
    const fase = 7 - jogo.vidas;
    imagem.src = `assets/menino${fase}.png`;
}


// =============================
//   DESATIVA TECLADO AO PERDER
// =============================
function desativarTeclado() {
    document
        .querySelectorAll("#box-teclado button")
        .forEach(btn => btn.disabled = true);
}


// =============================
//   CARREGA LISTA DE PALAVRAS
// =============================
async function carregarFase() {
    try {
        const response = await fetch("fases.json");

        if (!response.ok) {
            throw new Error("Erro ao carregar JSON");
        }

        const data = await response.json();

        // carrega palavras do arquivo
        jogo.palavras = data.frutas;

        console.log("Palavras carregadas:", jogo.palavras);

    } catch (error) {
        console.error("Erro ao carregar fases.json:", error);
        alert("Erro ao carregar palavras do jogo.");
    }
}