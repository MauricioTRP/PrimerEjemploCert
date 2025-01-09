'use strict';
const {
  Model
} = require('sequelize');

const argon2 = require('argon2')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    // toJSON() {
    //   const user = this.dataValues;
    //   delete user.password;

    //   return user;
    // }
    static associate(models) {
      // define association here
    }
  }
  User.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
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
      allowNull: false,
      validate: {
        min: 6
      }
    },
    role: { 
      type: DataTypes.ENUM('skater', 'admin'),
      defaultValue: 'skater'
    }

  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeSave: async (user, options) => {
        console.log("changing password")
        if(user.changed('password')) {
          user.password = await argon2.hash(user.password)
        }
      }
      // beforeBulkUpdate: async user => {
      //   if(user.changed('password')) {
      //     user.password = await argon2.hash(user.password)
      //   }
      // }
    },
    paranoid: true
  });
  return User;
};