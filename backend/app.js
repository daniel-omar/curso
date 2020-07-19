'use strict'

var express=require('express')
var bodyParser=require('body-parser')

var app=express()

//cargar archivos de rutas
var project_routes=require('./routes/project')

//middlewares(metodo que se ejecuta ants de ejecutar la accion de un metodo de un controlador)
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

//CORS

//rutas
app.use('/api',project_routes)

//exportar
module.exports=app
