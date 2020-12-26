'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ottotats', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      lsid: {
        type: Sequelize.STRING
      },
      lsdesc: {
        type: Sequelize.STRING
      },
      ltid: {
        type: Sequelize.STRING
      },
      prid: {
        type: Sequelize.STRING
      },
      lsstatus: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('ottotats');
  }
};