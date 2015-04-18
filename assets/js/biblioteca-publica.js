/*
 * Author: Wesley Felipe da Silva
 */

var Biblioteca = function () {

    "use strict";

    //variaveis
    
    //livro exemplo 1
   var livro1 = {proprietario: "Batman", titulo: "Java em 30 dias", genero: "Tecnologia", enredo: "Não há",
        personagens: "Não há", ambientação: "Não há", capitulos: null};
    
    //livro exemplo 2
    var livro2 = {proprietario: "Fernando Pessoa", titulo: "Poemas", genero: "Poesia", enredo: "Não há",
        personagens: "Não há", ambientação: "Não há", capitulos: null};
    
    //livro exemplo 3
    var livro3 = {proprietario: "Albert Einstein", titulo: "Relatividade", genero: "Ciência", enredo: "Não há",
        personagens: "Não há", ambientação: "Não há", capitulos: null};
    
    //livro exemplo 4
    var livro4 = {proprietario: "Edgar Allan Poe", titulo: "O corvo", genero: "Ficção", enredo: "Não há",
        personagens: "Não há", ambientação: "Não há", capitulos: null};
    
    //livro exemplo 4
    var livro4 = {proprietario: "Darth Vader", titulo: "I am your father", genero: "Drama", enredo: "Não há",
        personagens: "Não há", ambientação: "Não há", capitulos: null};

    //list de livros
    var livros = [livro1,livro2,livro3, livro4];
    
    //funções
    var initCatalogo = function () {
        for (var i = 0; i < livros.length; i++) {
            $('table#catalogo tr:last').after("<tr><td class='align-center'><ul class='table-controls'>\n\
                <li><a href='livro.html' class='bs-tooltip' title='Visualizar'><i class='icon-search'></i></a> </li>\n\
                </ul></td><td>" + livros[i].titulo + "</td><td>" + livros[i].genero + "</td><td>" + livros[i].proprietario + "</td></tr>");
        }
    };

    return {
        init: function () {
            $(".nomeusuario").append(localStorage.getItem("username"));
            $('select').select2();
            initCatalogo();
        }
    };

}();