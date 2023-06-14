module.exports = (sequelize, type) => {
    return sequelize.define('Subitem', {
        id: { type: type.INTEGER, primaryKey: true, autoIncrement: true },
        detalle: type.STRING,
        direccion: type.STRING,
        references: { model: 'Item', key: 'id' }
    }

    );

};
