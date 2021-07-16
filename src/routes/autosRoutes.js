const autosController = require("./../controllers/autosController");

const express = require ("express");
const router = express.Router();

router.get("/", autosController.home);
router.get("/login", autosController.login);
router.get("/carrito", autosController.carrito);
router.get("/registro", autosController.registro);
router.get("/producto", autosController.producto); 


module.exports = router;