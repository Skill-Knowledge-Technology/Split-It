'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Friendship', {
      // User sending friend request
      requesterID: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false
      },

      // User receiving friend request
      addresseeID: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false
      },

      // Primary key of this table
      friendshipID: {
        type: (this.requesterID, this.addresseeID),
        primaryKey: true
      },

      // 0 = blocked, 1 = pending, 2 = friends
      friendshipStatus: {
        type: Sequelize.Datatypes.INTEGER,
        allowNull: false,
        validate: {
          equals: 0 || 1 || 2
        }
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Friendship');
  }
};
