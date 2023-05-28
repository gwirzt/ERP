module.exports = function (sequelize, types) {
    return sequelize.define('Empresas', {
        id: { type: types.INTEGER, primaryKey: true, autoIncrement: true },
        nombre: { type: types.STRING, allowNull: false },
        direccion: { type: types.STRING, allowNull: false },
        telefono: { type: types.STRING, allowNull: false },
        email: { type: types.STRING, allowNull: false },
        cuit: { type: types.BIGINT, allowNull: false }
    });



}

