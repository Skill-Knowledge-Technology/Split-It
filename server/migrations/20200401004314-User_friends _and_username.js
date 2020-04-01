'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    up: (queryInterface, Sequelize) => {
      queryInterface.addColumn('Users', 'friends', Sequelize.DataTypes.ARRAY(DataTypes.INTEGER));
    },
  },

  down: (queryInterface, Sequelize) => {
    down: (queryInterface, Sequelize) => {
      queryInterface.removeColumn('Users', 'friends');
    }
  }
};
