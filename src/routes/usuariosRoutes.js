const usuariosController = require("./../controllers/usuariosController");
const express = require ("express");
const router = express.Router();
const multer = require ("multer");
const path = require("path");

/*const configuracionImagenPerfil = multer.diskStorage({
  destination: function(req, file, cb) {       // request, archivo y callback que almacena archivo en destino
   cb(null, path.join(__dirname,'../../public/img'));    // Ruta donde almacenamos el archivo
  },
  filename: function(req, file, cb) {          // request, archivo y callback que almacena archivo en destino
   let imageName =  Date.now() + file.originalname ;   // milisegundos y extensión de archivo original
   cb(null, imageName);         
  }
});

const uploadFile = multer({storage: configuracionImagen});
*/
/*******************REGISTRO */

router.get("/", usuariosController.creacionUsuario);

module.exports = router;