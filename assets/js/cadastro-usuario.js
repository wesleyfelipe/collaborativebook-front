/*
 * Author: Wesley Felipe da Silva
 */

var Cadastro = function () {

    "use strict";

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
     * Validacao de cadastro
     * * * * * * * * * * * */
    var initCadastroValidation = function () {
        if ($.validator) {
            $('.cadastro-usuario-form').validate({
                rules: {
                    senha: {
                        minlength: 8
                    },
                    confirmacaoSenha: {
                        equalTo: $("#password")
                    },
                    nascimento: {
                        date: true
                    }
                },
                invalidHandler: function (event, validator) {
                    NProgress.start();
                    $('.cadastro-usuario-form .alert-danger').show();
                    NProgress.done();
                },
                submitHandler: function (form) {
                    $.ajax({
                        url: "http://colaborativebook.herokuapp.com/signin",
                        type: 'post',
                        dataType: 'json',
                        data: $("form").serialize(),
                        statusCode: {
                            200: function (response) {
                                login($('input#email').val(), $('input#password').val());
                            },
                            400: function () {
                                alert("Ainda existem erros no cadastro.");
                            },
                            404: function () {
                                alert("Ocorreu um erro na sua requisição. Estamos trabalhando nesta correção.");
                            },
                            409: function () {
                                alert("Nome de usuário ou email já cadastrados.");
                            },
                            500: function () {
                                alert("Ops! Algo errado aconteceu. Tente novamente daqui alguns instantes.");
                            }
                        }
                    });
                }
            });
        }
    };

    var login = function (email, senha) {
        var body = {
            password: senha,
            username: email
        };
        
        $.ajax({
            url: "http://colaborativebook.herokuapp.com/login",
            type: 'post',
            dataType: 'json',
            data: body,
            statusCode: {
                200: function (response) {
                    sessionStorage.setItem("usuario", JSON.stringify(response.user));
                    sessionStorage.setItem("token", response.token);
                    window.location.href = "index.html";
                },
                400: function () {
                    alert("Ocorreu um erro ao entrar. Estamos trabalhando nesta correção.");
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

    return {
        init: function () {
            initValidationDefaults();
            initCadastroValidation();
        }
    };
}();