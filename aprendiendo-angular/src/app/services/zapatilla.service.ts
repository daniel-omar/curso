import { Injectable} from '@angular/core'
import {Zapatilla} from '../models/zapatilla'
@Injectable()

export class ZapatillaService{
  public zapatillas:Array<Zapatilla>
  constructor(){
    this.zapatillas=[
      new Zapatilla('Rebook Classis','Rebook','blanco',200,true),
      new Zapatilla('Nike Classis','Nike','negro',300,true),
      new Zapatilla('Adidas Classis','Adidas','gris',250,false),
      new Zapatilla('Tommy','tommy','negro',180,true),
      new Zapatilla('Linio','Adidas','gris',150,false)
    ]
  }

  getTexto(){
    return 'Hola mundo desde un servicio'
  }

  getZapatillas():Array<Zapatilla>{
    return this.zapatillas
  }
}
