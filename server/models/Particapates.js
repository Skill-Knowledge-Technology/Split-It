'use strict'

var sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const Participates = sequelize.define('Participates', {
        transactionID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'Transaction',
                key: 'transactionID'
            }
        },

        participantID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'User',
                key: 'userID'
            }
        },

        // how much this user owes in this transaction
        participantTotal: {
            type: DataTypes.DECIMAL(9, 2),
            allowNull: false,
            defaultValue: 0
        }, 

        // has the user paid their share yet?
        isPaid: {
            type: DataTypes.BOOLEAN,
            default: false,
            allowNull: false
        }
    },
    {
        freezeTableName: true
    })

    return Participates;
}