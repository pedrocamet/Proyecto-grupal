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

    detalleProducto: (req,res) =>{

        let idURL = req.params.id;
		let productoEncontrado;

		for (let p of productos){
			if (p.id==idURL){
				productoEncontrado=p;
				break;
			}
		}

		res.render("./products/detalle-producto.ejs",{productoDetalle: productoEncontrado});
    },

    creacionProducto: (req, res) => {
        res.render ("./products/creacion-producto.ejs");
    },  
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
                id: idNuevo,
                marca: req.body.marca,
                modelo: req.body.modelo,
                categoria: req.body.claseDeVehiculo,
                ano:req.body.ano,
                price:req.body.precioPorDia,
                image: nombreImagen
            }
           
    
                productos.push(productoNuevo);
             fs.writeFileSync(productosFilePath, JSON.stringify(productos, null, " "))
            res.redirect('/');

    },

    producto: (req, res) => {
        res.render ("producto");
    },

    //********************************* ELIMINAR EN PROCESO ****************************************/
    eliminar: (req, res) => {

		let id = req.params.id;
		let ProductoEncontrado;

		let Nproducts = products.filter(function(e){
			return id!=e.id;
		})

		for (let producto of products){
			if (producto.id == id){
			    ProductoEncontrado=producto;
			}
		}

		fs.unlinkSync(path.join(__dirname, '../../public/images/products/', ProductoEncontrado.image));

		fs.writeFileSync(productsFilePath, JSON.stringify(Nproducts,null,' '));

		res.redirect('/');
	}

    
}


module.exports = controlador;