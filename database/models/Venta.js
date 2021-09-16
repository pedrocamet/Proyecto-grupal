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

    venta.associate = function(models){
        venta.belongsTo(models.empleados, {
            as: "Empleados",
            foreignkey: "id_Empleados"
        })
    }
    venta.associate = function(models){
        venta.belongsTo(models.cliente, {
            as: "Cliente",
            foreignkey: "id_Cliente"
        })
    }
    venta.associate = function(models){
        venta.belongsTo(models.productos, {
            as: "Productos",
            foreignkey: "id_Productos"
        })
    }

    return venta;
    
}

module.exports = ventaData;