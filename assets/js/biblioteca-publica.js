/*
 * Author: Wesley Felipe da Silva
 */

var Biblioteca = function () {

    "use strict";

    //funções
    var recuperarLivros = function(){
        $.ajax({
            url: "http://colaborativebook.herokuapp.com/api/biblioteca",
            type: 'get',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('X-Access-Token', sessionStorage.getItem("token"));
            },
            response: {
                format: 'json'
            },
            statusCode: {
                200: function (response) {
                    initCatalogo(response);
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
    
    var initCatalogo = function (livros) {
        for (var i in livros) {
            exibeLivro(livros[i]);
        }
    };
    
    var exibeLivro = function(livro){
        $('table#catalogo tr:last').after("<tr><td class='align-center'><ul class='table-controls'>\n\
        <li><a href='livro.html' class='bs-tooltip' title='Visualizar'><i class='icon-search'></i></a> </li>\n\
        </ul></td><td>" + livro.titulo + "</td><td>" + livro.genero + "</td><td>" + livro.proprietario + "</td></tr>");
    };
    
    return {
        init: function () {
            var nomeUsuario = $.parseJSON(sessionStorage.getItem("usuario")).nomeUsuario;
            $(".nomeusuario").append(nomeUsuario);
            $('select').select2();
            
            recuperarLivros();
        }
    };

}();