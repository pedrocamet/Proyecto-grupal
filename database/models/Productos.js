function productosData(sequelize, Datatypes){

    alias = "Productos";

    cols = {
        id: {type: Datatypes.INTEGER, primaryKey: true, autoIncrement:true},
        marca: {type: Datatypes.STRING(50)},
        modelo: {type: Datatypes.STRING(50)},
        año: {type: Datatypes.DATE},
        categoria: {type: Datatypes.STRING(50)},
        kmInicio: {type: Datatypes.INTEGER}
    };
    
    config = {timestamps:false};

    const productos = sequelize.define(alias, cols, config);
    return productos;
    
}

module.exports = productosData;