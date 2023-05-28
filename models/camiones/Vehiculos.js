module.exports = function (sequelize, types) {
    return sequelize.define('Vehiculos', {
        id: { type: types.INTEGER, primaryKey: true, autoIncrement: true },
        patente: { type: types.STRING, allowNull: false },
        marca: { type: types.STRING, allowNull: false },
        modelo: { type: types.STRING, allowNull: false },
        id_tipoVehiculo: { type: types.INTEGER, allowNull: false },
        anio: { type: types.INTEGER, allowNull: false },
        activo: { type: types.BOOLEAN, allowNull: false, defaultValue: true }
    });
}
