import {Component,OnInit,DoCheck,OnDestroy} from '@angular/core'

@Component({
  selector:'videojuego',
  templateUrl:'./videojuego.component.html'
})

export class VideojuegoComponent implements OnInit, DoCheck,OnDestroy{
    public titulo:string
    public listado:string
    constructor(){
        this.titulo='Componente de videojuegos'
        this.listado='Listado de los videojuegos mas populares'
        // console.log("Se ha cargado el componente ");
    }
    //El primer metodo que se muestra al cargar el constructor
    ngOnInit(){
      // console.log('OnInit ejecutado');
    }
    //Se ejecuta al hacer cualquier cambio en la aplicacion, algun metodo o funcion por ejemplo
    ngDoCheck(){
      // console.log('DoCheck ejecutado');
    }
    //Se ejecuta cuando se elimina el componente
    ngOnDestroy(){
      console.log('OnDestroy ejecutado');
    }
    cambiarTitulo(){
      this.titulo='Nuevo titulo del componente'
    }
}
