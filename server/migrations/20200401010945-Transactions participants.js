'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn('Transactions', 'participants', Sequelize.DataTypes.ARRAY(DataTypes.INTEGER));
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn('Transactions', 'participants');
  }
};
