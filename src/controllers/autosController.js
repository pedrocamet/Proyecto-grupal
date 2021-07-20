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

    producto: (req, res) => {
        res.render ("producto");
    },

}


module.exports = controlador;