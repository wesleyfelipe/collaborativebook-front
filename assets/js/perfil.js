/*
 * Author: Wesley Felipe da Silva
 */

var Perfil = function () {

    "use strict";

    var preencherInfoPerfil = function () {

        $.ajax({
            //TODO: Arrumar url para ser dinamico
            url: "http://localhost:8123/api/usuarios/556a794318bc6b9811000002",
            type: 'get',
            response: {
                format: 'json'
            },
            success: function (response) {
                $("span#username").text(response.nomeUsuario);
                $("span#nome").text(response.nomeCompleto);
                $("span#email").text(response.email);
                //TODO: arrumar parse do formato da data de nascimento
                var nascimento = response.nascimento;
                $("span#nascimento").text(nascimento);
                $("span#genero").text(response.genero);
                //TODO >>>>>>>>>>>>>>>
                var imgPerfil = localStorage.getItem("imagemPerfil");
                $("img#img-perfil").attr("src", imgPerfil);
            },
            error: function () {
                //TODO: >>>>>>>>>>>>>>>>>>>>>>>>
                alert("Deu ruim! :[");
            }
        });
    };

    //TODO: Solução temporária utilizando localStorage
    var editarPerfil = function () {
        $("button#editar-perfil").click(function () {
            //ocultando campos de apresentacao
            $("div#apresentacao-perfil").addClass("hidden");
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

    //TODO: Solução temporária utilizando localStorage
    var salvarAlteracoes = function () {
        localStorage.setItem("nomeCompleto", $("input:text[name=nome-completo]").val());
        localStorage.setItem("email", $("input[name=email]").val());
        localStorage.setItem("dataNascimento", $("input#nascimento").val());
        localStorage.setItem("genero", $("input:radio[name=genero]:checked").val());
    };

    var formatarData = function (data) {
        var dataArr = data.split("-")
        return dataArr[2] + '/' + dataArr[1] + '/' + dataArr[0];
    };

    var confirmarAlteracoes = function () {
        //validarAlterações();
        salvarAlteracoes();
        //populando campos de perfl
        preencherInfoPerfil();
        //exibindo infos do perfil
        $("form.perfil-form").addClass("hidden");
        //escondendo campos de edicao
        $("div#apresentacao-perfil").removeClass("hidden");
    };

    //TODO: Solução temporária utilizando localStorage
    var confirmarAlteracaoSenha = function () {
        //SOLUCAO TEMPORARIA
        localStorage.setItem("password", $("input:password[name=new_password]").val());
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
    }

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
        //TODO: Solução temporária utilizando localStorage
        jQuery.validator.addMethod("senhaValida", function () {
            return localStorage.getItem("password") === $("input:password[name=password]").val()
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

            preencherInfoPerfil();
            editarPerfil();
            alterarSenha();
            cancelarAlteracaoSenha();
            cancelarAlteracaoPerfil();

        }
    };

}();