window.addEventListener("load", function(){

    let form = document.querySelector("form");
    let botonLogin = document.querySelector("#botonLogin")
    
    botonLogin.addEventListener("click", function(e){

        let errores = [];
        
        let campoPassword = document.querySelector("#password");


        if (campoPassword.value.length < 10){
            errores.push("Tu contraseña tiene " + campoPassword.value.length + " caracteres, debe tener al menos 10");
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