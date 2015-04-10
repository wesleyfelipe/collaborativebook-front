jQuery.extend(jQuery.validator.messages, {
    required: "Este campo é obrigatório.",
    remote: "Por favor, corrija este campo.",
    email: "Por favor, informe um endereço de e-mail válido.",
    url: "Por favor, informe uma URL válida.",
    date: "Por favor, informe uma data válida.",
    dateISO: "Por favor, informe uma data valida (ISO).",
    number: "Por favor, informe um número válido.",
    digits: "Por favor, informe apenas dígitos.",
    creditcard: "Por favor, informe um número valido de cartão de crédito.",
    equalTo: "Por favor, informe o mesmo valor novamente.",
    accept: "Por favor, informe um valor com a extensão válida.",
    maxlength: jQuery.validator.format("Por favor, não informe mais do que {0} caracteres."),
    minlength: jQuery.validator.format("Por favor, informe ao menos {0} caracteres."),
    rangelength: jQuery.validator.format("Por favor, informe um valor entre número de caracteres entre {0} e {1}"),
    range: jQuery.validator.format("Por favor, informe um valor entre {0} e {1}."),
    max: jQuery.validator.format("Por favor, informe um valor menor ou igual a {0}."),
    min: jQuery.validator.format("Por favor, informe um valor maior do que {0}.")
});