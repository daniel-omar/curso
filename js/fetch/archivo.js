'use strict'
//Fetch y peticiones a servicios/apis rest

var lista = document.querySelector('#usuarios');
var div_profesor=document.querySelector('#profesor');
// var usuarios=''
// https://jsonplaceholder.typicode.com/users'
// https://reqres.in/api/users?page=1
var getUsuario = () => {
  return (fetch('https://reqres.in/api/users?page=1'));
}
var getJanet = () => {
  return (fetch('https://reqres.in/api/users?page=2'));
}
getUsuario()
  .then(data => data.json())
  .then(users => {
    // usuarios=users.data
    // console.log(usuarios);
    listadoUsuarios(users.data)
    return getInfo()
  })
  .then(data=>{
    div_profesor.innerHTML=JSON.stringify(data.nombre.concat(' ',data.apellidos,' '))
    return getJanet()
  })
  .then(data => data.json())
  .then(janet => {
    mostratJanet(janet.data[1])
  })
  .catch(error=>{
    console.log(error);
  })



// function getUsuario(){
//    return (fetch('https://reqres.in/api/users?page=1s'));
//  }
var listadoUsuarios = (usuarios) => {
  usuarios.map((user, i) => {
    let nombre = document.createElement('h2');
    nombre.textContent = i + user.first_name + ' ' + user.last_name
    lista.appendChild(nombre)
  })
  document.querySelector('.loading').style.display = 'none';
}

var listaJanet = document.querySelector('#janet');
var mostratJanet = (user) => {
  console.log(user);
  let nombre = document.createElement('h3');
  let avatar =document.createElement('img');

  nombre.textContent = user.first_name + ' ' + user.last_name
  avatar.src=user.avatar
  avatar.width='100'

  listaJanet.appendChild(nombre)
  listaJanet.appendChild(avatar)
  document.querySelector('#janet .loading').style.display = 'none';
}

//Creaacion promesa
function getInfo(){
  var profesor={
    nombre:'Victor',
    apellidos:'Robles',
    web:'https://victorroblesweb.es'
  }

  return new Promise((resolve,reject)=>{
      var profesor_string=JSON.stringify(profesor)
      setTimeout(function(){
          if (typeof profesor_string !='string' || profesor_string=='') {
            return reject('error')
          }
          return resolve(JSON.parse(profesor_string))
      },3000)

  })

}
