const Sequelize = require('sequelize');
require('dotenv').config();


const { Menu, Item, Accesos, Usuario } = require('../db');

const Menus = async () => {
    try {
        console.log('Consultando los menus');

        const todosMenus = await Menu.findAll({ include: Item });

        const menuData = todosMenus.map(menu => {
            const menuObject = {
                id: menu.dataValues.id,
                nombre: menu.dataValues.nombre,
                Items: menu.Items.map(item => ({
                    id: item.dataValues.id,
                    nombre: item.dataValues.nombre,
                    accion: item.dataValues.accion
                }))
            }

            return menuObject;
        });


        console.log(JSON.stringify(menuData, null, 2));
    } catch (error) {
        console.error('Error al consultar los menús:', error);
    }
}

// ahora los accesos con el id del Usuario
const buscaAccesos = async (idUsuario) => {
    try {
        const todosAccesos = await Accesos.findAll({ where: { id_usuario: idUsuario } });
        const accesosData = todosAccesos.map(acceso => {
            const accesoObject = {
                id: acceso.dataValues.id,
                id_usuario: acceso.dataValues.id_usuario,
                id_menu: acceso.dataValues.id_menu,
            }
            return accesoObject;
        });
        console.log(JSON.stringify(accesosData, null, 2));
    } catch (error) {
        console.error('Error al consultar los accesos:', error);
    }
}


const creaMenu = async (idUsuario) => {
    try {
        const result = await Accesos.findAll({
            where: { id_usuario: idUsuario },
            attributes: ['id'],
            include: [
                {
                    model: Menu,
                    as: 'Menu',
                    attributes: ['nombre'],
                    include: {
                        model: Item,
                        as: 'Items',
                        attributes: ['nombre', 'accion'],
                    }
                }
            ]
        });

        const mappedResult = result.map(acceso => ({
            id: acceso.id,
            menu: acceso.Menu.nombre,
            items: acceso.Menu.Items.map(item => item)
        }));

        return JSON.stringify(mappedResult, null, 2);
    } catch (error) {
        console.error('Error al consultar los datos:', error);
    }
}

// Menus();
buscoAcceso2(1);




