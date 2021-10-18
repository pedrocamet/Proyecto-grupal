

window.onload = function (){
  var carrito =  JSON.parse(localStorage.getItem("carrito"));
  var pr2 = document.querySelector(".pr2");
  pr2.innerHTML= carrito[0];
  console.log(pr2)
  console.log(localStorage)
  var modeloCarrito = document.querySelector(".modeloCarrito");
  modeloCarrito.innerHTML = carrito[1];
  var precioPorDiaCarrito = document.querySelector(".precioPorDiaoCarrito");
  precioPorDiaCarrito.innerHTML = carrito[2]; 




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