

window.onload = function (){

var botonAlqAhora = document.getElementById("boton-alquilar-ahora-T"); 

var prodCompMarca= document.querySelector(".detalle-producto-marca-T").innerHTML
var prodCompModelo= document.querySelector(".detalle-producto-modelo-T").innerHTML
var St =document.querySelector(".detalle-producto-precio-T").innerHTML
var i$= St.indexOf("$");
var prodCompPrecio = Number(St.slice([(i$+1)]))




//var prodCompPrecio = Number(prodComp)


//var prodCompPrecios = number("")

//var idProdComp = req.params.id
//COMO AGARRAR EL ID ? 

let prodComprado = [];

botonAlqAhora.addEventListener("click", function(){
  var cantDias = document.getElementById("diasAuto").value;
console.log("A VER SI ENTRA ")
console.log("cant dias" + prodCompPrecio+ "aca" )
console.log(typeof(prodCompPrecio))
console.log(prodCompPrecio+5)
  
if (prodComprado.length == 0) {
  prodComprado.push(prodCompMarca);
  prodComprado.push(prodCompModelo);
  prodComprado.push(prodCompPrecio);  
  prodComprado.push(cantDias*prodCompPrecio);
  
  
  console.log(prodComprado)
  localStorage.setItem("carrito", JSON.stringify(prodComprado));

  //localStorage.setItem("carrito", prodComprado)
  //console.log(localStorage.getItem("carrito"))
}else{
 
  alert("Usted no puede alquilar más de un Auto por operación")
}
window.location.replace("../carrito")
  })
console.log("ENTRO Y LLEGO ACA ? ")
console.log(prodComprado)

}