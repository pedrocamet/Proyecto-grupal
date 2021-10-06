const usuariosController = require("./../controllers/usuariosController");
const express = require ("express");
const router = express.Router();
const multer = require ("multer");
const path = require("path");
const {body, check} = require ("express-validator");

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
  body("nombre").notEmpty().isLength({min:3}).withMessage("Completar el campo").bail(),
  body("apellido").notEmpty().isLength({min:3}).withMessage("Completar el campo").bail(),
  body("email").notEmpty().isEmail().withMessage("Complete el campo con un email válido").bail(),
  body("password").notEmpty().isLength({min:4}).withMessage("Completar el campo"),
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

// cruce de datos para login

router.get("/login", usuariosController.loginUsuario);

router.post("/login", [
check("email").isEmail().withMessage("email invalido"),
check("password").isLength({min: 10}).withMessage("La contraseña debe contener al menos 10 caracteres")
],usuariosController.procesarLogin);

// fin cruce de datos para login


/***********EDITAR DATOS PERSONALES    ************/
router.get("/datos/:id", usuariosController.datosPersonales);
router.post("/datosPersonales", usuariosController.updateUser);

module.exports = router;