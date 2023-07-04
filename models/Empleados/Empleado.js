// Creo el modelo de Empleado

module.exports = (sequelize, DataTypes) => {
    const Empleado = sequelize.define('Empleado', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, },
        id_empresa: DataTypes.INTEGER,
        nombre: DataTypes.STRING,
        apellido: DataTypes.STRING,
        dni: DataTypes.STRING,
        cuil: DataTypes.STRING,
        fecha_nacimiento: DataTypes.DATE,
        fecha_ingreso: DataTypes.DATE,
        fecha_egreso: DataTypes.DATE,
        telefono: DataTypes.STRING,
        email: DataTypes.STRING,
        direccion: DataTypes.STRING,
        talle_remera: DataTypes.STRING,
        talle_pantalon: DataTypes.STRING,
        talle_calzado: DataTypes.STRING,
        preocupacional_fecha: DataTypes.DATE,
        preocupacional_id: DataTypes.INTEGER,
        art_id: DataTypes.INTEGER,
        art_alta: DataTypes.DATE,
    }, {
        tableName: 'Empleados',
        timestamps: false,
    });


    return Empleado;
}


