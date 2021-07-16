const productosController = require("./../controllers/productosController");

const express = require ("express");
const router = express.Router();

router.get("/", productosController.index);

module.exports = router;