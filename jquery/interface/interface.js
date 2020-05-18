'use strict'
$(document).ready(function(){
  console.log('Hello');
  var elementos=$(".elemento")

  //Mover elemento con la pgina
  elementos.draggable()

  //Redimensionar
  elementos.resizable()

  //Seleccionar elementos
  // $(".lista-seleccionable").selectable()

  //Ordenar elementos
  $(".lista-seleccionable").sortable({
    update:function(event,ui){
      var data=$(this).sortable("serialize")
      console.log('Ha cambiado la lista'+data);
    }
  })


  //Dragg
  $("#elemento-movido").draggable({
    // drag:function(){
    //   $("#area").css("background",'white')
    // }
  })

  //Drop:
  $("#area").droppable({
    drop:function(){
      console.log('Has soltado algo dentro del area');
      $(this).css("background",'skyblue')
    },
    over:function(){
      $(this).css("background",'orange')
    },
    out:function(){
      $(this).css("background",'yellow')
    }
  })

  //efectos

  $("#btnMostrar").click(function(){
    var that=$(this)
    var texto=that.html()

    $("#caja-efectos").toggle('shake',function(){
      if(texto=='Mostrar'){
        that.html('Ocultar')
        console.log('Div mostrado');
      }else{
        that.html('Mostrar')
        console.log('Div ocultado');
      }
    })
  })


//Tooltip
  $(document).tooltip()

  //Dialog
  $("#btnLanzar").click(function(){
    $("#popup").dialog()
  })


  //Calendari
  $("#calendario").datepicker()

  //tabs
  $("#tabs").tabs()



})
