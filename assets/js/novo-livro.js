var NovoLivro = {};

$(function () {

    $("#form-livro").validate({
        errorClass: "has-error",
        validClass: "has-success",
        rules: {
            titulo: {
                required: true
            },
            genero: {
                required: true
            },
            enredo: {
                required: true
            },
            personagens: {
                required: true
            },
            ambientacao: {
                required: true
            }
        },
        submitHandler: function () {

            if ($("form").valid()) {
                NovoLivro.salvar();
            }

        }

    });

});

NovoLivro.salvar = function () {

    $.ajax({
        url: "http://colaborativebook.herokuapp.com/api/livro",
        type: 'post',
        dataType: 'json',
        beforeSend: function(xhr){
                xhr.setRequestHeader('X-Access-Token', sessionStorage.getItem("token"));
        },
        data: $("form").serialize(),
        statusCode: {
            200: function (response) {
                window.location.href = "meus-livros.html";
            },
            400: function () {
                alert("Ainda existem erros no cadastro do novo livro.");
            },
            401: function (){
                window.location.href = "login.html";
                NovoLivro.salvar();
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


NovoLivro.init = function () {

    var nomeUsuario = $.parseJSON(sessionStorage.getItem("usuario")).nomeUsuario;
    $(".nomeusuario").append(nomeUsuario);  
    $('select').select2();

};
    