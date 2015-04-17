/*
 * Author: Wesley Felipe da Silva
 */

var Capitulo = function () {

    "use strict";

    //variaveis
    
    //capitulo de exemplo
    var cap = {titulo: "Leis Fundamentais da robótica", texto: "1ª Lei: Um robô não pode ferir um ser humano ou, por inação, permitir que um ser humano sofra algum mal.\n"+
                "2ª Lei: Um robô deve obedecer as ordens que lhe sejam dadas por seres humanos exceto nos casos em que tais ordens entrem em conflito com a Primeira Lei.\n"+
                "3ª Lei: Um robô deve proteger sua própria existência desde que tal proteção não entre em conflito com a Primeira ou Segunda Leis.", autor: "Isaac Asimov"};
    
    //funções
    
    //TODO: Solução provisória usando lista estática
    var apresentarCapitulo = function () {
        
        $("#titulo-capitulo").text(cap.titulo);
        $("#texto-capitulo").text(cap.texto);
        $("#autor-capitulo").text(cap.autor);       
        
    };

    return {
        init: function () {
            $(".nomeusuario").append(localStorage.getItem("username"));
            $('select').select2();
            apresentarCapitulo();
        }
    };

}();