
const imatge = document.getElementById("foto");
const text = document.getElementById("sortida");
const seleccio = document.getElementById("seleccio");


//Funció que es crida a sí mateixa.
// es pot fer servir per encapsular tot l'script
let init = (function () {
    seleccio.hidden = true;
})();





//Peticions encapsulades
let peticio01 = function () {
    const API = encodeURI(" http://api.geonames.org/");
    const temps = "weatherJSON?";
    const user = "jsprovageo";
    const pass = "jslaltra";
    const idioma = "lang=es";
    const peticio = new XMLHttpRequest();
    const url = "http://api.geonames.org/findNearbyJSON?lat=41.3&lng=2.17&username=jsprovageo&lang=es";

    peticio.open("GET", url, true);
    peticio.send(null);
    peticio.responseType = 'json';
    peticio.onload = processarResposta;

    function processarResposta() {
        let resposta = peticio.response;
        console.log("resposta01 " + resposta);
        let nom = resposta.geonames[0].name;
        sortida.innerHTML = nom;
        imatge.src = null;
    }
}

let tematica = function () {
    const API = encodeURI("https://servicios.ine.es/wstempus/js/ES/OPERACIONES_DISPONIBLES");
    const peticio = new XMLHttpRequest();
    peticio.open("GET", API, true);
    peticio.send(null);
    peticio.responseType = 'json';
    peticio.onload = processarResposta;//espera a obtenir la resposta abans de desar-la


    function processarResposta() {
        let resposta = peticio.response;
        let item;
        let opcio;
        let index = 0;

        if (!seleccio.hasChildNodes()) {
            //omple la llista desplegable
            // Comprova si la llista ja és plena abans

            //crea el primer element de la llista
            opcio = document.createElement('option');
            opcio.value = 1;
            opcio.innerHTML = "   SELECCIONE UN TEMA";
            seleccio.appendChild(opcio);

            //resta d'elements de la resposta
            for (item of resposta) {
                index++;
                opcio = document.createElement('option');
                opcio.value = index;
                opcio.innerHTML = item.Nombre;
                seleccio.appendChild(opcio);
            };
            seleccio.hidden = false;
        }

    }

}