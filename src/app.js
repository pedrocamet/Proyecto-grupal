const express = require ("express");
const path = require ("path");
const app = express ();
const multer = require ('multer');
app.set ("view engine", "ejs");
var methodOverride = require('method-override');


app.use(methodOverride("_method"));
/************* RUTAS GLOBALES ******************/
const autosRoutes = require("./routes/autosRoutes");
app.use("/", autosRoutes);

const publicPath = path.resolve(__dirname, '../public');  
app.use(express.static(publicPath));

const publicPath2 = path.resolve(__dirname, './views');  
app.use(express.static(publicPath2));



//*************** LEVANTAR SERVIDOR ******************//
app.listen(process.env.PORT || 3005, () => {
  console.log ("Servidor corriendo en el puerto 3005");
  });