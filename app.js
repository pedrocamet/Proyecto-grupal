const express = require ("express");
const path = require ("path");
const app = express ();
const publicPath = path.resolve(__dirname, './public');  
app.use(express.static(publicPath));


app.listen(3005, () => {
  console.log ("Servidor corriendo en el puerto 3005");
  });

app.get("/", (req, res)=>{
    res.sendFile(path.resolve(__dirname, "./views/home.html"));
  }); 
  