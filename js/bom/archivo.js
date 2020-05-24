'use strict'
//BOM Browser Model Object

function getBom() {
  //conseguir el alto de la pantall
  console.log(window.innerHeight);
  //conseguir el ancho de la pantalla
  console.log(window.innerWidth)
  //obtener url actual
  console.log(window.location.href);
}

var redirect= url=>window.location.href=url

var abrirVentana=url=>window.open(url,"","width=400,height=300")
