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

      // 0 = blocked, 1 = pending, 2 = friends
      friendshipStatus: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        validate: {
          equals: 0 || 1 || 2
        }
      }
    })
      .then(() => {
        return queryInterface.addConstraint('Friendship', ['requesterID', 'addresseeID'], {
          type: 'primary key',
          name: 'friendshipPK'
        });
      });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Friendship');
  }
};
