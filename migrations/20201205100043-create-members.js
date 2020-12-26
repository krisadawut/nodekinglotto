'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Members', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      mpid: {
        type: Sequelize.STRING
      },
      mfname: {
        type: Sequelize.STRING
      },
      mlname: {
        type: Sequelize.STRING
      },
      musername: {
        type: Sequelize.STRING
      },
      mpsswd: {
        type: Sequelize.STRING
      },
      mstatus: {
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
    await queryInterface.dropTable('Members');
  }
};