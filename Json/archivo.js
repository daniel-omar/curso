'use strict'

var pelicula={
  titulo:'Batman vs Superman',
  año:2017,
  pais:'Estados unidos'
}

var peliculas=[
  {
    titulo:'La verdad duele',
    año:2017,
    pais:'Francia'
  },
  pelicula
]
pelicula.titulo='Superman Begins'
Object.assign(pelicula,
       {
           genero: 'Ciencia ficcion'
       }
);

var caja_pelicula=document.querySelector('#pelicula');
for (var variable in peliculas) {
  var parrado=document.createElement('p')
  parrado.append(peliculas[variable].titulo.concat(' - ',peliculas[variable].pais))
  caja_pelicula.append(parrado)
}



console.log(peliculas);
