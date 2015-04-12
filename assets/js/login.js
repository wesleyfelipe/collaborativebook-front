/*
 * Core script to handle all login specific things
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
     * Validation for Login
     * * * * * * * * * * * */
    var initLoginValidation = function () {
        
        //SOLUCAO PROVISORIA DE AUTENTICACAO. SERVICO DE AUTENTICACAO FICARA A CARGO DO SERVER.
        jQuery.validator.addMethod("usernameValido",function(){
            return localStorage.getItem("username") === $("input:text[name=username]").val()
        });
        
        jQuery.validator.addMethod("senhaValida",function(){
            return localStorage.getItem("password") === $("input:password[name=password]").val()
        });
        
        
        if ($.validator) {
            $('.login-form').validate({
                //VALIDACAO DE USUARIO E SENHA QUE ESTAO EM LOCALSTORAGE (SERA ALTERADO POSTERIORMENTE)
                rules: {
                    username: {
                        usernameValido: true
                    },
                    password: {
                        senhaValida: true
                    }
                },
                invalidHandler: function (event, validator) { // display error alert on form submit
                    NProgress.start(); // Demo Purpose Only!
                    $('.login-form .alert-danger').show();
                    NProgress.done(); // Demo Purpose Only!
                },
                submitHandler: function (form) {
                    window.location.href = "index.html";
                }
            });
        }
    }

    return {
        // main function to initiate all plugins
        init: function () {
            // Validations
            initValidationDefaults(); // Extending jQuery Validation defaults
            initLoginValidation(); // Validation for Login (Sign In)
        },
    };

}();