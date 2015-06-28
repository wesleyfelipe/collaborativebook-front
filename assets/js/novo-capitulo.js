var NovoCapitulo = {};

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

$(function () {
    $("#form-capitulo").validate({
        errorClass: "has-error",
        validClass: "has-success",
        rules: {
            titulo: {
                required: true
            },
            texto: {
                required: true
            }
        },
        submitHandler: function () {

            if ($("form").valid()) {
                NovoCapitulo.salvar();
            }

        }

    });

});

NovoCapitulo.salvar = function () {

    var capitulo = {
        titulo : $("input#titulo").val(),
        texto : $("textarea#texto").val(),
        indice : 1
    };

    $.ajax({
        url: "http://colaborativebook.herokuapp.com/api/livro/" + $.urlParam("idLivro") + "/capitulo",
        type: 'post',
        dataType: 'json',
        beforeSend: function (xhr) {
            xhr.setRequestHeader('X-Access-Token', sessionStorage.getItem("token"));
        },
        data: capitulo,
        statusCode: {
            200: function (response) {
                window.location.href = "livro.html?idLivro=" + $.urlParam("idLivro");
            },
            400: function () {
                alert("Ainda existem erros no cadastro do novo capítulo.");
            },
            401: function () {
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

$(function () {
    $("button#cancelar").click(function () {
        window.location.href = "livro.html?idLivro=" + $.urlParam("idLivro");
    });
});

NovoCapitulo.init = function () {

    var nomeUsuario = $.parseJSON(sessionStorage.getItem("usuario")).nomeUsuario;
    $(".nomeusuario").append(nomeUsuario);
    $('select').select2();

};