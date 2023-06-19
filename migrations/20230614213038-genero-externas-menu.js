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
    await queryInterface.addConstraint('Subitems', {
      fields: ['id_item'],
      type: 'foreign key',
      name: 'fk_Subitems_Items',
      references: {
        table: 'Items',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });

    await queryInterface.addConstraint('Items', {
      fields: ['id_menu'],
      type: 'foreign key',
      name: 'fk_Items_Menu',
      references: {
        table: 'Menus',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });

    await queryInterface.addConstraint('Accesos', {
      fields: ['id_menu'],
      type: 'foreign key',
      name: 'fk_Accesos_Menu',
      references: {
        table: 'Menus',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });

    await queryInterface.addConstraint('Accesos', {
      fields: ['id_item'],
      type: 'foreign key',
      name: 'fk_Accesos_Item',
      references: {
        table: 'Items',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });

    await queryInterface.addConstraint('Accesos', {
      fields: ['id_subitem'],
      type: 'foreign key',
      name: 'fk_Accesos_Subitem',
      references: {
        table: 'Subitems',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });

    await queryInterface.addConstraint('Accesos', {
      fields: ['id_usuario'],
      type: 'foreign key',
      name: 'fk_Accesos_Usuarios',
      references: {
        table: 'Usuarios',
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

    await queryInterface.removeConstraint('Subitems', 'fk_Subitems_Items');
    await queryInterface.removeConstraint('Items', 'fk_Items_Menu');
    await queryInterface.removeConstraint('Accesos', 'fk_Accesos_Menu');
    await queryInterface.removeConstraint('Accesos', 'fk_Accesos_Item');
    await queryInterface.removeConstraint('Accesos', 'fk_Accesos_Subitem');
    await queryInterface.removeConstraint('Accesos', 'fk_Accesos_Usuarios');

  }
};
