'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Transactions', {
      transactionID: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoincrement: true
      },
      userID: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false
      },
      date: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false
    },
    total: {
        // int with 2 decimal places
        type: Sequelize.DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Transactions');
  }
};