'use strict'
var bicicleta={
  color:'Rojo',
  modelo:'BMX',
  frenos:'De disco',
  velocidadMaxima:'60Km',
  cambiaColor:function(nuevo_color){
    this.color=nuevo_color
  }
}
bicicleta.cambiaColor("Azul")
console.log(bicicleta);
