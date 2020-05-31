import {Component, OnInit} from '@angular/core'
import {Zapatilla} from '../models/zapatilla'

@Component({
  selector:'zapatillas',
  templateUrl:'./zapatillas.component.html'
})
export class ZapatillasComponent implements OnInit{
  public titulo:string='Componente de zapatillas'
  public zapatillas:Array<Zapatilla>
  public marcas:String[]
  public color:string
  public mi_marca:string
  constructor(){
    this.color='yellow'
    this.marcas=new Array()
    this.mi_marca='Fila'
    this.zapatillas=[
      new Zapatilla('Rebook Classis','Rebook','blanco',200,true),
      new Zapatilla('Nike Classis','Nike','negro',300,true),
      new Zapatilla('Adidas Classis','Adidas','gris',250,false),
      new Zapatilla('Tommy','tommy','negro',180,true),
      new Zapatilla('Linio','Adidas','gris',150,false)
    ]
  }
  ngOnInit(){
    console.log(this.zapatillas)
    this.getMarcas()
  }
  getMarcas(){
   this.zapatillas.forEach((zapatilla,index)=>{
      if(this.marcas.indexOf(zapatilla.marca)<0)this.marcas.push(zapatilla.marca)

      // console.log(index)
    })
    console.log(this.marcas);
  }
  getMarca(){
     alert(this.mi_marca)
  }
  addMarca(){
     this.marcas.push(this.mi_marca)
  }
  borrarMarca(indice){
     // delete this.marcas[indice]
     this.marcas.splice(indice,1)
  }
  //se activa al slair del input
  onBlur(){
    console.log("has salido del input");
  }
  //al usar el keyup.Enter se activa
  mostrarPalabra(){
    alert(this.mi_marca)
  }
}
