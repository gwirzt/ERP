module.exports = (sequelize, type) => {
    return sequelize.define('Accesos',
        {
            id: { type: type.INTEGER, primaryKey: true, autoIncrement: true },
            id_menu: type.INTEGER,
            id_item: type.INTEGER,
            id_subitem: type.INTEGER,
            id_usuario: type.INTEGER,
            acceso: type.BOOLEAN,

        }


    );
};
