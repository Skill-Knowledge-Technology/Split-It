'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn('Users', 'friends', Sequelize.DataTypes.ARRAY(DataTypes.INTEGER));
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn('Users', 'friends');
  }
};
