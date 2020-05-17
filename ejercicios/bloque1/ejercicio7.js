'use strict'

var numero=parseInt(prompt("¿De qué numero quieres la tabla?"),0)


while (isNaN(numero)) {
  var numero=parseInt(prompt("Introducir un numero valido"),0)
}

console.log('Tabla del '+numero);
for (var i = 1; i <= 12; i++) {
  console.log(numero+'x'+i+'='+numero*i);
}
