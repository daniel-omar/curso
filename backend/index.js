'use strict'

var mongoose=require('mongoose')
var app=require('./app')
var port=3700

mongoose.set('useFindAndModify', false);
mongoose.Promise=global.Promise
//conectar con la base de datos mongodb
mongoose.connect('mongodb://localhost:27017/portafolio',{ useNewUrlParser:true, useUnifiedTopology: true })
  .then(()=>{
    console.log('Succeful connection')
    //creacion del servidor
    app.listen(port,()=>{
      console.log('Servidor corriendo correctamente en la url localhost:3700')
    })
  })
  .catch((error)=>{
    console.log(error)
  })
