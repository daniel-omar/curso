'use strict'

//Comprobar disponibilidad del localstorage
if(typeof(Storage)!=='undefined'){
  console.log('Localstorage disponible');
}else{
  console.log('Localstorage incompatible');
}


//Guardar datos
localStorage.setItem('Titulo','Curso de js')

//Recuperar elemento
console.log(localStorage.getItem('Titulo'));
document.querySelector('#pelicula').textContent=localStorage.getItem('Titulo');

//guardar objeto
var usuario={
  nombre:'Omar Maylle',
  email:'omarm@gmail.com',
  web:'web.es'
}

Object.assign(usuario,{
  facebook:'omarmi'
})
localStorage.setItem('usuario',JSON.stringify(usuario))

//Recuperar objeto Json
var user=JSON.parse(localStorage.getItem('usuario'))
console.log(user);
var contenido=document.createTextNode(user.nombre.concat(' ',user.email))
document.querySelector('#datos').appendChild(contenido);

//remueve item
localStorage.removeItem('usuario')

//remueve todo el contenido del localStorage
// localStorage.clear()
