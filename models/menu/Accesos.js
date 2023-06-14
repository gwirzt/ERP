// const { Menu } = require('./Menu');
// const { Item } = require('./Item');
// const { Subitem } = require('./Subitem');
// const { Usuarios } = require('../../models/Usuarios');


module.exports = (sequelize, type) => {
    return sequelize.define('Accesos', {
        id: { type: type.INTEGER, primaryKey: true, autoIncrement: true },
        id_menu: type.INTEGER, references: { model: 'Menu', key: 'id' },
        id_item: type.INTEGER, references: { model: 'Item', key: 'id' },
        id_subitem: type.INTEGER, references: { model: 'Subitem', key: 'id' },
        idusuario: type.INTEGER, references: { model: 'Usuarios', key: 'id' },
        acceso: type.BOOLEAN,
    }

    );
};
