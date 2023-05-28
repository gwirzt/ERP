'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('CondicionesPagos', [
      { nombre: 'Contado', createdAt: new Date(), updatedAt: new Date() },
      { nombre: '30 días', createdAt: new Date(), updatedAt: new Date() },
      { nombre: '60 días', createdAt: new Date(), updatedAt: new Date() },
      { nombre: '90 días', createdAt: new Date(), updatedAt: new Date() },

    ], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('CondicionesPagos', null, {});
  }
};
