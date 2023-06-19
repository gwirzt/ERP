module.exports = (sequelize, type) => {
    return sequelize.define('Menus', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,

        },
        nombre: type.STRING,

    });
};






