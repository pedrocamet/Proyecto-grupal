const autosController = require("./../controllers/autosController");
const express = require ("express");
const {body} = require ("express-validator");
const router = express.Router();
const multer = require ("multer");
const path = require("path");
const {check} = require('express-validator');

//************ Multerconfiguration ***************/
  
const configuracionImagen = multer.diskStorage({
  destination: function(req, file, cb) {       // request, archivo y callback que almacena archivo en destino
   cb(null, path.join(__dirname,'../../public/img'));    // Ruta donde almacenamos el archivo
  },
  filename: function(req, file, cb) {          // request, archivo y callback que almacena archivo en destino
  var imageName =  Date.now() + file.originalname ;   // milisegundos y extensión de archivo original
   cb(null, imageName);         
  }
});

const uploadFile = multer({storage: configuracionImagen});

/*********************************************************************/

router.get("/", autosController.home);
router.get("/slider", autosController.slider);
router.get("/login", autosController.login);
router.get("/carrito", autosController.carrito);
router.get("/homeLogin", autosController.homeLogin);

/***********lISTADO DE PRODUCTOS  ************/
router.get("/producto", autosController.producto); 


/***********CREATE ONE PRODUCT  ************/
router.get("/creacion-producto", autosController.creacionProducto); 
router.post("/creacion-producto", uploadFile.single("imageProduct"),  autosController.store); 


/*********** DETALLE DE UN PRODUCTO ************/
router.get("/detalle-producto/:id", autosController.detalleProducto); 

/*********** LISTADO DE PRODUCTOS (API) ************/
router.get("/productos-totales", autosController.autosAPI); 
router.get("/ultimo-producto", autosController.ultimoProducto); 
router.get("/show/:id", autosController.show); 
router.post("/", autosController.guardarAuto); 
router.get("/buscar", autosController.buscar);
router.get("/count", autosController.count);
router.get("/valor-total", autosController.valorTotal); //PRECIOS SUMADOS DE TODOS LOS PRODUCTOS



/***********EDIT A PRODUCT    ************/
router.get("/editar-producto/:idProd", autosController.editarProducto); //formulario de edicion de productos 
router.put("/editar-producto/:idProd", uploadFile.single('imageProduct'), autosController.updateProducto);// edicion y almacenamiento de producto 

/***********DELETE ONE PRODUCT  ************/
router.delete("/:id", autosController.eliminar);// eliminacion producto

/*********** LOG IN  ************/

router.post("/login", [
 check("email").isEmail(),
], autosController.procesLogin);



// +++++++++++++++++++++++++ RUTAS SOBRE LA BASE DE DATOS +++++++++++++++++++++++++ //
router.get("/listado", autosController.list);





module.exports = router;