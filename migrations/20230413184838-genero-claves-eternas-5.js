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
    await queryInterface.addConstraint('Choferes', {
      fields: ['id_localidad'],
      type: 'foreign key',
      name: 'fk_chofer_localidad',
      references: {
        table: 'Localidades',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });

    await queryInterface.addConstraint('Vehiculos', {
      fields: ['id_tipoVehiculo'],
      type: 'foreign key',
      name: 'fk_vehiculo_tipo_vehiculo',
      references: {
        table: 'TiposVehiculos',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });

    await queryInterface.addConstraint('Equipos', {
      fields: ['id_vehiculo_tractor'],
      type: 'foreign key',
      name: 'fk_equipo_vehiculo_tractor',
      references: {
        table: 'Vehiculos',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
    await queryInterface.addConstraint('Equipos', {
      fields: ['id_vehiculo_acoplado'],
      type: 'foreign key',
      name: 'fk_equipo_vehiculo_acoplado',
      references: {
        table: 'Vehiculos',
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
    await queryInterface.removeConstraint('Choferes', 'fk_chofer_localidad');
    await queryInterface.removeConstraint('Vehiculos', 'fk_vehiculo_tipo_vehiculo');
    await queryInterface.removeConstraint('Equipos', 'fk_equipo_vehiculo_tractor');
    await queryInterface.removeConstraint('Equipos', 'fk_equipo_vehiculo_acoplado');

  }
};
