'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert("Transactions", [
      {
          userID: 1,
          date: new Date(),
          total: 50.20
      },
      {
          userID: 2,
          date: new Date(),
          total: 20.35
      },
      {
          userID: 3,
          date: new Date(),
          total: 100
      }
  ], { timestamps: true })

  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Transactions', null, {});
  }
};
