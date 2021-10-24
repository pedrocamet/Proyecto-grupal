

window.onload = function (){
  var botonCancelar = document.getElementById("botoncancelarf"); 
  var carrito =  JSON.parse(localStorage.getItem("carrito"));
  
  var marcaCarrito = document.querySelector(".marcaCarrito");
  if (carrito.length != 0 ) {
     marcaCarrito.innerHTML= carrito[0]; 
     } else {
        modeloCarrito.innerHTML = " ";
  }
    
  var modeloCarrito = document.querySelector(".modeloCarrito");
  
  if (carrito.length != 0 ) {
    modeloCarrito.innerHTML = carrito[1]; 
  } else {
    modeloCarrito.innerHTML = " ";
  }
  
  var precioPorDiaCarrito = document.querySelector(".precioPorDiaCarrito");
  if (carrito.length != 0 ) {
    precioPorDiaCarrito.innerHTML = carrito[2]; 
  } else {
    modeloCarrito.innerHTML = " ";
  }
  


  botonCancelar.addEventListener("click", function (){
    prodComprado = [];
   
    localStorage.setItem("carrito", JSON.stringify(prodComprado));

  })





  //var idProdComp = req.params.id
  //COMO AGARRAR EL ID ? 
  
  let prodComprado = [];
  /*
  botonAlqAhora.addEventListener("click", function(){
  
  console.log("A VER SI ENTRA ")
  
    
  if (prodComprado.length == 0) {
    prodComprado.push(prodCompMarca);
    prodComprado.push(prodCompModelo);
    prodComprado.push(prodCompPrecio);
    
    console.log(prodComprado)
    localStorage.setItem("carrito", prodComprado)
    //console.log(localStorage.getItem("carrito"))
  }else{
   
    alert("Usted no puede alquilar más de un Auto por operación")
  }
    })
  console.log("ENTRO Y LLEGO ACA ? ")
  console.log(prodComprado)
  */
  }