module.exports = function (sequelize, types) {
    return sequelize.define('CondicionesIva', {
        id: { type: types.INTEGER, primaryKey: true, autoIncrement: true },
        nombre: { type: types.STRING, allowNull: false },
        activo: { type: types.BOOLEAN, allowNull: false, defaultValue: true },
        alicuota: { type: types.INTEGER, allowNull: false }
    }
    );


};

