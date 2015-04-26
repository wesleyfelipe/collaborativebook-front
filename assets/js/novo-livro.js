var NovoLivro = {};

$(function(){
    
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
        
        submitHandler: function() {
            
            if ($("form").valid()){  
                NovoLivro.salvar();
                window.location.href = "meus-livros.html";
            }
            
        }
        
    });
    
});

NovoLivro.salvar = function () {
    
    var livros = [];
  
    if (localStorage.getItem("livros") !== "") {    
        livros = $.makeArray($.parseJSON(localStorage.getItem("livros")));        
    }
    
    var id = livros.length;
    
    var novoLivro = { livro: { id: id++, 
        titulo: $("#titulo").val(),  
        genero: $("#genero option:selected").text(),
        enredo: $("#enredo").val(),
        personagens: $("#personagens").val(),
        ambientacao: $("#ambientacao").val() } };

    livros.push(novoLivro);
    
    localStorage.setItem("livros", JSON.stringify(livros));
    
};


NovoLivro.init = function () {
    
    $(".nomeusuario").append(localStorage.getItem("username"));
    $('select').select2();
    
};
    