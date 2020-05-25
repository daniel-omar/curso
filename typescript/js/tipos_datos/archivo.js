"use strict";
//string
var cadena = "omarmaylle";
var numero = 12;
var verdadero_falso = true;
//any:cualquier tipo
var cualquiera = "hola";
cualquiera = "cualquiera";
//Array
var lenguajes = ['php', 'phyton', 'java', 'javascript'];
var years = [2000, 2010, 2020];
var numeros = [1, 2, 3, 4, 5, 6];
//tipo de datos multiple
var multiple = "cualquier cadena o numero";
var multiple2 = 1;
console.log(cadena + ' ' + numero + ' ' + verdadero_falso + ' ' + cualquiera + ' ' + lenguajes + ' ' + years + ' ' + numeros + ' ' + multiple + ' ' + multiple2);
//let vs var
var numero1 = 10;
var numero2 = 12;
if (numero1 == 10) {
    var numero1_1 = 44;
    var numero2_1 = 25;
    console.log(numero1_1, numero2_1);
}
console.log(numero1, numero2);
