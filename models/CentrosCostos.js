module.exports = function (sequelize, types) {
    return sequelize.define('CentrosCostos', {
        id: { type: types.INTEGER, primaryKey: true, autoIncrement: true },
        nombre: { type: types.STRING, allowNull: false }

    });
}
