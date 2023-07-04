// creamo el modelo de item
module.exports = (sequelize, DataTypes) => {
    const Item = sequelize.define('Item', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, },
        id_menu: {
            type: DataTypes.INTEGER, allowNull: false, //references: { model: Menu.tableName, key: 'id' },
        },
        nombre: DataTypes.STRING,
        accion: DataTypes.STRING,
    }, {
        tableName: 'Items',
        timestamps: false,
    });



    return Item;

}
