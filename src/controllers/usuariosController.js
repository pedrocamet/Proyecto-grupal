const fs = require('fs');
const path = require('path');
const multer = require ('multer');
const { DefaultDeserializer } = require('v8');
const bcryptjs = require ('bcryptjs');
const {validationResult} = require("express-validator");
const {body} = require ("express-validator");

const usuariosFilePath = path.join(__dirname, '../data/usuarios.json');
const usuarios = JSON.parse(fs.readFileSync(usuariosFilePath, 'utf-8'));


const userControlador = 
{
  creacionUsuario: (req, res) => {
    res.render ("./users/registro.ejs");
  },

  // login y cruce de datos

  loginUsuario: (req, res) => {
    res.render ("login");
  },

  procesarLogin: (req, res) => {
    let errors = validationResult(req);

    /*if (errors.isEmpty()){
      
      users = {
        email: req.body.email,
        password: bcryptjs.hashSync(req.body.password, 10)
      }
      
      for (let i = 0; i < users.length; i++) {
        if (users[i].email == req.body.email) {
          if (bcrypt.compareSync(req.body.password, users[i].password))
          let usuarioALoguearse = users[i];
          break;
        }
      }
      if (usuarioALoguearse == undefined) {
        return res.render("login", {errors: [
          {msg: "Credenciales invalidas"}
        ]});
      }
      req.session.usuarioLogueado = usuarioALoguearse;
      res.render("Success");
    } else {
      return res.render("login", {errors: errors.errors}
      );
    } */
  },

  // fin login y cruce de datos

  procesarRegistro: (req,res) => {

    const resultValidation = validationResult(req);
  
    if(resultValidation.isEmpty()){

      let userToCreate = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        email: req.body.email,
        password: bcryptjs.hashSync(req.body.password, 10),
        fotoPerfil: req.file.filename
      }

      
      usuarios.push(userToCreate);
      fs.writeFileSync(usuariosFilePath, JSON.stringify(usuarios, null, " "))
      return res.redirect ("/");



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