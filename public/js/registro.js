window.addEventListener("load", function(){

    let form = document.querySelector("form");
    let botonRegistro = document.querySelector("#botonRegistro")

    botonRegistro.addEventListener("click", function(e){

        let errores = [];

        let campoNombre = document.querySelector("#nombre");
        let campoApellido = document.querySelector("#apellido");
        let campoPassword = document.querySelector("#password");
        
        if (campoNombre.value.length < 3) {

            errores.push("El nombre debe tener al menos 3 caracteres");

        } else if (campoApellido.value.length < 3){

            errores.push("El apellido debe tener al menos 3 caracteres");

        } else if (campoPassword.value.length < 7){

            errores.push("La contraseña debe tener al menos 7 caracteres");

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

