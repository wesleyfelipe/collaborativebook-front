/*
 * Author: Wesley Felipe da Slva
 */

var Login = function () {

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
     * Vaidação de Login
     * * * * * * * * * * * */
    var initLoginValidation = function () {
        if ($.validator) {
            $('.login-form').validate({
                invalidHandler: function (event, validator) {
                    NProgress.start();
                    $('.login-form .alert-danger').show();
                    NProgress.done();
                },
                submitHandler: function (form) {
                    $.ajax({
                        url: "http://colaborativebook.herokuapp.com/login",
                        type: 'post',
                        dataType: 'json',
                        data: $("form").serialize(),
                        statusCode: {
                            200: function (response) {
                                sessionStorage.setItem("usuario", JSON.stringify(response.user));
                                sessionStorage.setItem("token", response.token);
                                window.location.href = "index.html";
                            },
                            400: function () {
                                alert("Ainda existem erros no login.");
                            },
                            401: function () {
                                alert("Credenciais inválidas.");
                            },
                            404: function () {
                                alert("Ocorreu um erro na sua requisição. Estamos trabalhando nesta correção.");
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

    return {
        init: function () {
            // Validações
            initValidationDefaults();
            initLoginValidation();
        }
    };

}();