/*
 * Programa encapsulat
 * Cada crida a una funció executarà tot el programa() i retornarà el pertinent a la funció cridada
 * Comença amb una petita funció autoexecutable d'inicialització
 * @author r0B
 * @returns funcions accessibles
 */

var programa = function () {
    const seleccio = document.getElementById("id_seleccio");
    const colors = document.getElementById("id_colors");
    const color_central = document.getElementById("id_color_central");
    const color_esq = document.getElementById("id_color_esq");
    const color_text = document.getElementById("id_color_text");
    const titol = document.getElementById("id_titol");

    function inicialitzacio() {
        seleccio.hidden = true;
        colors.hidden = true;
        titol.hidden = true;
        //TODO han de llegir el color actual
        color_central.value = "#3EA4ED";
        color_esq.value = "#348AC7";
        color_text.value = "#FFFFFF";
        //alert("autofuncio executada");
    };

    const API = encodeURI("https://servicios.ine.es/wstempus/js/ES/OPERACIONES_DISPONIBLES");
    const peticio = new XMLHttpRequest();
    peticio.open("GET", API, true);
    peticio.send(null);
    peticio.responseType = 'json';

    function processarResposta() {
        let resposta = peticio.response;
        let item, opcio, index = 0;

        amagarDesplegables();
        titol.innerHTML = "Datos públicos del Gobierno de España";

        seleccio.hidden = false;
        titol.hidden = false;

        //omple la llista desplegable
        // Comprova si la llista ja és plena abans
        if (!seleccio.hasChildNodes()) {
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
        }
    };

    function amagarDesplegables() {
        seleccio.hidden = true;
        colors.hidden = true;
        titol.hidden = true;
    };

    function triaColors() {
        amagarDesplegables();
        titol.innerHTML = "Configuración";
        titol.hidden = false;
        colors.hidden = false;
    };
    //funcions accessibles des de fora de l'encapsulament
    return {
        temes: function () {
            return peticio.onload = processarResposta;//espera a obtenir la resposta abans de cridar
        },
        configura: function () {
            return peticio.onload = triaColors();//espera a obtenir la resposta abans de cridar
        },
        inicia: function () {
            return inicialitzacio();
        },
        quarta: function () {
            return amagarDesplegables();
        }
    }
}

//Funció autoexecutable que es crida a sí mateixa.
var init_programa_r0B = (function () {
    programa().inicia();
})();