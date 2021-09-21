function productosData(sequelize, Datatypes){

    alias = "Productos";

    cols = {
        id: {type: Datatypes.INTEGER, primaryKey: true, autoIncrement:true},
        marca: {type: Datatypes.STRING(100)},
        modelo: {type: Datatypes.STRING(100)},
        año: {type: Datatypes.DATE},
        categoria: {type: Datatypes.STRING(100)},
        kmInicio: {type: Datatypes.INTEGER},
        precioDia: {type: Datatypes.INTEGER},
        fechaInicioDisp: {type: Datatypes.DATE},
        fechaFinDisp: {type: Datatypes.DATE}
    };
    
    config = {timestamps:false};

    const productos = sequelize.define(alias, cols, config);
    /*
    productos.associate = function(models){
        productos.belongsTo(models.venta, {
            as: "Venta",
            foreignKey: "id_Productos"
        })
    }
    
    */
    return productos;
    
}

module.exports = productosData;