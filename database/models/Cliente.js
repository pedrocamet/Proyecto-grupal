function clienteData(sequelize, Datatypes){

    alias = "Cliente";

    cols = {
        id:{type: Datatypes.INTEGER, primaryKey: true, autoIncrement:true},
        nombre: {type: Datatypes.STRING(50)},
        apellido: {type: Datatypes.STRING(50)},
        fechaNacimiento: {type: Datatypes.DATE},
        cuit: {type: Datatypes.INTEGER},
        domicilio: {type: Datatypes.STRING(100)},
        celular: {type: Datatypes.INTEGER},
        mail: {type: Datatypes.STRING(100)}
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