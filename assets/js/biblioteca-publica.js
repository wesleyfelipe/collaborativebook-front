/*
 * Core script to handle all login specific things
 */

var Biblioteca = function () {

    "use strict";

    //variaveis
    var cap1Livro1 = {título: "Prólogo", texto: "1...2...3...", autor: "Fernando Pessoa"};
    var cap2Livro1 = {título: "Fim", texto: "3...2...1...", autor: "Paulo Coelho"};
    var capitulosLivro1 = [cap1Livro1, cap2Livro1];
    var livro1 = {proprietario: "Batman", titulo: "Sem criatividade", genero: "Crônica", enredo: "Não há",
        personagens: "Não há", ambientação: "Não há", capitulos: capitulosLivro1};
    
    
    var cap1Livro2 = {título: "Leis Fundamentais da robótica", texto: "1ª Lei: Um robô não pode ferir um ser humano ou, por inação, permitir que um ser humano sofra algum mal.\n"+
                "2ª Lei: Um robô deve obedecer as ordens que lhe sejam dadas por seres humanos exceto nos casos em que tais ordens entrem em conflito com a Primeira Lei.\n"+
                "3ª Lei: Um robô deve proteger sua própria existência desde que tal proteção não entre em conflito com a Primeira ou Segunda Leis.", autor: "Einstein"};
    var cap2Livro2 = {título: "Conclusão", texto: "Fim", autor: "Um robô"};
    var capitulosLivro2 = [cap1Livro2, cap2Livro2];
    var livro2 = {proprietario: "Isaac Asimov", titulo: "Eu, robô", genero: "Ficção científica", enredo: "Não há",
        personagens: "Não há", ambientação: "Não há", capitulos: capitulosLivro2};

    var livros = [livro1,livro2];
    
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