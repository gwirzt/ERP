module.exports = (sequelize, type) => {
    return sequelize.define('Menu', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,

        },
        detalle: type.STRING,
        direccion: type.STRING,
    });
};






