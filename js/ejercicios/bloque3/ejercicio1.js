'use strict'

window.addEventListener('load',()=>{
  console.log('DOM completo')
  var formulario=document.querySelector('#formulario');
  var box_dashed=document.querySelector('.dashed');
  box_dashed.style.display='none';

  formulario.addEventListener('submit',(event)=>{
    event.preventDefault()
    console.log('Evento submit capturado')
    var nombre=document.querySelector('#txtNombre').value;
    var apellido=document.querySelector('#txtApellidos').value;
    var edad=parseInt(document.querySelector('#txtEdad').value);
    if(nombre.trim()==null || nombre.trim().length==0){
      alert('El nombre no es valido');
      document.querySelector('#errorNombre').textContent='El nombre no es valido';
      return false
    }else{
      document.querySelector('#errorNombre').style.display='none'
    }
    if(apellido.trim()==null || apellido.trim().length==0){
      alert('Los apellidos no son valido');
      document.querySelector('#errorApellidos').textContent='Los apellidos no son validos';
      return false
    }else{
      document.querySelector('#errorApellidos').style.display='none'
    }
    if(edad==null || edad<=0 || isNaN(edad)==true){
      alert('La edad no es valido');
      document.querySelector('#errorEdad').textContent='La edad no es valida'
      return false
    }else{
      document.querySelector('#errorEdad').style.display='none'
    }
    box_dashed.style.display='block';
    // console.log(nombre,apellido,edad);

    var datos=[nombre,apellido,edad]
    var parrado
    for (var variable in datos) {
      parrado=document.createElement('p')
      parrado.setAttribute('id', variable);
      parrado.append(datos[variable]);
      box_dashed.append(parrado)
    }


  })
})
