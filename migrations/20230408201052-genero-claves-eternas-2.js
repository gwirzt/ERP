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
    await queryInterface.addConstraint('UnidadesNegociosCentrosCostos', {
      fields: ['id_centro_costo'],
      type: 'foreign key',
      name: 'fk_unidades_negocios_centros_costos_centros_costos',
      references: {
        table: 'CentrosCostos',
        field: 'id'
      }
    });
    await queryInterface.addConstraint('UnidadesNegociosCentrosCostos', {
      fields: ['id_unidad_negocio'],
      type: 'foreign key',
      name: 'fk_unidades_negocios_centros_costos_unidades_negocios',
      references: {
        table: 'UnidadesNegocios',
        field: 'id'
      }
    });
    await queryInterface.addConstraint('EmpresasCentrosCostos', {
      fields: ['id_centro_costo'],
      type: 'foreign key',
      name: 'fk_empresas_centros_costos_centros_costos',
      references: {
        table: 'CentrosCostos',
        field: 'id'
      }
    });
    await queryInterface.addConstraint('EmpresasCentrosCostos', {
      fields: ['id_empresa'],
      type: 'foreign key',
      name: 'fk_empresas_centros_costos_empresas',
      references: {
        table: 'Empresas',
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
    await queryInterface.removeConstraint('UnidadesnegociosCentrosCostos', 'fk_unidades_negocios_centros_costos_centros_costos');
    await queryInterface.removeConstraint('UnidadesNegociosCentrosCostos', 'fk_unidades_negocios_centros_costos_unidades_negocios');
    await queryInterface.removeConstraint('EmpresasCentrosCostos', 'fk_empresas_centros_costos_centros_costos');
    await queryInterface.removeConstraint('EmpresasCentrosCostos', 'fk_empresas_centros_costos_empresas');
  }
};
