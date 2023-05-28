module.exports = function (sequelize, types) {
    return sequelize.define('UnidadesNegociosCentrosCostos', {
        id: { type: types.INTEGER, primaryKey: true, autoIncrement: true },
        id_unidad_negocio: { type: types.INTEGER, allowNull: false },
        id_centro_costo: { type: types.INTEGER, allowNull: false }
    });
}
