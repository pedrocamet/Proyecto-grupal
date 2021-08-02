const autosController = require("./../controllers/autosController");

const express = require ("express");
const router = express.Router();

router.get("/", autosController.home);
router.get("/login", autosController.login);
router.get("/carrito", autosController.carrito);
router.get("/registro", autosController.registro);



/***********lISTADO DE PRODUCTOS  ************/
router.get("/producto", autosController.producto); 

/***********CREATE ONE PRODUCT  ************/
router.get("/creacion-producto", autosController.creacionProducto); 
router.post("/creacion-producto", autosController.store); 


/***********ONE PRODUCT DETAIL ************/
//router.get("/productDetail/:id", autosController.productDetail); // detalle de un producto falta todo PARAMETRIZADO


/***********EDIT A PRODUCT    ************/
//router.get("/productDetail/:id/edit", autosController.editProduct); //formulario de edicion de productos 
//router.put("/productDetail/:id/edit", autosController.editProduct);// edicion y almacenamiento de producto 

/***********DELETE ONE PRODUCT  ************/
//router.delete("/productDetail/:id/edit", autosController.editProduct);// eliminacion producto


module.exports = router;