module.exports = (sequelize, type) => {
    return sequelize.define('Subitems', {
        id: { type: type.INTEGER, primaryKey: true, autoIncrement: true },
        id_item: { type: type.INTEGER, allowNull: false },
        nombre: type.STRING,
        accion: type.STRING,


    });

};
