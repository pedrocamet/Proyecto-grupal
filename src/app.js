const express = require ("express");
const path = require ("path");
const app = express ();
app.set ("view engine", "ejs");

const autosRoutes = require("./routes/autosRoutes");

app.use("/", autosRoutes);
app.use(express.static('./public'));
const publicPath = path.resolve(__dirname, './public');  
app.use(express.static(publicPath));
const publicPath2 = path.resolve(__dirname, './views');  
app.use(express.static(publicPath2));

app.listen(process.env.PORT || 3005, () => {
  console.log ("Servidor corriendo en el puerto 3005");
  });
<<<<<<< HEAD
 
  
=======

  
>>>>>>> f86792b3d461d118ceff98ad6f3b64aa6feba383
