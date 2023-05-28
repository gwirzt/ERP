module.exports = function (sequelize, types) {
    return sequelize.define('TipoComprobantes', {
        id: { type: types.INTEGER, primaryKey: true, autoIncrement: true },
        nombre: { type: types.STRING, allowNull: false }

    });
}
