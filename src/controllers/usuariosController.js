const fs = require('fs');
const path = require('path');
const multer = require ('multer');
const { DefaultDeserializer } = require('v8');
const bcrypt = require ('bcryptjs');

const usuariosFilePath = path.join(__dirname, '../data/usuarios.json');
const usuarios = JSON.parse(fs.readFileSync(usuariosFilePath, 'utf-8'));


const userControlador = 
{
  creacionUsuario: (req, res) => {
    res.render ("./users/registro.ejs");
  },
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