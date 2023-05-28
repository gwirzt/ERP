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
    await queryInterface.addConstraint('UnidadesNegocios', {
      fields: ['id_empresa'],
      type: 'foreign key',
      name: 'fk_unidades_negocios_empresas',
      references: {
        table: 'Empresas',
        field: 'id'
      }
    });

    await queryInterface.addConstraint('UnidadesNegocios', {
      fields: ['id_localidad'],
      type: 'foreign key',
      name: 'fk_unidades_negocios_localidades',
      references: {
        table: 'Localidades',
        field: 'id'
      }
    });

    await queryInterface.addConstraint('Localidades', {
      fields: ['id_provincia'],
      type: 'foreign key',
      name: 'fk_localidades_provincias',
      references: {
        table: 'Provincias',
        field: 'id'
      }
    });




  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeConstraint('UnidadesNegocios', 'fk_unidades_negocios_empresas');
    await queryInterface.removeConstraint('UnidadesNegociosLocalidades', 'fk_unidades_negocios_localidades_localidades');
    await queryInterface.removeConstraint('LocalisdadesProvincias', 'fk_localidades_provincias_provincias');


  }
};
