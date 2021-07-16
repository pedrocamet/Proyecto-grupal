const autosController = require("./../controllers/autosController");

const express = require ("express");
const router = express.Router();

router.get("/", autosController.home);

module.exports = router;