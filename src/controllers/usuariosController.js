const fs = require('fs');
const path = require('path');
const multer = require ('multer');
const { DefaultDeserializer } = require('v8');
const bcryptjs = require ('bcryptjs');
const {validationResult} = require("express-validator");
const {body} = require ("express-validator");


//BASE DE DATOS
const db = require("../../database/models");
const { producto } = require('./autosController');
const Op = db.Sequelize.Op; // o const {Op} = require("sequelize");

const usuariosFilePath = path.join(__dirname, '../data/usuarios.json');
const usuarios = JSON.parse(fs.readFileSync(usuariosFilePath, 'utf-8'));
let usuarioAModificar ;
let usuarioLogueado
let usuarioAEditar
const userControlador = 
{
  creacionUsuario: (req, res) => {
   res.render ("users/registro.ejs");
  },

  // login y cruce de datos

  loginUsuario: (req, res) => {
    res.render ("login");
  },

  

  
  procesarLogin: (req, res) => {
   
    db.Clientes.findOne({
      where: {
        mail: req.body.mail
      }
    }).then((resultado) => {

       
      if (resultado !=null && (bcryptjs.compareSync(req.body.password, resultado.dataValues.contraseña))){
         usuarioLogueado = resultado.dataValues;
         
         res.render("users/datosPersonales",{usuarioAEditar: usuarioLogueado})
        } else {
          
          res.render("login", { mensaje: ("las credenciales son invalidas")})
        }
    }).catch(function(e){
      res.send(e)
    })
      // fin login y cruce de datos     
       
  },  

  datosPersonales:(req,res) => {   
    db.Clientes.findByPk(req.params.id).then(function(productoEncontrado) {
    res.render("./users/datosUsuarios.ejs",{productoDetalle: productoEncontrado});
    })     
    .catch(function(e){
    res.send(e)
    })
  },

  updateUser: (req,res) => {
    let userUpdateId = usuarioLogueado.id
    console.log(userUpdateId)
   
    let imagenABorrar = usuarioLogueado.foto
    console.log("foto a borrar "  + imagenABorrar)
  
    fs.unlinkSync(path.join(__dirname, '../../public/img/perfil', imagenABorrar));                    
        
    db.Clientes.update({ 
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        email:req.body.email,
       // passwordAnterior:req.body.passwordAnterior,
        contraseña: bcryptjs.hashSync(req.body.passwordNueva, 10),   
        foto: req.file.filename
    }, {
        where:{
         id: userUpdateId
        }})     
    .catch(function(e){
    res.send(e)
    })  
    res.redirect('/');  
      
  },




 /*   console.log(usuarioAModificar)
      let idUser = usuarioAModificar.id;
      let userToEdit;
      console.log(idUser)
      let imagenPerfilABorrar;
  for (let u of usuarios){
    if(idUser==u.id){                 
      u.nombre= req.body.nombre,
      u.apellido= req.body.apellido,
      u.email= req.body.email
      let validacion;
      console.log(u.password)
      if (validacion = bcryptjs.compareSync(req.body.passwordAnterior, u.password)){
      u.password= bcryptjs.hashSync(req.body.passwordNueva,10)  
        if(req.file != undefined){
                  imagenPerfilABorrar= u.fotoPerfil;
                  u.fotoPerfil=req.file.filename
                  fs.unlinkSync(path.join(__dirname, '../../public/img/', imagePerfilABorrar));
              } else {
                  u.fotoPerfil=u.fotoPerfil                 
              }}
              break;
          }}    

      fs.writeFileSync(usuariosFilePath, JSON.stringify(usuarios, null, " ")),
      console.log(imagenPerfilABorrar)
      
                 
      res.redirect('/'); 
        },
*/
  procesarRegistro: (req,res) => {
    
      //let nombreImagen =req.file.filename;
          db.Clientes.create({            
          nombre: req.body.nombre,
          apellido: req.body.apellido,
          cuit: req.body.cuit,
          celular: req.body.celular,
          mail: req.body.email,
          foto: req.file.filename,
          contraseña: bcryptjs.hashSync(req.body.password, 10)          
      }) 
      .then(function(data){
          res.redirect('/')
      })
      .catch(function(e){
          res.send(e)
      })
      

    /*
    const resultValidation = validationResult(req);
    const lastUser = usuarios.length;
  
    if(resultValidation.isEmpty(){

      let userToCreate = {
        id: lastUser,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        email: req.body.email,
        password: bcryptjs.hashSync(req.body.password, 10),
        fotoPerfil: req.file.filename
      }
     
      usuarios.push(userToCreate);
      fs.writeFileSync(usuariosFilePath, JSON.stringify(usuarios, null, " "))
      return res.redirect      ("/");
    }

       /* if(resultValidation.errors.length > 0){
        return res.render("./users/registro", {
        errors: resultValidation.mapped(),
        oldData: req.body
    });  
}
    
*/},
   

/*
  registrarse: function(req, res, next){
    console.log (req);
    
    let usuario = {
      nombreDeUsuario = req.body.username,
      email = req.body.email,
      contrasena= bcrypt.hashSync(req.body.password, 10),
      
    }
  }
  */

/********************************* APIS ********************************************/

// MUESTRA TODOS LOS CLIENTES
clientesAPI: (req, res) => {

  db.Clientes.findAll(req.params.id)
      .then((clientes) =>{

          let listaClientes = [];

          for (cliente of clientes){

              let objaux={
                  nombre:  cliente.nombre,
                  apellido:  cliente.apellido,
                  mail: cliente.mail,
                  celular: cliente.celular,
                  cuit: cliente.cuit
              }

              listaClientes.push(objaux);
          }

          res.json({
              datosPedidos: "Listado de clientes",
              codigo: 200,
              data: listaClientes})
})
},

// MUESTRA CLIENTE PARTICULAR POR ID
  mostrar: (req, res) => {

    db.Clientes.findByPk(req.params.id)
        .then((cliente) =>{
            
            res.json({
                datosPedidos: "Cliente: ",
                codigo: 200,
                data: cliente})
        })
},
// MUESTRA ULTIMO  CLIENTE PARTICULAR 
ultimoClienteAPI: (req, res) => {

  db.Clientes.findAll(req.params.id)
      .then((clientes) =>{

          let listaClientes = [];

          for (cliente of clientes){

              let ultimoCliente={
                  id: cliente.id, 
                              
              }
              listaClientes.push(ultimoCliente);
          }
          let ultimoId = listaClientes.length;
          console.log(ultimoId)
          console.log(typeof(ultimoId))
          
      db.Clientes.findByPk(ultimoId)
          .then((ultimoCliente) =>{
              
              res.json({
                  datosPedidos: " Ultimo Cliente: ",
                  codigo: 200,
                  data: ultimoCliente})
          })


})
},



// CANTIDAD DE USUARIOS
count: (req, res) => {

  db.Clientes.findAll(req.params.id)
      .then((clientes) =>{

          let listaClientes = [];

          for (cliente of clientes){

              let objaux={
                  nombre:  cliente.nombre,
                  apellido:  cliente.apellido,
                  mail: cliente.mail,
                  celular: cliente.celular,
                  cuit: cliente.cuit
              }

              listaClientes.push(objaux);
          }

          res.json({
              datosPedidos: "Cantidad de usuarios registrados",
              codigo: 200,
              data: listaClientes.length})
})
},


//GUARDA CLIENTE NUEVO

guardarCliente: (req, res) => {

  db.Clientes.create(req.body)
     .then((cliente) =>{
            
         res.json({
             datosPedidos: "Cliente",
             codigo: 200,
             data: cliente})
    })
},

//BUSCA CLIENTE POR NOMBRE

buscar: (req, res) => {

  db.Clientes.findAll({
    where: {
      nombre: {[ Op.like ]: "%" + req.query.keyword + "%"}
    }
  })
     .then((clientes) =>{
       if(clientes.length > 0){
  
         res.json({
             datosPedidos: "Cliente",
             codigo: 200,
             data: clientes})
         } else {

          res.json("No existes clientes con ese nombre")
         }
    })
},





}

module.exports = userControlador;
     


     
        