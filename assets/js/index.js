var Index = {};

var verificarToken = function () {
    $.ajax({
        url: "http://colaborativebook.herokuapp.com/api/user",
        type: 'get',
        beforeSend: function (xhr) {
            xhr.setRequestHeader('X-Access-Token', sessionStorage.getItem("token"));
        },
        response: {
            format: 'json'
        },
        statusCode: {
            200: function (response) {
                sessionStorage.setItem("usuario", JSON.stringify(response));
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

Index.init = function () {

    verificarToken();

    var nomeUsuario = $.parseJSON(sessionStorage.getItem("usuario")).nomeUsuario;
    $(".nomeusuario").append(nomeUsuario);
};