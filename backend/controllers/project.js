'use strict'

var controller={
  home:function(req,res){
    return res.status(200).send({
      message:'Soy la home'
    })
  },

  test:function(req,res){
    return res.status(200).send({
      message:'Metodo o accion de test'
    })
  }
}

module.exports=controller
