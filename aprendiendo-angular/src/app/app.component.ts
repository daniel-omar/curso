import { Component } from '@angular/core';
import {configuracion} from './models/configuracion'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title = 'Master de Javascript y angular'
  public descripcion = 'Curos de Angular con VR'
  public config
  public mostrar_videojuegos:boolean=true
  constructor(){
    this.config=configuracion
    this.title=configuracion.titulo
    this.descripcion=configuracion.descripcion

  }
  ocultarVideojuegos(valor:boolean){
    this.mostrar_videojuegos=valor
  }
}
