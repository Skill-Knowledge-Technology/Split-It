'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert("Transactions", [
      {
          transactionID: 1,
          userID: 1,
          date: new Date(),
          total: 50.20
      },
      {
        transactionID: 2,
          userID: 2,
          date: new Date(),
          total: 20.35
      },
      { 
          transactionID: 3,
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
