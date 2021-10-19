function productosData(sequelize, Datatypes){

    alias = "Productos";

    cols = {
        id: {type: Datatypes.INTEGER, primaryKey: true, autoIncrement:true},
        marca: {type: Datatypes.STRING(100)},
        modelo: {type: Datatypes.STRING(100)},
        año: {type: Datatypes.STRING(4)},
        categoria: {type: Datatypes.STRING(100)},
        kmInicio: {type: Datatypes.INTEGER(11)},
        precioDia: {type: Datatypes.INTEGER(11)},
        fechaInicioDisp: {type: Datatypes.DATE},
        fechaFinDisp: {type: Datatypes.DATE},
        foto: {type: Datatypes.STRING(150)},
        descripcion: {type: Datatypes.STRING(300)},
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