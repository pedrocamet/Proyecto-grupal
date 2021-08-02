const fs = require('fs');
const path = require('path');
const multer = require ('multer');
const { DefaultDeserializer } = require('v8');

const productosFilePath = path.join(__dirname, '../data/productos.json');
const productos = JSON.parse(fs.readFileSync(productosFilePath, 'utf-8'));


const controlador =
{
    home: (req, res) => {
        res.render ("home");
    },

    login: (req, res) => {
        res.render ("login");
    },

    carrito: (req, res) => {
        res.render ("carrito");
    },

    registro: (req, res) => {
        res.render ("./users/registro");    
    },  

    creacionProducto: (req, res) => {
        res.render ("./products/creacion-producto.ejs");
    },  
    store: (req, res) => {
    res.render ("./products/creacion-producto.ejs");
        store: (req, res) => {
            idNuevo = 0;
            for (let s of productos){
                if(idNuevo<s.id){
                    idNuevo = s.id;
            }
        }
            idNuevo++
    
            let nombreImagen =req.file.filename;
            let productoNuevo = {
                idAuto: idNuevo,
                marca: req.body.marca,
                model: req.body.modelo,
                categoria: req.body.claseDeVehiculo,
                ano:req.body.ano,
                price:req.body.precioPorDia,
                //description:  req.body.description,
                image: nombreImagen
            }
    
                productos.push(productoNuevo);
             fs.writeFileSync(productosFilePath, JSON.stringify(productos, null, " "))
            res.redirect('/');

    }},

    producto: (req, res) => {
        res.render ("producto");
    }
    
}


module.exports = controlador;