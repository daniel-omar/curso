'use strict';

var suma=0;
var contador=0;

do {
  var numero=parseInt(prompt("Introduce numeros hasta que ingreses negativos",0));
  if (isNaN(numero)) {
    numero=0
  }else if (numero>=0) {
    suma+=numero;
    contador++;
  }
  console.log(suma);
} while (numero>=0);
console.log(suma);
console.log(contador);
console.log(suma/contador);
