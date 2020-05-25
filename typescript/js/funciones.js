"use strict";
var getNumero = function (numero) {
    if (numero === void 0) { numero = 10; }
    return "El numero es: " + numero;
};
function getValor(valor) {
    if (valor === void 0) { valor = "primero"; }
    return "El valor es: " + valor;
}
console.log(getNumero());
console.log(getValor());
