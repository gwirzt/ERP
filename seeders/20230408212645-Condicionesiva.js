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
    await queryInterface.bulkInsert('CondicionesIvas', [
      { nombre: 'Responsable Inscripto', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Monotributista', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Consumidor Final', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Exento', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'No Categorizado', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'No Responsable', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Sujeto no Categorizado', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Proveedor del Exterior', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Cliente del Exterior', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'IVA Liberado - Ley Nº 19.640', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'IVA Responsable Inscripto - Agente de Percepción', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Pequeño Contribuyente Eventual', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Monotributista Social', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Pequeño Contribuyente Eventual Social', createdAt: new Date(), updatedAt: new Date() }
    ], {});


  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('CondicionesIvas', null, {});
  }
};
