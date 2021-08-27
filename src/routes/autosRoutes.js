const autosController = require("./../controllers/autosController");
const express = require ("express");
const {body} = require ("express-validator");
const router = express.Router();
const multer = require ("multer");
const path = require("path");

//************ Multerconfiguration ***************/

const configuracionImagen = multer.diskStorage({
  destination: function(req, file, cb) {       // request, archivo y callback que almacena archivo en destino
   cb(null, path.join(__dirname,'../../public/img'));    // Ruta donde almacenamos el archivo
  },
  filename: function(req, file, cb) {          // request, archivo y callback que almacena archivo en destino
   let imageName =  Date.now() + file.originalname ;   // milisegundos y extensión de archivo original
   cb(null, imageName);         
  }
});

const uploadFile = multer({storage: configuracionImagen});

/*********************************************************************/

router.get("/", autosController.home);
router.get("/login", autosController.login);
router.get("/carrito", autosController.carrito);


/***********lISTADO DE PRODUCTOS  ************/
router.get("/producto", autosController.producto); 

/***********CREATE ONE PRODUCT  ************/
router.get("/creacion-producto", autosController.creacionProducto); 
router.post("/creacion-producto", uploadFile.single("imageProduct"),  autosController.store); 

/*********** REGISTRO **********************/

const validaciones =[
  body("nombre").notEmpty().withMessage("Completar el campo").bail(),
  body("apellido").notEmpty().withMessage("Completar el campo").bail(),
  body("email").notEmpty().isEmail().withMessage("Complete el campo con un email válido").bail(),
  body("password").notEmpty().withMessage("Completar el campo")
];

router.post("/registro", uploadFile.single("fotoPerfil"), validaciones, autosController.procesarRegistro)


/*********** DETALLE DE UN PRODUCTO ************/
router.get("/detalle-producto/:id", autosController.detalleProducto); 

/***********lISTADO DE PRODUCTOS  ************/
router.get("/listado-productos", autosController.listadoProducto); 

/***********EDIT A PRODUCT    ************/
router.get("/editar-producto/:idProd", autosController.editarProducto); //formulario de edicion de productos 
router.put("/editar-producto/:idProd", uploadFile.single('imageProduct'), autosController.updateProducto);// edicion y almacenamiento de producto 

/***********DELETE ONE PRODUCT  ************/
router.delete("/:id", autosController.eliminar);// eliminacion producto


module.exports = router;