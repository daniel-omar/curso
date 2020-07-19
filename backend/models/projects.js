'use strict'

var moongose=require('moongose')
var Schema=moongose.Schema

var ProjectSchema=Schema({
  name:String,
  description:String,
  category:String,
  year:Number,
  languages:[String]
})

//cuando se crea la coleccion en la db se convierte a mayuscula y se pluraliza
module.exports=moongose.model('Project',ProjectSchema)
//projects --> guarda los documents en la coleccion
