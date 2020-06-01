import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute,Params} from '@angular/router'

@Component({
  selector: 'cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {
  public nombre:string
  public followers:number
  constructor(
    private _route:ActivatedRoute,
    private _router:Router
  ) { }

  //metodo que se eecuta al cargaar el componenet
  ngOnInit(): void {
    this._route.params.subscribe((params:Params)=>{
      this.nombre=params.nombre
      //+:para convertir string a number
      this.followers=+params.followers
      if (this.nombre=='ninguno') {
        this._router.navigate(['/home'])
      }
      // this.nombre=params['nombre']
      // console.log(this.nombre)
    })
  }
  redirigir(){
    this._router.navigate(['/zapatillas'])
  }

}
