module.exports = function (sequelize, types) {
    return sequelize.define('UnidadesNegocios', {
        id: { type: types.INTEGER, primaryKey: true, autoIncrement: true },
        id_empresa: { type: types.INTEGER, allowNull: false },
        nombre: { type: types.STRING, allowNull: false },
        direccion: { type: types.STRING, allowNull: false },
        telefono: { type: types.STRING, allowNull: false },
        id_localidad: { type: types.INTEGER, allowNull: false }
    });
}
