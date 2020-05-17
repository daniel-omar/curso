'use strict'

$(document).ready(function(){

  $("#add_button").removeAttr('disabled').click(function(){
    var link=$("#add_link").val()
    //after lo agrega depopues del ul
    //before lo agrega antes del ul
    $('ul').append(`<li><a href="${link}" target='_blank'>${link}</a></li>`)
  })


  $('a').each(function(i){
    var that=$(this)
    var enlace=that.attr("href")
    //nos abre el enlace en otra pestaña 'target:_blank'
    that.attr('target','_blank')


    that.text(enlace)
  })
})
