/*
 * Author: Wesley Felipe da Silva
 */

var MeusLivros = {};

MeusLivros.initCatalogo = function (livros) {
    for (var i in livros) {
        MeusLivros.exibeLivro(livros[i]);
    }
};

MeusLivros.excluirLivro = function(idLivro) {
    $.ajax({
        url: "http://colaborativebook.herokuapp.com/api/livro/" + idLivro,
        type: 'delete',
        beforeSend: function (xhr) {
            xhr.setRequestHeader('X-Access-Token', sessionStorage.getItem("token"));
        },
        response: {
            format: 'json'
        },
        statusCode: {
            200: function (response) {
                window.location.href = "meus-livros.html";
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

MeusLivros.exibeLivro = function (livro) {
    $('table#catalogo tr:last').after(
            "<tr><td class='align-center'><ul class='table-controls'><li><a href='livro.html?idLivro=" + livro._id + "'\n\
            class='bs-tooltip' title='Visualizar'><i class='icon-search'></i></a> \n\
            </li><li><a href='javascript:MeusLivros.excluirLivro(\"" + livro._id + "\");' class='bs-tooltip'\n\
            title='Deletar'><i class='icon-trash'></i></a> </li></ul></td><td>"
            + livro.titulo + "</td><td>" + livro.genero + "</td></tr>");
};

MeusLivros.recuperarLivros = function () {
    $.ajax({
        url: "http://colaborativebook.herokuapp.com/api/livro",
        type: 'get',
        beforeSend: function (xhr) {
            xhr.setRequestHeader('X-Access-Token', sessionStorage.getItem("token"));
        },
        response: {
            format: 'json'
        },
        statusCode: {
            200: function (response) {
               MeusLivros.initCatalogo(response);
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

MeusLivros.init = function () {
    var nomeUsuario = $.parseJSON(sessionStorage.getItem("usuario")).nomeUsuario;
    $(".nomeusuario").append(nomeUsuario);
    $('select').select2();

    MeusLivros.recuperarLivros();
};


