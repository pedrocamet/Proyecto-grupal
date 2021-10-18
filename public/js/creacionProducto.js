window.addEventListener("load", function(){

    let form = document.querySelector("form");
    let botonCreacion = document.querySelector("#boton-creacion-F")
    
    botonCreacion.addEventListener("click", function(e){

        var errores = [];
        
        let campoMarca = document.querySelector("#marca-creacion-F");
        let campoModelo = document.querySelector("#modelo-creacion-F");
        let campoPrecio = document.querySelector("#precio-creacion-F");
        let campoAnio = document.querySelector("#anio-creacion-F");

        
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