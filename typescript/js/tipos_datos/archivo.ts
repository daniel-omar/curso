//string

let cadena: string ="omarmaylle"
let numero: number=12
let verdadero_falso: boolean=true

//any:cualquier tipo
let cualquiera:any="hola"
cualquiera="cualquiera"

//Array
let lenguajes:Array<string>=['php','phyton','java','javascript']
let years:number[]=[2000,2010,2020]
let numeros:Array<number>=[1,2,3,4,5,6]


//tipo de datos multiple
let multiple:string | number="cualquier cadena o numero"
//tipo de datos personalizados
type alfanumerico=string | number
let multiple2:alfanumerico=1

console.log(cadena+' '+numero+' '+verdadero_falso+' '+cualquiera+' '+lenguajes+' '+years+' '+numeros+' '+multiple+' '+multiple2);
//let vs var
var numero1=10
var numero2=12
if(numero1==10){
  let numero1=44
  let numero2=25
  console.log(numero1, numero2);
}
console.log(numero1, numero2);
