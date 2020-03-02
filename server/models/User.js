'use strict';

var Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        userID: {
            type: DataTypes.INTEGER,
            defaultValue: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name : {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isAlphanumeric: true
            }
        }, 
        email : {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        password : {
            type: DataTypes.STRING,
            allowNull: false
        }
    })

    User.associate = function(models) {
        User.hasMany(models.Transaction, {
            as: 'Transaction'
        });
    };

    return User;
}; 