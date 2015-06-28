/*
 * Author: Wesley Felipe da Silva
 */

var Livro = function () {

    "use strict";

    //variaveis

    //livro exemplo 1
    var cap1Livro1 = {titulo: "Prólogo", texto: "1...2...3...", autor: "Fernando Pessoa"};
    var cap2Livro1 = {titulo: "Fim", texto: "3...2...1...", autor: "Paulo Coelho"};
    var capitulosLivro = [cap1Livro1, cap2Livro1];

    var capAp1 = {titulo: "Epílogo", texto: "1...2...3...", autor: "Buda"};
    var capAp2 = {titulo: "Epílogo", texto: "1...2...3...", autor: "Machado de Assis"};
    var capitulosAprovacaoLivro = [capAp1, capAp2];

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

    //funções
    var apresentarCapitulos = function (capitulos) {
        for (var i in capitulos) {
            if(capitulos[i].aprovado)
                exibirCapitulo(capitulos[i]);
            else
                exibirCapituloNaoAprovado(capitulos[i]);
        }
    };

    var exibirCapituloAprovado = function (capitulo) {
        $('table#capitulos tr:last').after("<tr><td class='align-center'><ul class='table-controls'>\n\
        <li><a href='capitulo.html' class='bs-tooltip' title='Visualizar'><i class='icon-search'></i></a> </li>\n\
        <li><a href='javascript:void(0);' class='bs-tooltip' title='Deletar'><i class='icon-trash'></i></a> </li>\n\
        </ul></td><td>" + capitulo.titulo + "</td><td>" + capitulo.autor + "</td></tr>");
    };
    
    var exibirCapituloNaoAprovado = function(capitulo){
        $('table#capitulos-para-aprovacao tr:last').after("<tr><td class='align-center'><ul class='table-controls'>\n\
               <li><a href='capitulo.html' class='bs-tooltip' title='Visualizar'><i class='icon-search'></i></a> </li>\n\
               <li><a href='javascript:void(0);' class='bs-tooltip' title='Deletar'><i class='icon-trash'></i></a> </li>\n\
               <li><a href='javascript:void(0);' class='bs-tooltip' title='Aprovar'><i class='icon-check'></i></a> </li>\n\
               </ul></td><td>" + capitulo.titulo + "</td><td>" + capitulo.autor + "</td></tr>");
    };

    var apresentarLivro = function (livro) {

        $("#titulo").text(livro.titulo);
        $("#proprietario").text(livro.proprietario);
        $("#genero").text(livro.genero);
        $("#enredo").text(livro.enredo);
        $("#personagens").text(livro.personagens);
        $("#ambientacao").text(livro.ambientação);
    };

    var recuperarCapitulos = function () {
        $.ajax({
            url: "http://colaborativebook.herokuapp.com/api/livro/" + $.urlParam("idLivro") + "/capitulo",
            type: 'get',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('X-Access-Token', sessionStorage.getItem("token"));
            },
            response: {
                format: 'json'
            },
            statusCode: {
                200: function (response) {
                    apresentarCapitulos(response);
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

    var recuperarLivro = function () {
        $.ajax({
            url: "http://colaborativebook.herokuapp.com/api/livro/" + $.urlParam("idLivro"),
            type: 'get',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('X-Access-Token', sessionStorage.getItem("token"));
            },
            response: {
                format: 'json'
            },
            statusCode: {
                200: function (response) {
                    apresentarLivro(response);
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

    return {
        init: function () {
            var nomeUsuario = $.parseJSON(sessionStorage.getItem("usuario")).nomeUsuario;
            $(".nomeusuario").append(nomeUsuario);
            $('select').select2();

            recuperarLivro();
            recuperarCapitulos();
        }
    };

}();