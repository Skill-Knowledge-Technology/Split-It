'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Friendship', {
      requesterID: {
        type: DataTypes.INTEGER,
        allowNull: false
      },

      addresseeID: {
        type: DataTypes.INTEGER,
        allowNull: false
      },

      
    })
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
