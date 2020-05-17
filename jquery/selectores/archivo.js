'use strict'
var ajustes
$(document).ready(function(){
  console.log('jquery funcancdo')
 //selector id
  $('#rojo').css('background','red')
                     .css('color','blue')
  $('#amarillo').css('background','yellow')
  $('#verde').css('background','green')

 //selector id
  var mi_clase=$('.primero')
  // mi_clase.css('border','2px dashed black')

  $('.sin_borde').click(function(){
    $(this).addClass('primero')
  })

  $('p').dblclick(function(){
    if($(this).hasClass('primero')){
      $(this).addClass('grande')
      $(this).removeClass('primero')
    }
  })

  //Selectores de atributos
  $('[title="Google"]').css('background','#ccc').click(function(event){
    event.preventDefault()
    alert('cancelado')
  })
  $('[title="Facebook"]').css('background','blue')

  ajustes={
    nombre:'omar daniel',
    apellido:'maylle iguavel',
    edad:20
  }

  var {nombre,apellido}=ajustes

  console.log(nombre.concat(' haber si funcaa woaaa'));

  //otros
  $('p,a').addClass('margen-superior')

  var busqueda=$('#caja').find('.resaltado')
  var busqueda2=$('#elemento2').parent().parent().find('.resaltado')
  console.log(busqueda2);



})
