'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
      Example:
      */
      return queryInterface.createTable('Users', {
        userID: {
          type: Sequelize.DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
      },
      name : {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
          validate: {
              isAlphanumeric: true
          }
      }, 
      email : {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
          validate: {
              isEmail: true
          }
      },
      password : {
          type: Sequelize.DataTypes.STRING,
          allowNull: false
      }, 
      createdAt : {
        allowNull : false,
        type: Sequelize.DataTypes.DATE
      },
      updatedAt : {
        allowNull: false,
        type: Sequelize.DataTypes.DATE
      },
         });
  },
  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.
      Example:
      */
      return queryInterface.dropTable('Users');
    
  }
};