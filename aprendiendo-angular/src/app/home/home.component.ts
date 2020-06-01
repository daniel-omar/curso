import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public identificado:boolean
  constructor() {
    this.identificado=false
    console.log(this.identificado)
  }

  ngOnInit(): void {
  }

  setIdentificado(){
    this.identificado=true
  }
  unsetIdentificado(){
    this.identificado=false
  }
}
