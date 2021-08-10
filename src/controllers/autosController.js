const fs = require('fs');
const path = require('path');
const multer = require ('multer');
const { DefaultDeserializer } = require('v8');

const productosFilePath = path.join(__dirname, '../data/productos.json');
const productos = JSON.parse(fs.readFileSync(productosFilePath, 'utf-8'));


const controlador =
{
    home: (req, res) => {
        const productos = JSON.parse(fs.readFileSync(productosFilePath, 'utf-8'));
		res.render('home', {productos: productos});
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
    editarProducto: (req, res) => {
        let idProducto = req.params.idProd;
        let prodToEdit;
        
        for (let p of productos){
            if (p.id == idProducto){
                prodToEdit = p; 
                break;
            }
        }
        res.render ("./products/editar-producto.ejs", {productoEditar: prodToEdit});
    },    
    updateProducto: (req,res) => {
        let idProducto = req.params.idProd;
        let prodToEdit;
        console.log(idProducto)
        let imagenABorrar;
		for (let s of productos){
			if(idProducto==s.id){   
                imagenABorrar= s.imagen;
				s.modelo= req.body.modelo,
				s.categoria= req.body.category,
                s.ano= req.body.ano,
				s.precio= req.body.precio,
                s.fechaDispDesde= req.body.fechaDispDesde,
                s.fechaDispHasta = req.body.fechaDispHasta, 
                s.imagen= req.file.filename
               break;
            }}    
        fs.writeFileSync(productosFilePath, JSON.stringify(productos, null, " ")),
        console.log(imagenABorrar)
                   
        fs.unlinkSync(path.join(__dirname, '../../../Proyecto-grupal/public/img/', imagenABorrar));

        res.redirect('/');  
        node 
    },
    listadoProducto: (req, res) => {
        res.render ("./products/listado-productos.ejs")
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
                imagen: nombreImagen
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

		let Nproducts = productos.filter(function(e){
			return id!=e.id;
		})

		for (let producto of productos){
			if (producto.id == id){
			    ProductoEncontrado=producto;
			}
		}

		fs.unlinkSync(path.join(__dirname, '../../public/img/', ProductoEncontrado.imagen));

		fs.writeFileSync(productosFilePath, JSON.stringify(Nproducts,null,' '));

		res.redirect('/');
	}

    
}


module.exports = controlador;