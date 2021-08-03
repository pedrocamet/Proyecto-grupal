const autosController = require("./../controllers/autosController");
const express = require ("express");
const router = express.Router();
const multer = require ("multer");
const path = require('path');



//************ Multerconfiguration ***************/

const configuracionImagen = multer.diskStorage({
  destination: function(req, file, cb) {       // request, archivo y callback que almacena archivo en destino
   cb(null, path.join(__dirname,'../../public/img/productosVenta'));    // Ruta donde almacenamos el archivo
  },
  filename: function(req, file, cb) {          // request, archivo y callback que almacena archivo en destino
   let imageName =  Date.now() + file.originalname ;   // milisegundos y extensión de archivo original
   cb(null, imageName);         
  }
});

const uploadFile = multer({storage: configuracionImagen});

router.get("/", autosController.home);
router.get("/login", autosController.login);
router.get("/carrito", autosController.carrito);
router.get("/registro", autosController.registro);

/***********lISTADO DE PRODUCTOS  ************/
router.get("/producto", autosController.producto); 

/***********CREATE ONE PRODUCT  ************/
router.get("/creacion-producto", autosController.creacionProducto); 
router.post("/creacion-producto",uploadFile.single('imageProduct') ,autosController.store); 


/*********** DETALLE DE UN PRODUCTO ************/
router.get("/detalle-producto/:id", autosController.detalleProducto); // detalle de un producto falta todo PARAMETRIZADO


/***********EDIT A PRODUCT    ************/
//router.get("/productDetail/:id/edit", autosController.editProduct); //formulario de edicion de productos 
//router.put("/productDetail/:id/edit", autosController.editProduct);// edicion y almacenamiento de producto 

/***********DELETE ONE PRODUCT  ************/
//router.delete("/productDetail/:id/edit", autosController.editProduct);// eliminacion producto


module.exports = router;