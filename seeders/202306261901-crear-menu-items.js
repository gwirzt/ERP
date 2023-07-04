'use strict';






/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('Menus', [
            {
                nombre: 'Administracion',
                accion: ''
            },
            {
                nombre: 'Ventas',
                accion: ''
            }, {
                nombre: 'Compras',
                accion: ''
            }
        ], {});

        await queryInterface.bulkInsert('Items', [
            {
                id_menu: 1,
                nombre: 'Usuarios',
                accion: 'usuarios',
            },
            {
                id_menu: 1,
                nombre: 'Empresas',
                accion: 'empresas',
            },
            {
                id_menu: 1,
                nombre: 'Clientes',
                accion: 'clientes',
            },
            {
                id_menu: 1,
                nombre: 'Proveedores',
                accion: 'proveedores',
            },
            {
                id_menu: 2,
                nombre: 'Emision Facturas',
                accion: 'emitefacturas',
            },
            {
                id_menu: 2,
                nombre: 'Emision Notas de Credito',
                accion: 'emitenotascredito',
            },
            {
                id_menu: 2,
                nombre: 'Emision Notas de Debito',
                accion: 'emitenotasdebito',
            },
            {
                id_menu: 2,
                nombre: 'Emision Recibos',
                accion: 'emiterecibos',
            },
            {
                id_menu: 3,
                nombre: 'Emision Ordenes de Compra',
                accion: 'emiteordenescompra',
            },
            {
                id_menu: 3,
                nombre: 'Ingreso Facturas Compras',
                accion: 'ingresofacturascompras',
            }
        ], {});




    },


    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete('Empresas', null, {});
    }
};
