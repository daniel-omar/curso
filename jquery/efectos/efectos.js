'use strict'
$(document).ready(function(){
  var mostrar=$("#btnMostrar")
  var ocultar=$("#btnOcultar")
  var caja=$("#caja")

  mostrar.click(function(){
    $(this).hide()
    ocultar.show()
    //efectod n el show
    // caja.show('fast')
    //efecto fadeIn: mostrar
    // caja.fadeIn('slow')
    //efecto fadeTo: mostrar, permite que vaya de un estado a otro
    caja.fadeTo('slow',0.8)//1 para mostrar
  })
  ocultar.click(function(){
    $(this).hide()
    mostrar.show()
    // caja.hide('fast')
    //efecto fadeOut:ocutar
    // caja.fadeOut('slow')
    //efecto fadeIn: mostrar
    caja.fadeTo('slow',0.5)//0 para que se oculte
  })

  var boton=$("#btn")

  boton.click(function(e){
    var that=$(this)
    var texto=that.html()


    caja.toggle('fast',function(){
      if(texto=='Ocultar'){
        that.html('Mostrar')
        console.log('Div ocultado');
      }else{
        that.html('Ocultar')
        console.log('Div mostrado');
      }
    })
  })


  //ANIMAR
  var animar=$("#btnAnimar")
  animar.click(function(){
    caja.animate({marginLeft:500,
                  fontSize:30,
                  height:110
                  },'slow')
        .animate({borderRadius:45,
                  marginTop:50
                  },'slow')
        .animate({borderRadius:0,
                  marginLeft:0
                  },'slow')
                  .animate({borderRadius:0,
                            marginTop:0
                            },'slow').animate({marginLeft:500,
                                          fontSize:30,
                                          height:110
                                          },'slow')
  })

})
