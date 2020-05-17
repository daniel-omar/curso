'use strict'
var suma;
var sumar=(a,b)=>{
  console.log('La suma es: '+(a+b))
  console.log('La resta es: '+(a-b))
  suma=a+b;
  return suma
}

console.log(sumar(5,6));
