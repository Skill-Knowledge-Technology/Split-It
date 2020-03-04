'use strict';

var Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const Transaction = sequelize.define("Transaction", {
        transactionID: {
            type: DataTypes.INTEGER,
            defaultValue: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        total: {
            // int with 2 decimal places
            type: DataTypes.DECIMAL(10,2),
            allowNull: false
        },
    });

    Transaction.associate = function(models) {
        Transaction.belongsTo(models.User, {
            as: 'createdBy',
            foreignKey: 'userID'
        });
    };

    return Transaction;
} 