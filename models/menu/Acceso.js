// creamo el modelo de Accesos
module.exports = (sequelize, DataTypes) => {
    const Accesos = sequelize.define('Accesos', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, },
        id_usuario: {
            type: DataTypes.INTEGER, allowNull: false, //references: { model: Usuario.tableName, key: 'id' },
        },
        id_menu: {
            type: DataTypes.INTEGER, allowNull: false, //references: { model: Item.tableName, key: 'id' },
        },
    }, {
        tableName: 'Accesos',
        timestamps: false,
    });


    return Accesos;

}

