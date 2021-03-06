'use strict'

var sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const Friendship = sequelize.define('Friendship', {
        // User sending friend request
        requesterID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'User',
                key: 'userID'
            }
        },

        // User receiving friend request
        addresseeID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'User',
                key: 'userID'
            }
        },

        // 0 = blocked, 1 = pending, 2 = friends
        friendshipStatus: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                customValidator(value) {
                    if (value !== 0 && value !== 1 && value !== 2) {
                        throw new Error("status must be 0,1,or 2");
                    }
                }
            }
        }
    },
        {
            freezeTableName: true,
        })

    return Friendship;
}