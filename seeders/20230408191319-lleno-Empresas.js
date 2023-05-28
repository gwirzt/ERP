'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Empresas', [
      {
        nombre: 'Empresa 1',
        direccion: 'Direccion 1',
        telefono: '123456789',
        email: 'pepito@gmail.com',
        cuit: '123456789',
        createdAt: new Date(),
        updatedAt: new Date()

      },
      {
        nombre: 'Empresa 2',
        direccion: 'Direccion 2',
        telefono: '123456789',
        email: 'pequeño@noeiste.com',
        cuit: '123456789',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Empresa 3',
        direccion: 'Direccion 3',
        telefono: '123456789',
        email: 'novine@lamaslinda.com',
        cuit: '123456789',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
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

