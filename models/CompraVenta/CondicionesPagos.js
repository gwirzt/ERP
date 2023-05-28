module.exports = function (sequelize, types) {
    return sequelize.define('CondicionesPagos', {
        id: { type: types.INTEGER, primaryKey: true, autoIncrement: true },
        nombre: { type: types.STRING, allowNull: false },
        cantidadDias: { type: types.INTEGER, allowNull: false },
        activo: { type: types.BOOLEAN, allowNull: false, defaultValue: true },
        fechaAlta: { type: types.DATE, allowNull: false, defaultValue: types.NOW },
        fechaBaja: { type: types.DATE, allowNull: true, defaultValue: null }
    });
}
