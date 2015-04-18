/*
 * Author: Wesley Felipe da Silva
 */

var NovoLivro = function () {

    "use strict";
    
    var generos = ["Humor","Ficção","Romance","Poesia","Mistério","Terror","Drama","Ficção científica",
                    "Infantil","Juvenil","Fantasia","Aventura","Policial","Espiritualidade/Religião",
                    "História","Crônicas","Mitologia","Distopia","Tecnologia","Ciência"]
    
    //funções
    var listarGeneros = function () { 
        //capitulos
        for (var i = 0; i < generos.length; i++) {
            $('select#genero').append("<option>"+generos[i]+"</option>");
        }
    };

    return {
        init: function () {
            $(".nomeusuario").append(localStorage.getItem("username"));
            $('select').select2();
            
            listarGeneros();
        }
    };

}();