'use strict'

window.addEventListener('load', function(e) {
  console.log('CArgo la pagina');
});


$(document).ready(function(){
  console.log('CArgo la pagina 2');
  var caja=$('#caja')

  // caja.mouseover(function(){
  //   $(this).css("background","red")
  // })
  // caja.mouseout(function(){
  //   $(this).css("background","green")
  // })

  function cambiaRojo(){
    $(this).css("background","red")
  }
  function cambiaVerde(){
    $(this).css("background","green")
  }
  //Hover
  caja.hover(cambiaRojo,cambiaVerde)

  // Click
  caja.click(function(){
    $(this).css("background","blue")
           .css("color",'white')
  })

  caja.dblclick(function(){
    $(this).css("background","pink")
           .css("color",'yellow')
  })

  var nombre=$("#txtNombre")
  var datos=$("#datos")
  nombre.focus(function(){
    $(this).css("border","2px solid green")
    datos.hide()
  })

  nombre.blur(function(){
    $(this).css("border","1px solid #ccc")

    datos.text($(this).val()).show()
  })


  //Mouse down y mouse up
  datos.mousedown(function(){
    $(this).css('border-color','gray')
  })
  datos.mouseup(function(){
    $(this).css('border-color','black')
  })
  datos.mouseleave(function(){
    $(this).css('border-color','black')
  })

  //mousemove
  $(document).mousemove(function(e){
    $('body').css('cursor','none')
    var sigueme=$("#sigueme")
    // console.log("En x: "+e.clientX);
    // console.log("En y:"+e.clientY);
    sigueme.css("left",e.clientX)
           .css("top",e.clientY)
  })
})
