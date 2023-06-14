
module.exports = (sequelize, type) => {
    return sequelize.define('Item', {
        id: { type: type.INTEGER, primaryKey: true, autoIncrement: true },
        detalle: type.STRING,
        direccion: type.STRING,
        references: { model: 'Menu', key: 'id' }
    }
    );
};

