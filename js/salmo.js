import salmos from "./script" 
 
 function butoes(){

    salmos.forEach((salmo) => {

        const itemLista = document.createElement("li")

        itemLista.innerHTML = `
            <a href="pages/salmo.html?id=${salmo.numero}" class="psalms-links">
                <span>${salmo.numero}</span>
            </a>
        `

        psalmList.appendChild(itemLista)

    })


}

export default butoes