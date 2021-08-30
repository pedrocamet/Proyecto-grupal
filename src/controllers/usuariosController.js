const fs = require('fs');
const path = require('path');
const multer = require ('multer');
const { DefaultDeserializer } = require('v8');
const bcrypt = require ('bcryptjs');
const {validationResult} = require("express-validator");

const usuariosFilePath = path.join(__dirname, '../data/usuarios.json');
const usuarios = JSON.parse(fs.readFileSync(usuariosFilePath, 'utf-8'));


const userControlador = 
{
  creacionUsuario: (req, res) => {
    res.render ("./users/registro.ejs");
  },

  procesarRegistro: (req,res) => {

    const resultValidation = validationResult(req);
    res.send(resultValidation);
    /*
    if(resultValidation.isEmpty()){

      let userToCreate = {
        nombre: req.file.filename,
        apellido: req.file.filename,
        email: req.file.filename,
        password: bcryptjs.hashSync(req.body.password, 10),
        fotoPerfil: req.file.filename

      }

      usuarios.push(userToCreate);
      return res.send ("OK, se guardó el usuario");



    }

    
   /* if(resultValidation.errors.length > 0){
        return res.render("./users/registro", {
        errors: resultValidation.mapped(),
        oldData: req.body
    });  
}

    
    
*/
}

/*
  registrarse: function(req, res, next){
    console.log (req);
    
    let usuario = {
      nombreDeUsuario = req.body.username,
      email = req.body.email,
      contrasena= bcrypt.hashSync(req.body.password, 10),
      
    }
  }
  */
}

module.exports = userControlador;