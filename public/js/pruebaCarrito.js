

window.onload = function (){

var botonAlqAhora = document.getElementById("boton-alquilar-ahora-T"); 

var prodCompMarca= document.querySelector(".detalle-producto-marca-T").innerHTML
var prodCompModelo= document.querySelector(".detalle-producto-modelo-T").innerHTML
var prodCompPrecio = document.querySelector(".detalle-producto-precio-T").innerHTML
//var idProdComp = req.params.id
//COMO AGARRAR EL ID ? 

let prodComprado = [];

botonAlqAhora.addEventListener("click", function(){

console.log("A VER SI ENTRA ")

  
if (prodComprado.length == 0) {
  prodComprado.push(prodCompMarca);
  prodComprado.push(prodCompModelo);
  prodComprado.push(prodCompPrecio);
  
  console.log(prodComprado)
  localStorage.setItem("carrito", JSON.stringify(prodComprado));

  //localStorage.setItem("carrito", prodComprado)
  //console.log(localStorage.getItem("carrito"))
}else{
 
  alert("Usted no puede alquilar más de un Auto por operación")
}
  })
console.log("ENTRO Y LLEGO ACA ? ")
console.log(prodComprado)
}