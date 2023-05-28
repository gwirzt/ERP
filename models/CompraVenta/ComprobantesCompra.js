module.exports = function (sequelize, types) {
    return sequelize.define('ComprobantesCompra', {
        id: { type: types.INTEGER, primaryKey: true, autoIncrement: true },
        id_proveedor: { type: types.INTEGER, allowNull: false },
        id_condicionPago: { type: types.INTEGER, allowNull: false },
        id_usuario: { type: types.INTEGER, allowNull: false },
        id_centroCosto: { type: types.INTEGER, allowNull: false },
        id_unidadNegocio: { type: types.INTEGER, allowNull: false },
        id_empresa: { type: types.INTEGER, allowNull: false },
        id_tipoComprobante: { type: types.INTEGER, allowNull: false }
    });
}
