window.addEventListener("load", function(){

    let form = document.querySelector("form");
    let botonEditar = document.querySelector(".botonEleccionf")
    
    botonEditar.addEventListener("click", function(e){

        var errores = [];
        
        let campoMarca = document.querySelector("#marcaF");
        let campoModelo = document.querySelector("#modeloF");
        let campoPrecio = document.querySelector("#precioF");
        let campoAnio = document.querySelector("#anioF");

        
        if(campoMarca.value.length < 3){
            errores.push(" / La marca debe tener al menos 3 caracteres / ");
        }

        else if (campoModelo.value.length < 3){
            errores.push(" / El modelo debe tener al menos 3 caracteres / ");
        }

        else if(campoAnio.value.length != 4 ){
            errores.push(" / El año del auto debe tener 4 cifras / ");
        }
        else if(campoPrecio.value.length < 3){
            errores.push(" / El valor del precio debe tener al menos 3 cifras / ");
        }
        
        if (errores.length > 0) {
            e.preventDefault();

            let ulErrores = document.querySelector(".errores");

            for (let i = 0; i < errores.length; i++){

                ulErrores.innerHTML += "    " + errores[i] + "    "
            }

        } else {

            form.submit();
        }
    })

    })