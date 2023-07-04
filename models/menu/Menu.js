// creamo el modelo de menu
module.exports = (sequelize, DataTypes) => {
    const Menu = sequelize.define('Menu', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, },
        nombre: DataTypes.STRING,
        accion: DataTypes.STRING,
    }, {
        tableName: 'Menus',
        timestamps: false,
    });


    return Menu;
}



