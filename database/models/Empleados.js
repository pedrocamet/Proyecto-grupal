function empleadosData(sequelize, Datatypes){

    alias = "Empleados";

    cols = {
        id: {type: Datatypes.INTEGER, primaryKey: true, autoIncrement:true},
        nombre: {type: Datatypes.STRING(50)},
        apellido: {type: Datatypes.STRING(50)},
        cargo: {type: Datatypes.STRING(50)},
        jerarquico: {type: Datatypes.STRING(50)},
        domicilio: {type: Datatypes.STRING(100)},
        celular: {type: Datatypes.INTEGER}
    };
    
    config = {timestamps:false};

    const empleados = sequelize.define(alias, cols, config);
    return empleados;
    
}

module.exports = empleadosData;