/*
 * Author: Wesley Felipe da Silva
 */

var Perfil = function () {

    "use strict";

    var preencherInfoPerfil = function () {
        var usuario = $.parseJSON(sessionStorage.getItem("usuario"));
        $("span#nome").text(usuario.nomeCompleto);
        $("span#username").text(usuario.nomeUsuario);
        $("span#email").text(usuario.email);
        var nascimento = new Date(usuario.nascimento);
        $("span#nascimento").text(formatarData(nascimento));
        $("span#genero").text(usuario.genero);
        $("img#img-perfil").attr("src", usuario.imagemPerfil);
    };

    var recuperarInfoUsuario = function () {
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

    var editarPerfil = function () {
        $("button#editar-perfil").click(function () {
            var usuario = $.parseJSON(sessionStorage.getItem("usuario"));
            //ocultando campos de apresentacao
            $("div#apresentacao-perfil").addClass("hidden");
            //populando campos de input
            $("input#nome").attr("value", usuario.nomeCompleto);
            $("input#email").attr("value", usuario.email);
            $("input#nascimento").attr("value", usuario.nascimento);
            if (usuario.genero === "masculino") {
                $("input#masculino").prop("checked", true);
            } else {
                $("input#feminino").prop("checked", true);
            }
            //exibindo campos de input
            $("form.perfil-form").removeClass("hidden");
        });
    };

    var alterarSenha = function () {
        $("button#alterar-senha").click(function () {
            //ocultando campos de apresentacao
            $("div#apresentacao-perfil").addClass("hidden");
            $("form.alterar-senha-form").removeClass("hidden");
        });
    };

    var cancelarAlteracaoSenha = function () {
        $("button#cancelar-alteracao-senha").click(function () {
            //ocultando campos de apresentacao
            $("form.alterar-senha-form").addClass("hidden");
            $("div#apresentacao-perfil").removeClass("hidden");
        });
    };

    var cancelarAlteracaoPerfil = function () {
        $("button#cancelar-alteracao-perfil").click(function () {
            //ocultando campos de apresentacao
            $("form.perfil-form").addClass("hidden");
            $("div#apresentacao-perfil").removeClass("hidden");
        });
    };

    var salvarAlteracoes = function () {

        var usuario = $.parseJSON(sessionStorage.getItem("usuario"));

        var dados = {
            nomeCompleto: $("input:text[name=nome-completo]").val(),
            email: $("input[name=email]").val(),
            nascimento: $("input#nascimento").val(),
            genero: $("input:radio[name=genero]:checked").val(),
            imagemPerfil: usuario.imagemPerfil
        };

        $.ajax({
            url: "http://colaborativebook.herokuapp.com/api/update",
            type: 'put',
            dataType: 'json',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('X-Access-Token', sessionStorage.getItem("token"));
            },
            data: dados,
            statusCode: {
                200: function (response) {
                    sessionStorage.setItem("usuario", JSON.stringify(response));
                },
                400: function () {
                    alert("Ainda existem erros nas suas alterações.");
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

    var formatarData = function (data) {
        var dataFormatada = (data.getDate() + 1) + '/' + (data.getMonth() + 1) + '/' + data.getFullYear();
        return dataFormatada;
    };

    var confirmarAlteracoes = function () {
        salvarAlteracoes();
        preencherInfoPerfil();
        //exibindo infos do perfil
        $("form.perfil-form").addClass("hidden");
        //escondendo campos de edicao
        $("div#apresentacao-perfil").removeClass("hidden");
    };

    var confirmarAlteracaoSenha = function () {
        salvarAlteracoes();
        //exibindo infos do perfil
        $("form.alterar-senha-form").addClass("hidden");
        //escondendo campos de edicao
        $("div#apresentacao-perfil").removeClass("hidden");
    };

    /* * * * * * * * * * * *
     * Validation Defaults
     * * * * * * * * * * * */
    var initValidationDefaults = function () {
        if ($.validator) {
            // Set default options
            $.extend($.validator.defaults, {
                errorClass: "has-error",
                validClass: "has-success",
                highlight: function (element, errorClass, validClass) {
                    if (element.type === 'radio') {
                        this.findByName(element.name).addClass(errorClass).removeClass(validClass);
                    } else {
                        $(element).addClass(errorClass).removeClass(validClass);
                    }
                    $(element).closest(".form-group").addClass(errorClass).removeClass(validClass);
                },
                unhighlight: function (element, errorClass, validClass) {
                    if (element.type === 'radio') {
                        this.findByName(element.name).removeClass(errorClass).addClass(validClass);
                    } else {
                        $(element).removeClass(errorClass).addClass(validClass);
                    }
                    $(element).closest(".form-group").removeClass(errorClass).addClass(validClass);

                    // Fix for not removing label in BS3
                    $(element).closest('.form-group').find('label[generated="true"]').html('');
                }
            });

            var _base_resetForm = $.validator.prototype.resetForm;
            $.extend($.validator.prototype, {
                resetForm: function () {
                    _base_resetForm.call(this);
                    this.elements().closest('.form-group')
                            .removeClass(this.settings.errorClass + ' ' + this.settings.validClass);
                },
                showLabel: function (element, message) {
                    var label = this.errorsFor(element);
                    if (label.length) {
                        // refresh error/success class
                        label.removeClass(this.settings.validClass).addClass(this.settings.errorClass);

                        // check if we have a generated label, replace the message then
                        if (label.attr("generated")) {
                            label.html(message);
                        }
                    } else {
                        // create label
                        label = $("<" + this.settings.errorElement + "/>")
                                .attr({"for": this.idOrName(element), generated: true})
                                .addClass(this.settings.errorClass)
                                .addClass('help-block')
                                .html(message || "");
                        if (this.settings.wrapper) {
                            // make sure the element is visible, even in IE
                            // actually showing the wrapped element is handled elsewhere
                            label = label.hide().show().wrap("<" + this.settings.wrapper + "/>").parent();
                        }
                        if (!this.labelContainer.append(label).length) {
                            if (this.settings.errorPlacement) {
                                this.settings.errorPlacement(label, $(element));
                            } else {
                                label.insertAfter(element);
                            }
                        }
                    }
                    if (!message && this.settings.success) {
                        label.text("");
                        if (typeof this.settings.success === "string") {
                            label.addClass(this.settings.success);
                        } else {
                            this.settings.success(label, element);
                        }
                    }
                    this.toShow = this.toShow.add(label);
                }
            });
        }
    };

    /* * * * * * * * * * * *
     * Validacao de alteracao de perfil
     * * * * * * * * * * * */
    var initPerfilValidation = function () {
        if ($.validator) {
            $('.perfil-form').validate({
                rules: {
                    data_nascimento: {
                        date: true
                    }
                },
                invalidHandler: function (event, validator) { // display error alert on form submit
                    NProgress.start(); // Demo Purpose Only!
                    $('.perfil-form .alert-danger').show();
                    NProgress.done(); // Demo Purpose Only!
                },
                submitHandler: function (form) {
                    confirmarAlteracoes();
                    $('.perfil-form .alert-danger').hide();
                }
            });
        }
    };

    /* * * * * * * * * * * *
     * Validacao de alteracao de senha
     * * * * * * * * * * * */
    var initAlteracaoSenhaValidation = function () {
        //TODO: Solução temporária utilizando sessionStorage
        jQuery.validator.addMethod("senhaValida", function () {
            return sessionStorage.getItem("password") === $("input:password[name=password]").val();
        }, "Senha inválida.");

        if ($.validator) {
            $('.alterar-senha-form').validate({
                rules: {
                    password: {
                        senhaValida: true
                    },
                    new_password: {
                        minlength: 8
                    },
                    password_confirmation: {
                        equalTo: $("#new_password")
                    }
                },
                invalidHandler: function (event, validator) { // display error alert on form submit
                    NProgress.start(); // Demo Purpose Only!
                    $('.alterar-senha-form .alert-danger').show();
                    NProgress.done(); // Demo Purpose Only!
                },
                submitHandler: function (form) {
                    confirmarAlteracaoSenha();
                    $('.alterar-senha-form .alert-danger').hide();
                }
            });
        }
    };

    return {
        init: function () {

            initValidationDefaults();
            initPerfilValidation();
            initAlteracaoSenhaValidation();

            recuperarInfoUsuario();
            preencherInfoPerfil();

            editarPerfil();
            alterarSenha();
            cancelarAlteracaoSenha();
            cancelarAlteracaoPerfil();
        }
    };

}();