module.exports = function (sequelize, types) {
    return sequelize.define('EmpresasCentrosCostos', {
        id: { type: types.INTEGER, primaryKey: true, autoIncrement: true },
        id_empresa: { type: types.INTEGER, allowNull: false },
        id_centro_costo: { type: types.INTEGER, allowNull: false }
    });
}

