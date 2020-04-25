'use strict';

var Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const Transaction = sequelize.define("Transaction", {
        transactionID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        total: {
            // int with 2 decimal places
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        participants: {
            type: DataTypes.ARRAY(DataTypes.INTEGER)
        },

        ownerID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'User',
                key: 'userID'
            }
        },
    },
        {
            freezeTableName: true,
        });

    Transaction.associate = function (models) {
        Transaction.belongsTo(models.User, {
            as: 'owner',
            foreignKey: 'ownerID'
        });
    };

    return Transaction;
} 