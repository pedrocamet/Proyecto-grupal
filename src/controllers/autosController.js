const fs = require('fs');
const path = require('path');
const multer = require ('multer');
const { DefaultDeserializer } = require('v8');
const {validationResult} = require("express-validator");
const User = require("../models/User");
const bcryptjs = require("bcryptjs");

//BASE DE DATOS
const db = require("../../database/models");
const { join } = require('path');
const Op = db.Sequelize.Op; // o const {Op} = require("sequelize");

const productosFilePath = path.join(__dirname, '../data/productos.json');
const productos = JSON.parse(fs.readFileSync(productosFilePath, 'utf-8'));

const fotosAutos = path.join(__dirname, '../../public/img');


const controlador =
{

    slider: (req, res) => {
        res.render ("slider");
    },

    home: (req, res) => {


        db.Productos.findAll(req.params.id).then(function(productoEncontrado) {
        res.render("home.ejs",{productoDetalle: productoEncontrado});
        })     
        .catch(function(e){
        res.send(e)
        })

    },

//---------------------------------- APIS ---------------------------------------- //

// MUESTRA TODOS LOS AUTOS
    autosAPI: (req, res) => {

        db.Productos.findAll(req.params.id)
            .then((autos) =>{

                let listaAutos = [];

                for (auto of autos){

                    let objaux={
                        marca:  auto.marca,
                        modelo:  auto.modelo,
                        año: auto.año,
                        precio: auto.precioDia,
                        descripcion: auto.descripcion
                    }
                    
                    listaAutos.push(objaux);
                }

                res.json({
                    datosPedidos: "Listado de autos",
                    codigo: 200,
                    data: listaAutos})
    })
},

//CANTIDAD DE AUTOS 
count: (req, res) => {

    db.Productos.findAll(req.params.id)
        .then((autos) =>{

            let listaAutos = [];

            for (auto of autos){

                let objaux={
                    marca:  auto.marca,
                    modelo:  auto.modelo,
                    año: auto.año,
                    precio: auto.precioDia,
                    descripcion: auto.descripcion
                }

                listaAutos.push(objaux);
            }

            res.json({
                datosPedidos: "Cantidad de autos publicados",
                codigo: 200,
                data: listaAutos.length})
})
},

// PRECIOS TOTALES

valorTotal: (req, res) => {

    db.Productos.findAll(req.params.id)
        .then((autos) =>{

            let listaAutos = [];
            let precioFinal = 0;

            for (auto of autos){

                let objaux={
                    precio: auto.precioDia,
                }

                listaAutos.push(objaux);
            }


            for(let i = 0; i < listaAutos.length; i++){

                precioFinal = listaAutos[i].precio + precioFinal
            }

            res.json({
                datosPedidos: "Cantidad de autos publicados",
                codigo: 200,
                data: "$" + precioFinal})
})
},



//MUESTRA AUTO POR ID
    show: (req, res) => {

        db.Productos.findByPk(req.params.id)
            .then((auto) =>{
                
                res.json({
                    datosPedidos: "Auto",
                    codigo: 200,
                    data: auto})
            })
},

// GUARDA AUTO
guardarAuto: (req, res) => {

    
  db.Productos.create(req.body)
     .then((auto) =>{
            
         res.json({
             datosPedidos: "Auto",
             codigo: 200,
             data: auto})
    })
},

//BUSCA AUTO POR MARCA
buscar: (req, res) => {

    db.Productos.findAll({
      where: {
        marca: {[ Op.like ]: "%" + req.query.keyword + "%"}
      }
    })
       .then((autos) =>{
            if(autos.length > 0){
              
           res.json({
               datosPedidos: "Auto",
               codigo: 200,
               data: autos})
        } else {

            res.json("No existen autos con esa marca")
        }
      })
  },

  ultimoProducto: (req, res) => {

    db.Productos.findAll(req.params.id)
        .then((autos) =>{
  
            let listaAutos = [];
  
            for (auto of autos){
  
                let ultimoAuto={
                    id: auto.id, 
                                
                }
                listaAutos.push(ultimoAuto);
            }
            let ultimoId = listaAutos.length + 1;
            
            
        db.Productos.findByPk(ultimoId)
            .then((ultimoAuto) =>{
                
                res.json({
                    datosPedidos: "Último auto: ",
                    codigo: 200,
                    data: ultimoAuto})
            })
  
  
  })
  },




//----------------------------------  FIN APIS ---------------------------------------- //
    
    login: (req, res) => {
        res.render ("login");
    },

    homeLogin: (req, res) => {
        res.render ("homeLogin");
    },

    procesLogin: (req, res) => {
        let errors = validationResult(req);

        if (errors.isEmpty()) {

        } else {
            return res.render("/login", {errors: errors.errors});
        }
    },

    carrito: (req, res) => {
      
        res.render ("carrito");

    },
       
    

    registro: (req, res) => {
        res.render ("./users/registro");    
    },  

    detalleProducto: (req,res) =>{
        let productoEncontrado;      
        db.Productos.findByPk(req.params.id).then(function(productoEncontrado) {
        res.render("./products/detalle-producto.ejs",{productoDetalle: productoEncontrado});
        })     
        .catch(function(e){
        res.send(e)
        })
        
        /*

        
        let idURL = req.params.id;
		let productoEncontrado;

		for (let p of productos){
			if (p.id==idURL){
				productoEncontrado=p;
				break;
			}
		}
       */
		
        //res.redirect('/');
    },
    editarProducto: (req, res) => {
                            
        db.Productos.findByPk(req.params.idProd).then(function(prodToEdit) {
            res.render ("./products/editar-producto.ejs", {productoEditar: prodToEdit});
        })       
        .catch(function(e){
        res.send(e)
        })
    
        },    
    updateProducto: (req,res) => {
        let  imagenABorrar
        db.Productos.findByPk(req.params.idProd).then(function(prodToEdit) {
            imagenABorrar = prodToEdit.foto;
            fs.unlinkSync(path.join(__dirname, '../../public/img/', imagenABorrar));
            })       
            .catch(function(e){
            res.send(e)
            }),
        db.Productos.update({ 
            marca: req.body.marca,
            modelo: req.body.modelo,
            categoria: req.body.claseDeVehiculo,
            año:req.body.ano,
            precioDia:req.body.precioDia,
            KmInicio:100,
            fechaInicioDisp: req.body.fechaInicioDisp,
            fechaFinDisp: req.body.fechaFinDisp,
            foto: req.file.filename
        }, {
            where:{
             id: req.params.idProd
            }})     
        .catch(function(e){
        res.send(e)
        })
        //DESDE ACA ES EL VIEJO  
        /*
        let prodToEdit;
        console.log(idProducto)
        let imagenABorrar;
		for (let s of productos){
			if(idProducto==s.id){   
                s.modelo= req.body.modelo,
				s.categoria= req.body.category,
                s.ano= req.body.ano,
				s.precio= req.body.precio,
                s.fechaDispDesde= req.body.fechaDispDesde,
                s.fechaDispHasta = req.body.fechaDispHasta 
                if(req.file != undefined){
                    imagenABorrar= s.imagen;
                    s.imagen=req.file.filename
                    fs.unlinkSync(path.join(__dirname, '../../public/img/', imagenABorrar));
                } else {
                    s.imagen =s.imagen
                    
                }
                break;
            }}    */
            //    HASTA ACA 
        //fs.writeFileSync(productosFilePath, JSON.stringify(productos, null, " ")),
        
        
                   
        res.redirect('/');  
        
    },
    listadoProducto: (req, res) => {
        res.render ("./products/listado-productos.ejs")
    },

    creacionProducto: (req, res) => {
        res.render ("./products/creacion-producto.ejs");
    },  
    store: (req, res) => {
        //let nombreImagen =req.file.filename;
            db.Productos.create({            
            marca: req.body.marca,
            modelo: req.body.modelo,
            categoria: req.body.claseDeVehiculo,
            año:req.body.ano,
            precioDia:req.body.precioPorDia,
            KmInicio:100,
            fechaInicioDisp: req.body.fechaInicioDisp,
            fechaFinDisp: req.body.fechaFinDisp,
            foto: req.file.filename
        }) 
        .then(function(data){
            res.redirect('/')
        })
        .catch(function(e){
            res.send(e)
        })
        




               /* idNuevo = 0;
            for (let s of productos){
                if(idNuevo<s.id){
                    idNuevo = s.id;
            }
        }   */
        //idNuevo++
// desde aca nuevo probando guardar en base 
       // hasta aca 
        /*
            
    
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
            res.redirect('/');*/

    },

    producto: (req, res) => {
        res.render ("producto");
    },

    eliminar: (req, res) => {
	
        db.Productos.destroy({
            where: {
                id: req.params.id
            }
        })
        res.redirect('/');



        /*
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
        */
		
	},

// +++++++++++++++++++++++++ RUTAS SOBRE LA BASE DE DATOS +++++++++++++++++++++++++ //

    list: function(req,res){
        /*
        db.productos.findAll({
            include: [{association: "Venta"}]
        })
            .then(function(autos){
                res.render("list", {
                    
                }) 
            }
        */
    //Ó

    //db.Productos.findAll().then((autos) => { // SELECT * FROM PRODUCTOS
        //let listaProductos=[];

        //for(producto of Productos){
            //listaProductos.push(producto.marca + producto.modelo)
        //}
        //console.log("ver:  ", listaProductos);

        res.render("list") //, {autos: autos})
        
    //})
            
},

    listDetalle: function(req,res){

        //db.Productos.findByPk(req.params.id)

        //.then(function(auto){

        res.render("listDetalle") //, {producto: auto});
        
    //})
    }
}


module.exports = controlador;