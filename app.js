const express = require ("express");
const path = require ("path");
const app = express ();
const multer = require ('multer');
app.set ("view engine", "ejs");
var methodOverride = require('method-override');
app.use(methodOverride("_method"));

//Para captar la información que llega del formulario a través de POST
app.use(express.urlencoded({extended: false}));

/************* RUTAS GLOBALES ******************/ 
const autosRoutes = require("./src/routes/autosRoutes");
app.use("/", autosRoutes);

const usuariosRoutes = require("./src/routes/usuariosRoutes");
app.use("/registro", usuariosRoutes);

const publicPath = path.resolve(__dirname, './public');  
app.use(express.static(publicPath));

const publicPath2 = path.resolve(__dirname, './views');  
app.use(express.static(publicPath2));


/************************LO QUE PASO JERO PARA RUTAS NO DEFINIDAS */

/*app.get("*", (req, res) => {
  res.send("Ingreso a ruta invalido");
  });
*/



//*************** LEVANTAR SERVIDOR ******************/

app.listen(process.env.PORT || 3005, () => {
  console.log ("Servidor corriendo en el puerto 3005");
  });