const express = require ("express");
const path = require ("path");
const app = express ();
const publicPath = path.resolve(__dirname, './public');  
app.use(express.static(publicPath));
const publicPath2 = path.resolve(__dirname, './views');  
app.use(express.static(publicPath2));

app.listen(process.env.PORT || 3005, () => {
  console.log ("Servidor corriendo en el puerto 3005");
  });

  
app.get("/", (req, res)=>{
    res.sendFile(path.resolve(__dirname, "./views/home.html"));
  }); 
  
  app.get("/", (req, res)=>{
    res.sendFile(path.resolve(__dirname, "./views/carrito.html"));
  }); 

  app.get("/", (req, res)=>{
    res.sendFile(path.resolve(__dirname, "./views/logIn.html"));
  }); 

  app.get("/", (req, res)=>{
    res.sendFile(path.resolve(__dirname, "./views/producto.html"));
  }); 

  app.get("/", (req, res)=>{
    res.sendFile(path.resolve(__dirname, "./views/registro.html"));
  }); 
