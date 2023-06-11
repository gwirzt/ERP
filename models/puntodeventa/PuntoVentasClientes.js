module.exports = (sequelize, types) => {
    return sequelize.define('PuntoVentasClientes', {
        id: { type: types.INTEGER, primaryKey: true, autoIncrement: true },
        nombre: { type: types.STRING, allowNull: false },
        direccion: { type: types.STRING, allowNull: false },
        telefono: { type: types.STRING, allowNull: false },
        email: { type: types.STRING, allowNull: false },
        cuit: { type: types.BIGINT, allowNull: true },
        id_condicionIva: { type: types.INTEGER, allowNull: true },
        id_condicionPago: { type: types.INTEGER, allowNull: true },
        activo: { type: types.BOOLEAN, allowNull: false, defaultValue: true },
        id_localidad: { type: types.INTEGER, allowNull: true },
        token: { type: types.STRING(2048), allowNull: true },
    });
}
