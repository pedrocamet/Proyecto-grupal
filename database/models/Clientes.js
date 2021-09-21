function clienteData(sequelize, Datatypes){

    alias = "Clientes";

    cols = {
        id:{type: Datatypes.INTEGER, primaryKey: true, autoIncrement:true},
        nombre: {type: Datatypes.STRING(100)},
        apellido: {type: Datatypes.STRING(100)},
        nacimiento: {type: Datatypes.DATE},
        cuit: {type: Datatypes.STRING(50)},
        domicilio: {type: Datatypes.STRING(100)},
        celular: {type: Datatypes.STRING(50)},
        mail: {type: Datatypes.STRING(100)},
        foto: {type: Datatypes.STRING(150)}
    };
    
    config = {timestamps:false};

    const cliente = sequelize.define(alias, cols, config);
    /*
    cliente.associate = function(models){
        cliente.hasMany(models.venta, {
            as: "Venta",
            foreignKey: "id_Cliente"
        })
    }
    */
    return cliente;
    
}

module.exports = clienteData;