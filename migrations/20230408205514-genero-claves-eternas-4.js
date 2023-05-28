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
      fields: ['id_localidad'],
      type: 'foreign key',
      name: 'fk_clientes_localidades',
      references: {
        table: 'Localidades',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });

    await queryInterface.addConstraint('Provedores', {
      fields: ['id_localidad'],
      type: 'foreign key',
      name: 'fk_provedores_localidades',
      references: {
        table: 'Localidades',
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
    await queryInterface.removeConstraint('Clientes', 'fk_clientes_localidades');
    await queryInterface.removeConstraint('Provedores', 'fk_provedores_localidades');
  }
};
