/*
 * Author: Wesley Felipe da Silva
 */

var Livro = {};

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

Livro.apresentarCapitulos = function (capitulos) {
    for (var i in capitulos) {
        if (capitulos[i].aprovado)
            Livro.exibirCapituloAprovado(capitulos[i]);
        else
            Livro.exibirCapituloNaoAprovado(capitulos[i]);
    }
};

Livro.exibirCapituloAprovado = function (capitulo) {
    $('table#capitulos tr:last').after("<tr><td class='align-center'><ul class='table-controls'>\n\
        <li><a href='capitulo.html?idLivro=" + $.urlParam("idLivro") + "&idCapitulo=" + capitulo._id + "' class='bs-tooltip' title='Visualizar'><i class='icon-search'></i></a> </li>\n\
        <li><a href='javascript:Livro.excluirCapitulo(\"" + $.urlParam("idLivro") + "\",\"" + capitulo._id +"\");' class='bs-tooltip' title='Deletar'><i class='icon-trash'></i></a> </li>\n\
        </ul></td><td>" + capitulo.titulo + "</td><td>" + capitulo.autor + "</td></tr>");
};

Livro.exibirCapituloNaoAprovado = function (capitulo) {
    $('table#capitulos-para-aprovacao tr:last').after("<tr><td class='align-center'><ul class='table-controls'>\n\
        <li><a href='capitulo.html?idLivro=" + $.urlParam("idLivro") + "&idCapitulo=" + capitulo._id + "' class='bs-tooltip' title='Visualizar'><i class='icon-search'></i></a> </li>\n\
        <li><a href='javascript:Livro.excluirCapitulo(\"" + $.urlParam("idLivro") + "\",\"" + capitulo._id +"\");' class='bs-tooltip' title='Deletar'><i class='icon-trash'></i></a> </li>\n\
        <li><a href='javascript:Livro.aprovarCapitulo(\"" + $.urlParam("idLivro") + "\",\"" + capitulo._id +"\");' class='bs-tooltip' title='Aprovar'><i class='icon-check'></i></a> </li>\n\
        </ul></td><td>" + capitulo.titulo + "</td><td>" + capitulo.autor + "</td></tr>");
};

Livro.apresentarLivro = function (livro) {
    $("#titulo").text(livro.titulo);
    $("#proprietario").text(livro.proprietario);
    $("#genero").text(livro.genero);
    $("#enredo").text(livro.enredo);
    $("#personagens").text(livro.personagens);
    $("#ambientacao").text(livro.ambientação);
};

Livro.recuperarCapitulos = function () {
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
                Livro.apresentarCapitulos(response);
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

Livro.recuperarLivro = function () {
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
                Livro.apresentarLivro(response);
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

Livro.excluirCapitulo = function(idLivro, idCapitulo){
    $.ajax({
        url: "http://colaborativebook.herokuapp.com/api/livro/" + idLivro + "/capitulo/" + idCapitulo,
        type: 'delete',
        beforeSend: function (xhr) {
            xhr.setRequestHeader('X-Access-Token', sessionStorage.getItem("token"));
        },
        response: {
            format: 'json'
        },
        statusCode: {
            200: function (response) {
                window.location.href = "livro.html?idLivro=" + idLivro;
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

Livro.aprovarCapitulo = function(idLivro, idCapitulo){
    $.ajax({
        url: "http://colaborativebook.herokuapp.com/api/livro/" + idLivro + "/capitulo/" + idCapitulo,
        type: 'post',
        beforeSend: function (xhr) {
            xhr.setRequestHeader('X-Access-Token', sessionStorage.getItem("token"));
        },
        response: {
            format: 'json'
        },
        statusCode: {
            200: function (response) {
                window.location.href = "livro.html?idLivro=" + idLivro;
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

Livro.escreverCapitulo = function () {
    $("button#criar-capitulo").click(function () {
        window.location.href = "novo-capitulo.html?idLivro=" + $.urlParam("idLivro");
    });
};

Livro.init = function () {
    var nomeUsuario = $.parseJSON(sessionStorage.getItem("usuario")).nomeUsuario;
    $(".nomeusuario").append(nomeUsuario);
    $('select').select2();
    
    Livro.escreverCapitulo();
};
