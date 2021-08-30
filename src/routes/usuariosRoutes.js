const usuariosController = require("./../controllers/usuariosController");
const express = require ("express");
const router = express.Router();
const multer = require ("multer");
const path = require("path");
const {body} = require ("express-validator");

const configuracionImagen = multer.diskStorage({
  destination: function(req, file, cb) {       // request, archivo y callback que almacena archivo en destino
   cb(null, path.join(__dirname,'../../public/img/perfil'));    // Ruta donde almacenamos el archivo
  },
  filename: function(req, file, cb) {          // request, archivo y callback que almacena archivo en destino
   let imageName =  Date.now() + file.originalname ;   // milisegundos y extensión de archivo original
   cb(null, imageName);         
  }
});

const uploadFile = multer({storage: configuracionImagen});

/*********** REGISTRO **********************/

const validaciones =[
  body("nombre").notEmpty().withMessage("Completar el campo").bail(),
  body("apellido").notEmpty().withMessage("Completar el campo").bail(),
  body("email").notEmpty().isEmail().withMessage("Complete el campo con un email válido").bail(),
  body("password").notEmpty().withMessage("Completar el campo"),
  body("fotoPerfil").custom((value, {req}) => {
    let file = req.file;
    if(!file){
      throw new Error ("Tenés que subir una foto de perfil");
    }
    return true;
  })
];

router.post("/registro", uploadFile.single("fotoPerfil"), validaciones, usuariosController.procesarRegistro);





router.get("/registro", usuariosController.creacionUsuario);

module.exports = router;