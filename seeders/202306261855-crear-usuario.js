'use strict';
const bcrypt = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('Usuarios', [
            {
                username: 'gwirzt',
                password: bcrypt.hashSync('12345', 10),
                email: 'gwirzt@gmail.com',
            },
            {
                username: 'psormani',
                password: bcrypt.hashSync('12345', 10),
                email: 'patriciasormani@hotmail.com',
            },
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

