'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */await queryInterface.addConstraint('PuntoVentasClientesPagos', {
    fields: ['id_cliente'],
    type: 'foreign key',
    name: 'fk_PuntoVentasClientesPagos_PuntoVentasClientes',
    references: {
      table: 'PuntoVentasClientes',
      field: 'id'
    },
    onDelete: 'cascade',
    onUpdate: 'cascade'

  });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('PuntoVentasClientespagos', 'fk_PuntoVentasClientesPagos_PuntoVentasClientes');
  }
};
//# sourceMappingURL=20230611195801-add-foreign-keys-punto-de-venta.js.map
