'use strict';

// migration for adding balance to User model

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn('Users', 'balance', Sequelize.DataTypes.DECIMAL(9, 2));
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn('Users', 'balance');
  }
};
