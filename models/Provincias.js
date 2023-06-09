module.exports = function (sequelize, types) {
    return sequelize.define('Provincias', {
        id: { type: types.INTEGER, primaryKey: true, autoIncrement: true },
        nombre: {
            type: types.STRING, allowNull: false,
            get() {
                const rawValue = this.getDataValue('nombre');
                return rawValue ? rawValue.toUpperCase() : null;
            }
        }
    });
}

