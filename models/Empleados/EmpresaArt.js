// Modelos de Emrpes ART

module.exports = function (sequelize, DataTypes) {
    var EmpresaArt = sequelize.define('EmpresaArt', {
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
        tableName: 'EmpresaArt',
        timestamps: false,
    });

    return EmpresaArt;
}
