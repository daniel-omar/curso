'use strict'
//evento al cargar la pagina inicizlizar
window.addEventListener('load',()=>{

})


var boton=document.querySelector('#btn');

var cambiarColor=()=>
{
  var bg=boton.style.background
  if (bg=='green') {
    boton.style.background='red'
  }else{
    boton.style.background='green'
  }
  return true
}
//Evento click
boton.addEventListener('click', function(){
  cambiarColor()
  this.style.border='10px solid black'
});

//Evento mouseover
boton.addEventListener('mouseover',function(){
  boton.style.background='#ccc'
})

//Evento mouseout
boton.addEventListener('mouseout',function(){
  boton.style.background='black'
})
//-----------------------------------------------
var input=document.querySelector('#txtNombre');
//Evento Focus
input.addEventListener('focus',function(){
  console.log("Esta dentro del input");
})

//Evento blur
input.addEventListener('blur',function(){
  console.log("Esta fuera del input")
})

//Evento keydown
input.addEventListener('keydown',function(e){
  console.log("[keydown] Pulsando esta tecla ",String.fromCharCode(e.which))
})

//Evento keypress
input.addEventListener('keypress',function(e){
  console.log("[keypress] tecla presionada ",String.fromCharCode(e.which))
})

//Evento keyup
input.addEventListener('keyup',function(e){
  console.log("[keyup] tecla soltada ",String.fromCharCode(e.which))
})

//Evento load
