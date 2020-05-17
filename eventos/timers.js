'use strict'

window.addEventListener('load',()=>{
  var agregar
  var intervalo
  //Timers
  //setInterval:bucle
  intervalo=()=>{
    agregar=setInterval(function() {
      console.log('Set interval ejecutado')
      var encabezado=document.querySelector('h1');
      if (encabezado.style.fontSize=='50px') {
        encabezado.style.fontSize='20px'
      }else{
        encabezado.style.fontSize='50px'
      }
    }, 2000);
  }
  intervalo()
  //Parar intervalo

   var stop=document.querySelector('#btnStop');
   stop.addEventListener('click',function(){
     clearInterval(agregar);
     alert('Has parado el intervalo en bucle')
   })

   //Iniciar intervalo
   var start=document.querySelector('#btnStart');
   start.addEventListener('click',function(){
     alert('Has iniciado el intervalo en bucle')
     intervalo()
   })


  //setTimeout:una vez
  // var tiempo=setTimeout(function() {
  //   console.log('Set interval ejecutado')
  //   var encabezado=document.querySelector('h1');
  //   if (encabezado.style.fontSize=='50px') {
  //     encabezado.style.fontSize='20px'
  //   }else{
  //     encabezado.style.fontSize='50px'
  //   }
  // }, 3000);
})
