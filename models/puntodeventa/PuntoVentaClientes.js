module.exports = function (sequelize, types) {
    return sequelize.define('PuntoVentasClientes', {
        id: { type: types.INTEGER, primaryKey: true, autoIncrement: true },
        nombre: { type: types.STRING, allowNull: false },
        direccion: { type: types.STRING, allowNull: false },
        telefono: { type: types.STRING, allowNull: false },
        email: { type: types.STRING, allowNull: false },
        cuit: { type: types.BIGINT, allowNull: false },
        id_condicionIva: { type: types.INTEGER, allowNull: false },
        id_condicionPago: { type: types.INTEGER, allowNull: false },
        activo: { type: types.BOOLEAN, allowNull: false, defaultValue: true },
        id_localidad: { type: types.INTEGER, allowNull: false },
        token: { type: types.STRING(2048), allowNull: false },
    });
}
