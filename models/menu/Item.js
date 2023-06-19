
module.exports = (sequelize, type) => {
    return sequelize.define('Items', {
        id: { type: type.INTEGER, primaryKey: true, autoIncrement: true, },
        id_menu: type.INTEGER,
        nombre: type.STRING,
        accion: type.STRING,

    });
};

