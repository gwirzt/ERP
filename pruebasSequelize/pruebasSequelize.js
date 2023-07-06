const Sequelize = require('sequelize');
require('dotenv').config();




const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_ADDRESS,
    dialect: 'mysql'
});

const MenuModel = require('../models/menu/Menu');
const ItemModel = require('../models/menu/Item');
const AccesosModel = require('../models/menu/Acceso');
const Menu = MenuModel(sequelize, Sequelize);
const Item = ItemModel(sequelize, Sequelize);
const Accesos = AccesosModel(sequelize, Sequelize);


async function run() {


    try {
        await sequelize.authenticate();
        console.log('Conexión exitosa');


        // Consultar los menus
        const todosMenus = await Menu.findAll();
        const menusJSON = todosMenus.map(menu => menu.toJSON());
        console.log(menusJSON);


    } catch (error) {
        console.error('Error al conectar:', error);
    }
}

const syncTablesForceTrue = async () => {
    try {
        await Menu.sync({ force: true, logging: false });
        await Item.sync({ force: true, logging: false });
        await Accesos.sync({ force: true, logging: false });
        console.log('Tablas sincronizadas con force: true');
    } catch (error) {
        console.error('Error al sincronizar tablas con force: true:', error);
    }
};



const llenarTablas = async () => {
    await Menu.create({
        nombre: 'Administracion',
        accion: ''
    });
    await Menu.create({
        nombre: 'Ventas',
        accion: ''
    });
    await Menu.create({
        nombre: 'Compras',
        accion: ''
    });

    // ahora los items

    await Item.create({
        id_menu: 1,
        nombre: 'Usuarios',
        accion: 'usuarios',
    });
    await Item.create({
        id_menu: 1,
        nombre: 'Empresas',
        accion: 'empresas',
    });
    await Item.create({
        id_menu: 1,
        nombre: 'Clientes',
        accion: 'clientes',
    });
    await Item.create({
        id_menu: 1,
        nombre: 'Proveedores',
        accion: 'proveedores',
    });
    await Item.create({
        id_menu: 2,
        nombre: 'Emision Facturas',
        accion: 'emitefacturas',
    });
    await Item.create({
        id_menu: 2,
        nombre: 'Emision Notas de Credito',
        accion: 'emitenotascredito',
    });

    await Item.create({
        id_menu: 2,
        nombre: 'Emision Notas de Debito',
        accion: 'emitenotasdebito',
    });

    await Item.create({
        id_menu: 2,
        nombre: 'Emision Recibos',
        accion: 'emiterecibos',
    });

    await Item.create({
        id_menu: 3,
        nombre: 'Emision Ordenes de Compra',
        accion: 'emiteordenescompra',
    });

    await Item.create({
        id_menu: 3,
        nombre: 'Ingreso Facturas Compras',
        accion: 'ingresofacturascompras',
    });


};


// syncTablesForceTrue();

// llenarTablas();

run();

