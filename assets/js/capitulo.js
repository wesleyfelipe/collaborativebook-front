/*
 * Author: Wesley Felipe da Silva
 */

var Capitulo = function () {

    "use strict";

    $.urlParam = function (sParam) {
        var sPageURL = window.location.search.substring(1);
        var sURLVariables = sPageURL.split('&');
        for (var i = 0; i < sURLVariables.length; i++) {
            var sParameterName = sURLVariables[i].split('=');
            if (sParameterName[0] === sParam) {
                return sParameterName[1];
            }
        }
    };

    var recuperarCapitulo = function () {
        $.ajax({
            url: "http://colaborativebook.herokuapp.com/api/capitulo/" + $.urlParam("idCapitulo"),
            type: 'get',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('X-Access-Token', sessionStorage.getItem("token"));
            },
            response: {
                format: 'json'
            },
            statusCode: {
                200: function (response) {
                    apresentarCapitulo(response);
                },
                401: function (response) {
                    window.location.href = "login.html";
                },
                404: function () {
                    alert("Ocorreu um erro na sua requisição. Estamos trabalhando nesta correção.");
                },
                500: function () {
                    alert("Ops! Algo errado aconteceu. Tente novamente daqui alguns instantes.");
                }
            }
        });
    };

    var apresentarCapitulo = function (capitulo) {
        $("#titulo-capitulo").text(capitulo.titulo);
        $("#texto-capitulo").text(capitulo.texto);
        $("#autor-capitulo").text(capitulo.autor.nomeCompleto);

    };
    
    var voltar = function(){
        $("button#voltar").click(function () {
            window.location.href = "livro.html?idLivro="+$.urlParam("idLivro");
        });
    };

    return {
        init: function () {
            $(".nomeusuario").append(localStorage.getItem("username"));
            $('select').select2();
            recuperarCapitulo();
            voltar();
        }
    };

}();