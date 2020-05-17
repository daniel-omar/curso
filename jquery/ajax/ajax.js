$(document).ready(function(){
  //Load
  var datos=$("#datos")

  // datos.load("https://reqres.in/")

  $.get("https://reqres.in/api/users",{page:2},function(response){
    console.log(response.data);
    var data=response.data

    //Con jquery
    // $.each(data,function(i,item){
    //     var elemento=document.createElement('p');
    //     elemento.textContent=item.id
    //     datos.append(elemento)
    // })

    //Con javascript
    data.forEach(function(item,i){
        var elemento=document.createElement('p');
        elemento.textContent=`${item.id} - ${item.first_name} - ${item.last_name}`
        datos.append(elemento)
    })
  })


  // var usuario={
  //   nombre:'Omar',
  //   apellido:'Maylle',
  // }
  //
  // $.post("https://reqres.in/api/users",usuario,function(response){
  //   console.log(response);
  // })

  $("#formulario").submit(function(e){
    e.preventDefault()// Esste
    var usuario={
      nombre:$("#txtNombre").val(),
      apellidos:$("#txtApellidos").val()
    }
    // $.post($(this).attr("action"),usuario,function(response){
    //   console.log(response);
    //     var elemento=document.createElement('p');
    //     elemento.textContent=`${response.id} - ${response.nombre} - ${response.apellidos}`
    //     datos.append(elemento)
    // }).done(function(){
    //   alert('Usuario añadido correctamente')
    // })


    $.ajax({
      async:true,
      type:'post',
      dataType:'json',
      url:$(this).attr("action"),
      data:usuario,
      beforeSend:function(){
        console.log("Enviando usuario..");
      },
      success:function(response){
        console.log(response);
        var elemento=document.createElement('p');
        elemento.textContent=`${response.id} - ${response.nombre} - ${response.apellidos}`
        datos.append(elemento)
      },
      error:function(){
        console.log("A ocurrido un error");
      },
      timeout:400
    })

    // return false// o este
  })





})
