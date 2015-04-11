/*
 * Core script to handle all login specific things
 */

var Perfil = function () {

    "use strict";

    var preencherInfoPerfil = function () {
        $("span#username").text(localStorage.getItem("username"));
        $("span#nome").text(localStorage.getItem("nomeCompleto"));
        $("span#email").text(localStorage.getItem("email"));
        var data = localStorage.getItem("dataNascimento");
        $("span#nascimento").text(formatarData(data));
        $("span#genero").text(localStorage.getItem("genero"));
    };

    var editarPerfil = function () {
        $("button#editar-perfil").click(function () {

            //visibilidade botões
            $(this).addClass("hidden");
            $("button#salvar-alteracoes").removeClass("hidden");
            $("button#cancelar-alteracoes").removeClass("hidden");

            //ocultando campos de apresentacao
            $("span.info-editavel").addClass("hidden");

            //populando campos de input
            $("input#nome").attr("value", localStorage.getItem("nomeCompleto"));
            $("input#email").attr("value", localStorage.getItem("email"));
            
            
            $("input#nascimento").attr("value", localStorage.getItem("dataNascimento"));

            if (localStorage.getItem("genero") === "masculino") {
                $("input#masculino").prop("checked", true);
            } else {
                $("input#feminino").prop("checked", true);
            }

            //exibindo campos de input
            $(".form-edit").removeClass("hidden");

        });
    };

    var cancelarAlteracoes = function () {
        $("button#cancelar-alteracoes").click(function () {
            //visibilidade dos botoes
            $(this).addClass("hidden");
            $("button#salvar-alteracoes").addClass("hidden");
            $("button#editar-perfil").removeClass("hidden");

            //populando campos de perfl
            preencherInfoPerfil();
            //exibindo infos do perfil
            $(".form-edit").addClass("hidden");
            //escondendo campos de edicao
            $("span.info-editavel").removeClass("hidden");
        });
    };

    var salvarAlteracoes = function () {
        //ARMAZENANDO EM LOCALSTORAGE (POSTERIORMENTE SERÁ ALTERADO)
        localStorage.setItem("nomeCompleto", $("input:text[name=nome-completo]").val());
        localStorage.setItem("email", $("input[name=email]").val());

        localStorage.setItem("dataNascimento", $("input#nascimento").val());

        localStorage.setItem("genero", $("input:radio[name=genero]:checked").val());
    };

    var validarAlteracoes = function () {

    };

    var formatarData = function (data) {
        var dataArr = data.split("-")
        return dataArr[2] + '/' + dataArr[1] + '/' + dataArr[0];
    };

    var confirmarAlteracoes = function () {
        $("button#salvar-alteracoes").click(function () {
            //visibilidade dos botoes
            $(this).addClass("hidden");
            $("button#cancelar-alteracoes").addClass("hidden");
            $("button#editar-perfil").removeClass("hidden");

            validarAlteracoes();
            salvarAlteracoes();

            //populando campos de perfl
            preencherInfoPerfil();
            //exibindo infos do perfil
            $(".form-edit").addClass("hidden");
            //escondendo campos de edicao
            $("span.info-editavel").removeClass("hidden");
        });
    };

    return {
        // main function to initiate all plugins
        init: function () {
            preencherInfoPerfil();
            editarPerfil();
            confirmarAlteracoes();
            cancelarAlteracoes();
        }
    };

}();