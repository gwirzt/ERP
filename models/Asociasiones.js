// sequelize
const { sequelize } = require('../db');
const { Sequelize } = require('sequelize');

const MenuModel = require('./menu/Menu');
const ItemModel = require('./menu/Item');
const AccesosModel = require('./menu/Acceso');
const UsuarioModel = require('./Usuarios');

const EmpresamedicinaLaboralModel = require('./Empleados/EmpresaMedicinalaboral');
const EmpleadosModel = require('./Empleados/Empleado');

const Menu = MenuModel(sequelize, Sequelize);
const Item = ItemModel(sequelize, Sequelize);
const Accesos = AccesosModel(sequelize, Sequelize);
const Usuario = UsuarioModel(sequelize, Sequelize);

const EmpresamedicinaLaboral = EmpresamedicinaLaboralModel(sequelize, Sequelize);
const Empleados = EmpleadosModel(sequelize, Sequelize);


Menu.hasMany(Item, { foreignKey: 'id_menu' });
Item.belongsTo(Menu, { foreignKey: 'id_menu' });

Usuario.hasMany(Accesos, { foreignKey: 'id_usuario' });
Accesos.belongsTo(Usuario, { foreignKey: 'id_usuario' });

Menu.hasMany(Accesos, { foreignKey: 'id_menu' });
Accesos.belongsTo(Menu, { foreignKey: 'id_menu' });

