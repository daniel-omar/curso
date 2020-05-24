'use strict'

var num1=parseInt(prompt("Introducir primer numero"),0)

for (var i = 0; i < num1; i++) {
  if(num1%i==0){
    console.log("divisor de "+num1+" numero: "+i);
  }

}
