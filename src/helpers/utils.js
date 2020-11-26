require('dotenv').config();

const bcrypt = require('bcryptjs');
const merge = require('merge');
const jwt = require("jsonwebtoken");
const { ErrorHandler } = require('./customErrors');
const privateKey = process.env.JWT_SECRET;

exports.generateAccessToken = (username) => {
    return jwt.sign({ username }, privateKey, {
        expiresIn: '900s'
    });
}
exports.isValidCPF = (cpf) => {
    if (typeof cpf !== "string") return false
    cpf = cpf.replace(/[\s.-]*/igm, '')
    if (
        !cpf ||
        cpf.length != 11 ||
        cpf == "00000000000" ||
        cpf == "11111111111" ||
        cpf == "22222222222" ||
        cpf == "33333333333" ||
        cpf == "44444444444" ||
        cpf == "55555555555" ||
        cpf == "66666666666" ||
        cpf == "77777777777" ||
        cpf == "88888888888" ||
        cpf == "99999999999"
    ) {
        return false
    }
    var soma = 0
    var resto
    for (var i = 1; i <= 9; i++)
        soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i)
    resto = (soma * 10) % 11
    if ((resto == 10) || (resto == 11)) resto = 0
    if (resto != parseInt(cpf.substring(9, 10))) return false
    soma = 0
    for (var i = 1; i <= 10; i++)
        soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i)
    resto = (soma * 10) % 11
    if ((resto == 10) || (resto == 11)) resto = 0
    if (resto != parseInt(cpf.substring(10, 11))) return false
    return true
}
exports.isValidCNPJ = (cnpj) => {
    if (typeof cnpj !== "string") return false
    cnpj = cnpj.replace(/[\s./-]*/igm, '')
    if (
        !cnpj ||
        cnpj.length != 14 ||
        cnpj == "00000000000000" ||
        cnpj == "11111111111111" ||
        cnpj == "22222222222222" ||
        cnpj == "33333333333333" ||
        cnpj == "44444444444444" ||
        cnpj == "55555555555555" ||
        cnpj == "66666666666666" ||
        cnpj == "77777777777777" ||
        cnpj == "88888888888888" ||
        cnpj == "99999999999999"
    ) {
        return false
    }
    var tamanho = cnpj.length - 2
    var numeros = cnpj.substring(0, tamanho);
    var digitos = cnpj.substring(tamanho);
    var soma = 0;
    var pos = tamanho - 7;
    var resultado;

    for (var i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(0))
        return false;

    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(1))
        return false;

    return true;
}
exports.passwordHash = (password, salt) => {
    const saltRounds = salt;
    const hash = bcrypt.hashSync(password, saltRounds);
    const hashPassword = hash.replace(/^\$2a(.+)$/i, '$2y$1');
    return hashPassword;
}
exports.isPasswordMatch = (password, hash) => {
    const hashPassword = hash.replace(/^\$2y(.+)$/i, '$2a$1');
    const matchPassword = bcrypt.compareSync(password, hashPassword);
    return matchPassword;
}
exports.isEquals = (str, comparison) => {
    return str === comparison;
}
exports.isValidEmail = (email) => {
    const expression = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i

    return expression.test(String(email).toLowerCase())
}
exports.isComplexPassword = (password, options) => {
    var options = merge(options, default_complex_options);
    var default_complex_options = {
        optNumUpper: 1,
        optNumLower: 1,
        optNumNumbers: 1,
        optNumSpecials: 1,
        optStrLength: 8
    }
    var anUppercase = /[A-Z]/;
    var aLowercase = /[a-z]/;
    var aNumber = /[0-9]/;
    var aSpecial = /[!|@|#|$|%|^|&|*|(|)|-|_]/;
    var obj = {};
    obj.result = true;

    if (password.length < options.optStrLength) {
        obj.result = false;
        obj.errorMsg = 'Not enough length!';
        return obj;
    }

    var numUpper = 0;
    var numLower = 0;
    var numNumbers = 0;
    var numSpecials = 0;

    for (var i = 0; i < password.length; i++) {
        if (anUppercase.test(password[i])) {
            numUpper++;
        } else if (aLowercase.test(password[i])) {
            numLower++;
        } else if (aNumber.test(password[i])) {
            numNumbers++;
        } else if (aSpecial.test(password[i])) {
            numSpecials++;
        }
    }

    if (numUpper < options.optNumUpper || numLower < options.optNumLower || numNumbers < options.optNumNumbers || numSpecials < options.optNumSpecials) {
        obj.result = false;
        obj.errorMsg = 'Wrong format';
        return obj;
    }
    return obj;
}