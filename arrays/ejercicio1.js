'use strict'

var numeros=Array(6)

for (var i = 0; i < numeros.length; i++) {
  numeros[i]=parseInt(prompt(`Ingresar ${i} numero`))
}

var concatenar=''
numeros.sort()
numeros.forEach((item, i) => {
  concatenar=concatenar.concat(`<p>${i} - ${item}</p> `)
  console.log(`${i} - ${item}`);
  document.getElementById('contenedor').innerHTML = concatenar;
});

var concatenar2=''
var textNodo=''
numeros.reverse()
numeros.forEach((item, i) => {

  concatenar2=document.createElement('p')
  textNodo=document.createTextNode(`${i} - ${item} `)
  concatenar2.appendChild(textNodo)
  document.getElementById('contenedor2').appendChild(concatenar2);
  console.log(`${i} - ${item}`);

});
document.getElementById('total').innerHTML = numeros.length;
var objeto=document.getElementsByTagName('div')
for (var variable in objeto) {
  if (objeto.hasOwnProperty(variable)) {
    console.log(objeto[variable].innerText);
  }
}

console.log(document.querySelectorAll('#contenedor > p'))
var buscar=parseInt(prompt('Buscar elemento ',0))
document.getElementById('encontrado').innerHTML =numeros.some(elemento=>elemento==buscar)
document.getElementById('posicion').innerHTML =numeros.findIndex(elemento=>elemento==buscar)
