module.exports = (sequelize, DataTypes) => {
    const EmpresaMedicinalaboral = sequelize.define('EmpresaMedicinalaboral', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, },
        nombre: DataTypes.STRING,
        direccion: DataTypes.STRING,
        telefono: DataTypes.STRING,
        email: DataTypes.STRING,
        cuit: DataTypes.STRING,
        fecha_alta: DataTypes.DATE,
        fecha_baja: DataTypes.DATE,
        observaciones: DataTypes.STRING,
    }, {
        tableName: 'EmpresaMedicinalaboral',
        timestamps: false,
    });

    return EmpresaMedicinalaboral;
}


