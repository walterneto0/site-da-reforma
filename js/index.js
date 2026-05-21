import salmos from "./script.js" 
/* importante sempre definir o caminho correto*/



/* =========================
   LISTA DOS SALMOS

    o index.html tem que ter um elemento com id  
    "psalms-list" para mostrar a lista dos salmos

    ele vai usar o forEach para criar um item de lista para cada salmo, e colocar um link para o salmo.html passando o número do salmo na URL
========================= */

const psalmList = document.getElementById("psalms-list")

if (psalmList) {

    salmos.forEach((salmo) => {

        const item = document.createElement("li")

        item.innerHTML = `
            <a href="pages/salmo.html?id=${salmo.numero}" class="psalms-links">
                <span>${salmo.numero}</span>
            </a>
        `

        psalmList.appendChild(item)

    })

}



/* =========================
   ELEMENTOS DO SALMO

   o salmo.html tem que ter esses elementos para mostrar o titulo, texto e os botões de versoes (se tiver)
========================= */

const tituloSalmo = document.getElementById("titulo-salmo")

const textoSalmo = document.getElementById("texto-salmo")

const botaoVersoes =
    document.getElementById("botaoVersoes")




/* =========================
   PEGAR ID DA URL

   esta parte pega o numero do salmo que foi passado na URL, para poder encontrar o salmo correto e mostrar ele. Nao e muuito importante entender isso agora, mas e bom ter uma ideia do que esta acontecendo aqui. O URLSearchParams e uma API do JavaScript que facilita pegar os parâmetros da URL.
========================= */

const parametros =
    new URLSearchParams(window.location.search)

const idDoSalmo =
    Number(parametros.get("id"))



/* =========================
   ENCONTRAR SALMO

    o codigo usa o numero do salmo que pegamos da URL para encontrar o objeto do salmo correto no array de salmos. O find é um metodo de array que retorna o primeiro elemento que satisfaz a condição que a gente passar. Neste caso, a condição e que o numero do salmo seja igual ao id que pegamos da URL.
========================= */

const salmoEncontrado =
    salmos.find((salmo) => {

        return salmo.numero === idDoSalmo

    })



/* =========================
   MOSTRAR SALMO

   
========================= */

if (
    tituloSalmo &&
    textoSalmo &&
    salmoEncontrado
) {

    function atualizarTitulo(versao) {
        tituloSalmo.textContent =
            versao
                ? `${salmoEncontrado.titulo} - ${versao.slice(-1)}`
                : salmoEncontrado.titulo
    }

    atualizarTitulo()


    /* =========================
       SE TIVER VERSÕES
    ========================= */

    if (salmoEncontrado.textoVersoes) {

        function mostrarVersao(nomeDaVersao) {

            textoSalmo.textContent =
                salmoEncontrado
                .textoVersoes[nomeDaVersao]

            atualizarTitulo(nomeDaVersao)

        }



        function criarBotoes() {

            const versoes =
                Object.keys(
                    salmoEncontrado.textoVersoes
                )



            versoes.forEach((nomeDaVersao) => {

                const item =
                    document.createElement("li")

                const botao =
                    document.createElement("button")



                botao.textContent =
                    nomeDaVersao.slice(-1)



                botao.addEventListener("click", () => {

                    mostrarVersao(nomeDaVersao)

                })



                item.appendChild(botao)

                botaoVersoes.appendChild(item)

            })

        }



        const primeiraVersao =
            Object.keys(
                salmoEncontrado.textoVersoes
            )[0]



        mostrarVersao(primeiraVersao)

        criarBotoes()

    }



    /* =========================
       SE NÃO TIVER VERSÕES
    ========================= */

    else {

        textoSalmo.textContent =
            salmoEncontrado.texto

    }

}