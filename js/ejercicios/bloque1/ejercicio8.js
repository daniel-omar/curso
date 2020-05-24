'use strict'

var numero=new Array()
for (var i = 1; i <=2; i++) {
  numero[i]=parseInt(prompt('Introducir '+i+' numero'))
  if(isNaN(numero[i]) || numero[i]==0)
  {
    numero[i]=parseInt(prompt('Introducir '+i+' numero de manera correcta'))
    i--
  }
}

console.log('suma: '+(numero[1]+numero[2]));
console.log('resta: '+(numero[1]-numero[2]));
console.log('multiplicacion: '+(numero[1]*numero[2]));
console.log('division: '+(numero[1]/numero[2]));
