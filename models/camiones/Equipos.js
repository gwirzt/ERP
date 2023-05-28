module.exports = function (sequelize, types) {
    return sequelize.define('Equipos', {
        id: { type: types.INTEGER, primaryKey: true, autoIncrement: true },
        id_vehiculo_tractor: { type: types.INTEGER, allowNull: false },
        id_vehiculo_acoplado: { type: types.INTEGER, allowNull: false },
        id_chofer: { type: types.INTEGER, allowNull: false },
        activo: { type: types.BOOLEAN, allowNull: false, defaultValue: true }
    });
}

