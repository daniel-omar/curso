'use strict';
var num=new Array();

for (var i = 0; i < 2; i++) {
  num[i]=parseInt(prompt("Ingrese "+(i+1)+' valor',0));
  if(isNaN(num[i])){
     i--;
     alert("Introducir un numero por favor");
  }else if (num[i]<=0) {
     alert("Introducir un numero diferente de 0");
     i--;
  }
}

if(num[0]>num[1]){
  alert("Numero "+num[0]+' es mayor que '+num[1]);
}else if (num[0]==num[1]) {
  alert("Numero "+num[0]+' es igual que '+num[1]);
}else{
  alert("Numero "+num[1]+' es mayor que '+num[0]);
}
