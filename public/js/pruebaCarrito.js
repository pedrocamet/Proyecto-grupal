

window.onload = function (){

var botonAlqAhora = document.getElementById("boton-alquilar-ahora-T"); 

var prodCompMarca= document.querySelector(".detalle-producto-marca-T").innerHTML
var prodCompModelo= document.querySelector(".detalle-producto-modelo-T").innerHTML
var prodCompPrecio = document.querySelector(".detalle-producto-precio-T").innerHTML

let listaNombreProds = [];
let prodComprado = [];


console.log(prodComprado)
botonAlqAhora.addEventListener("click", function(){
 
  
if (prodComprado.length == 0) {
  prodComprado.push(prodCompMarca);
  prodComprado.push(prodCompModelo);
  prodComprado.push(prodCompPrecio);
  listaNombreProds.push(prodComprado);
  
  //localStorage.setItem("carrito", listaNombreProds)
  //console.log(localStorage.getItem("carrito"))
}else{
 
  alert("Usted no puede alquilar más de un Auto por operación")
}
  })

}