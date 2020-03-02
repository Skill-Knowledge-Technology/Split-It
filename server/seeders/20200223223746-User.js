'use strict';
var Sequelize = require('sequelize');
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert("Users", [
            {
                name: "User 1",
                email: "user1@mail.com",
                password: "pass1",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: "User 2",
                email: "user2@mail.com",
                password: "pass2",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: "User 3",
                email: "user3@mail.com",
                password: "pass3",
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ], { timestamps: true })
    },

    down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Users', null, {})
    }
}; 