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
    const sortida_std = document.getElementById("id_sortida_std");
    const boto_temes = document.getElementById("id_bt_temes");
    const boto_configura = document.getElementById("id_bt_configura");
    const boto_limpia = document.getElementById("id_bt_limpia");
    const boto_info = document.getElementById("id_bt_info");

    //AJAX
    const API = encodeURI("https://servicios.ine.es/wstempus/js/ES/OPERACIONES_DISPONIBLES");
    const peticio = new XMLHttpRequest();
    peticio.open("GET", API, true);
    peticio.send(null);
    peticio.responseType = 'json';

    //Disposa variables i elements en modo de inici
    function inicialitzacio() {
        seleccio.hidden = true;
        colors.hidden = true;
        titol.hidden = true;

        //TODO han de llegir el color actual
        color_central.value = "#3EA4ED";
        color_esq.value = "#348AC7";
        color_text.value = "#FFFFFF";

        //afegeix listeners
        boto_temes.addEventListener('click', obteDades);
        boto_configura.addEventListener('click', triaColors);
        boto_limpia.addEventListener('click', amagarDesplegables);
        boto_info.addEventListener('click', mostraInfo);
        seleccio.onchange = () => { alert('selecció capturada: ' + seleccio.value); };
        //alert("autofuncio executada");
    };

    function obteDades() {
        let resposta = peticio.response;
        let item, opcio, index = 0;
        sortida_std.innerHTML = "Obtenint dades...";

        //omple la llista desplegable
        if (!seleccio.hasChildNodes()) {// Comprova si la llista ja és plena
            //crea el primer element de la llista
            opcio = document.createElement('option');
            opcio.value = 0;
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
        amagarDesplegables();
        titol.innerHTML = "Datos públicos del Gobierno de España";
        seleccio.hidden = false;
        titol.hidden = false;
    };

    function mostraInfo(e) {
        let info = "Mòdul encapsulat. AJAX. JavaScript v 0.1";
        sortida_std.innerHTML = info;
        amagarDesplegables();
        sortida_std.hidden = false;
        console.log(e);
    }

    function amagarDesplegables() {
        seleccio.hidden = true;
        colors.hidden = true;
        titol.hidden = true;
        sortida_std.hidden = true;
    };

    function triaColors() {
        amagarDesplegables();
        titol.innerHTML = "Configuración";
        titol.hidden = false;
        colors.hidden = false;
    };
    //funcions accessibles des de fora de l'encapsulament
    return {
        inicia: () => { return inicialitzacio(); },
        unaltreFuncio: () => { return 0 }
    }
}

//Funció autoexecutable que es crida a sí mateixa.
//Inicia el programa
var init_programa_r0B = (function () {
    programa().inicia();
})();