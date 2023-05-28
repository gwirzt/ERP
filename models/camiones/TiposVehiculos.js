module.exports = function (sequelize, types) {
    return sequelize.define('TiposVehiculos', {
        id: { type: types.INTEGER, primaryKey: true, autoIncrement: true },
        descripcion: { type: types.STRING, allowNull: false }
    });
};
