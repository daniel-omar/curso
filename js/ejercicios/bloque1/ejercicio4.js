'use strict'

var num1=parseInt(prompt("Introducir primer numero"),0)
var num2=parseInt(prompt("Introducir egundo numero"),0)

var max=Math.max(num1,num2);
var min=Math.min(num1,num2);
for (var i = min; i < max; i++) {
  if(i%2!=0){
    console.log("numero "+i);
  }

}
