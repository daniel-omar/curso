'use strict'

// window.addEventListener('load',()=>{
//
// })

//Añadir pelicula
var btn=document.querySelector('#btn');
var formulario=document.querySelector('#formulario');
formulario.addEventListener('submit',(e)=>{
  var pelicula=document.querySelector('#txtPelicula').value;
  if (pelicula.length>=1) {
    localStorage.setItem(pelicula,pelicula)
  }
})
var ul=document.querySelector('#listaPeliculas');

for (var variable in localStorage) {
  console.log(localStorage[variable])
  if (typeof localStorage[variable]=='string') {
    var li=document.createElement('li')
    li.append(localStorage[variable])
    ul.append(li)
  }
}

//Borrar pelicula
var btn=document.querySelector('#btn2');
var form=document.querySelector('#formularioBorrar');
form.addEventListener('submit',(e)=>{
  var pelicula=document.querySelector('#txtPeliculaBorrar').value;
  if (pelicula.length>=1) {
    localStorage.removeItem(pelicula)
  }
})
