'use strict'

var num1=parseInt(prompt("Introducir numero"),0)

while (isNaN(num1)) {
  var num1=parseInt(prompt("Introducir numero valido"),0)
}

  if(num1%2==0){
    console.log("numero "+num1+' es par');
  }else{
    console.log("numero "+num1+' es impar');
  }
