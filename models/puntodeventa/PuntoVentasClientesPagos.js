module.exports = function (sequelize, types) {
    return sequelize.define('PuntoVentasClientesPagos', {
        id: { type: types.INTEGER, primaryKey: true, autoIncrement: true },
        id_cliente: { type: types.INTEGER, allowNull: false },
        fecha_pago: { type: types.DATE, allowNull: false },
        importe_pesos: { type: types.DECIMAL(10, 2), allowNull: false },
        importe_dolares: { type: types.DECIMAL(10, 2), allowNull: false },
        fecha_desde: { type: types.DATE, allowNull: false },
        fecha_hasta: { type: types.DATE, allowNull: false },
        cantidad_licencias: { type: types.INTEGER, allowNull: false }
    });
}
