'use strict';

var Sequelize = require('sequelize');
var bcrypt = require('bcrypt');

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
            as: 'transactions'
        });
    };

    // function to generate a hash of the password asynchronously with 8 rounds
    User.generateHash = function(password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
    };

    // function to compare password when signing in
    User.validPassword = function(password) {
        return bcrypt.compareSync(password, this.password);
    };

    return User;
}; 