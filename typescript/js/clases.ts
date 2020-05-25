//Clase(molde del objeto)
interface CamisetaBase {
  setColor(color:string):any
  getColor():string
}

// Decorador
function estampar(logo:string){
  return function(target: Function){
    target.prototype.estampacion=function():void{
      console.log("Camiseta estampada con el logo de: "+logo)
    }
  }
}

@estampar("Gucci")
class Camiseta implements CamisetaBase {
  //Propiedades(caractersticas del objeto)
  private color: string
  private modelo: string
  private marca: string
  private talla: string
  private precio: number

  //constructr
  constructor(color:string, modelo:string, marca:string, talla:string, precio:number) {
    this.color = color
    this.modelo = modelo
    this.marca = marca
    this.talla = talla
    this.precio = precio
  }
  //Metodos(funciones del objeto)
  public setColor(color:string) {
    this.color = color
  }
  public getColor() {
    return this.color
  }


}


class Sudadera extends Camiseta{
  public capucha:boolean
  constructor(capucha:boolean,color:string, modelo:string, marca:string, talla:string, precio:number){
    super(color,modelo,marca,talla,precio)
    this.capucha=capucha
  }
  setCapucha(capucha:boolean){
    this.capucha=capucha
  }
  getCapucha():boolean{
    return this.capucha
  }
}

var camiseta = new Camiseta("Rojo", "nuevi", "Adidas", "L", 25)
// camiseta.color="rojo"
// camiseta.marca="Adidas"
// camiseta.modelo="Cuello V"
// camiseta.talla="L"
// camiseta.precio=30
camiseta.setColor("rojo")
camiseta.estampacion()
console.log(camiseta);

var sudadera_nueva=new Sudadera(false,"verde", "vvv", "Nike", "L", 20)
sudadera_nueva.setColor("Rosa")
console.log(sudadera_nueva);
