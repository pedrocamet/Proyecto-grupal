const express = require ("express");
const session = require("express-session")
const path = require ("path");
const app = express ();
app.set ("view engine", "ejs");
var methodOverride = require('method-override');
app.use(methodOverride("_method"));


//Para captar la información que llega del formulario a través de POST
app.use(express.urlencoded({extended: false}));

/************* RUTAS GLOBALES ******************/ 
const autosRoutes = require("./src/routes/autosRoutes");
app.use("/", autosRoutes);

const usuariosRoutes = require("./src/routes/usuariosRoutes");
app.use("/usuario", usuariosRoutes);

const publicPath = path.resolve(__dirname, './public');  
app.use(express.static(publicPath));

const publicPath2 = path.resolve(__dirname, './views');  
app.use(express.static(publicPath2));

app.use(session({
  secret: "Secreto",
  resave: true,
  saveUninitialized: true
}));


/************************LO QUE PASO JERO PARA RUTAS NO DEFINIDAS */

/*app.get("*", (req, res) => {
  res.send("Ingreso a ruta invalido");
  });
*/



//*************** LEVANTAR SERVIDOR ******************/

app.listen(process.env.PORT || 3005, () => {
  console.log ("Servidor corriendo en el puerto 3005");
  });