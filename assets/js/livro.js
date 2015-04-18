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
    var capitulosAprovacaoLivro = [capAp1,capAp2];
    
    var livro = {proprietario: "Batman", titulo: "Sem criatividade", genero: "Crônica", enredo: "Não há",
        personagens: "Não há", ambientação: "Não há", capitulos: capitulosLivro, capitulosAprovacao: capitulosAprovacaoLivro};
    
    //funções
    var apresentarLivro = function () {
        
        $("#titulo").text(livro.titulo);
        $("#proprietario").text(livro.proprietario);
        $("#genero").text(livro.genero);
        $("#enredo").text(livro.enredo);
        $("#personagens").text(livro.personagens);
        $("#ambientacao").text(livro.ambientação);
        
        //capitulos
        for (var i = 0; i < livro.capitulos.length; i++) {
            $('table#capitulos tr:last').after("<tr><td class='align-center'><ul class='table-controls'>\n\
                <li><a href='capitulo.html' class='bs-tooltip' title='Visualizar'><i class='icon-search'></i></a> </li>\n\
                <li><a href='javascript:void(0);' class='bs-tooltip' title='Deletar'><i class='icon-trash'></i></a> </li>\n\
                </ul></td><td>" + livro.capitulos[i].titulo + "</td><td>" + livro.capitulos[i].autor + "</td></tr>");
        }
        
        //capitulos para aprovacao
        for (var i = 0; i < livro.capitulosAprovacao.length; i++) {
            $('table#capitulos-para-aprovacao tr:last').after("<tr><td class='align-center'><ul class='table-controls'>\n\
                <li><a href='capitulo.html' class='bs-tooltip' title='Visualizar'><i class='icon-search'></i></a> </li>\n\
                <li><a href='javascript:void(0);' class='bs-tooltip' title='Deletar'><i class='icon-trash'></i></a> </li>\n\
                <li><a href='javascript:void(0);' class='bs-tooltip' title='Aprovar'><i class='icon-check'></i></a> </li>\n\
                </ul></td><td>" + livro.capitulosAprovacao[i].titulo + "</td><td>" + livro.capitulosAprovacao[i].autor + "</td></tr>");
        }
    };

    return {
        init: function () {
            $(".nomeusuario").append(localStorage.getItem("username"));
            $('select').select2();
            apresentarLivro();
        }
    };

}();