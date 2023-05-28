'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addConstraint('Clientes', {
      fields: ['id_condicionPago'],
      type: 'foreign key',
      name: 'fk_cliente_condicionPago',
      references: {
        table: 'CondicionesPagos',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
    await queryInterface.addConstraint('Provedores', {
      fields: ['id_condicionPago'],
      type: 'foreign key',
      name: 'fk_provedor_condicionPago',
      references: {
        table: 'CondicionesPagos',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });

    await queryInterface.addConstraint('Clientes', {
      fields: ['id_condicionIva'],
      type: 'foreign key',
      name: 'fk_cliente_condicionIva',
      references: {
        table: 'CondicionesIvas',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
    await queryInterface.addConstraint('Provedores', {
      fields: ['id_condicionIva'],
      type: 'foreign key',
      name: 'fk_provedor_condicionIva',
      references: {
        table: 'CondicionesIvas',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });




  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeConstraint('Clientes', 'fk_cliente_condicionPago');
    await queryInterface.removeConstraint('Provedores', 'fk_provedor_condicionPago');
    await queryInterface.removeConstraint('Clientes', 'fk_cliente_condicionIva');
    await queryInterface.removeConstraint('Provedores', 'fk_provedor_condicionIva');


  }
};
