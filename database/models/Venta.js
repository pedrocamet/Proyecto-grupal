function ventaData(sequelize, Datatypes){

    alias = "Venta";

    cols = {
        id: {type: Datatypes.INTEGER, primaryKey: true, autoIncrement:true},
        montoTotalFinal: {type: Datatypes.INTEGER},
        cantDias: {type: Datatypes.INTEGER},

        /*
        remito: {type: Datatypes.STRING(50)},
        factura: {type: Datatypes.STRING(50)},
        id_empleados
        id_cliente
        id_productos

        */
    };
    
    config = {timestamps:false};

    const venta = sequelize.define(alias, cols, config);
    return venta;
    
}

module.exports = ventaData;