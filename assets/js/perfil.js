/*
 * Core script to handle all login specific things
 */

var Perfil = function () {

    "use strict";

    var preencherInfoPerfil = function(){
        $("span#username").text(localStorage.getItem("username"));      
        $("span#nome").text(localStorage.getItem("nomeCompleto"));
        $("span#email").text(localStorage.getItem("email"));
        $("span#nascimento").text(localStorage.getItem("dataNascimento"));
        $("span#genero").text(localStorage.getItem("genero"));
    };
    
    return {
        // main function to initiate all plugins
        init: function () {
            preencherInfoPerfil();
        }
    };

}();