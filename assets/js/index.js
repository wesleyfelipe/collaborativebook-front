var Index = {};
    
Index.init = function(){
    $(".nomeusuario").append(sessionStorage.getItem("nomeUsuario"));   
};