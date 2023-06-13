
module.exports = function (sequelize, types) {
    return sequelize.define('Localidades', {
        id: { type: types.INTEGER, primaryKey: true, autoIncrement: true },
        nombre: { type: types.STRING, allowNull: false },
        id_provincia: { type: types.INTEGER, allowNull: false },
        longitud: { type: types.DECIMAL(10, 8), allowNull: true },
        latitud: { type: types.DECIMAL(10, 8), allowNull: true }
    });
}

