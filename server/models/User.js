'use strict';

var Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        userID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isAlphanumeric: true
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        balance: {
            // integer type with 9 digits, 2 of them being in decimal part
            type: DataTypes.DECIMAL(9, 2),
            allowNull: false,
            defaultValue: 0
        }
    },
        {
            freezeTableName: true,
        });

    User.associate = function (models) {
        User.hasMany(models.Transaction, {
            as: 'transactions',
            foreignKey: 'ownerID'
        });
    };

    return User;
}; 