var Index = {};
    
Index.init = function(){
    var nomeUsuario = $.parseJSON(sessionStorage.getItem("usuario")).nomeUsuario;
    $(".nomeusuario").append(nomeUsuario);   
};