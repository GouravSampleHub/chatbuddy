'use strict';
const { Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {  
    static associate(models) 
    {
      User.hasMany(models.UserPost,{foreignKey:'user',as : 'posts'})
    }
  }
  User.init({
    name: {
      type : DataTypes.STRING,
      allowNull : false,
      validate:{
        notNull: {
          msg : "User Name Can Not Be Empty !"
        }
      } 
    },
    phone: {
      type : DataTypes.STRING,
      allowNull : true,
      unique : true,
      validate:{        
        len: {
          args : [10,10],
          msg : 'Incorrect Phone Number !'
        },
      }
    },
    email: {
      type : DataTypes.STRING,
      allowNull : false,
      unique : true,
      validate:{
        notNull: {
          msg : "User Email Can Not Be Empty !"
        }
      } 
    },
    password: {
      type : DataTypes.STRING,
      allowNull : false, 
      validate:{
        notNull: {
          msg : "User Password Can Not Be Empty !"          
        },
        len: {
          args : [5,10],
          msg : 'Password Must Between 5-10 Length !'
        },
      }     
    },
    gender: {
      type : DataTypes.STRING,
      allowNull : false,
      validate:{
        notNull: {
          msg : "User Gender Can Not Be Empty !"
        }
      } 
    },
    image: {
      type : DataTypes.STRING,
      allowNull : true
    },
    isactive:{
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    otp:{
      type: DataTypes.INTEGER,
      allowNull :false
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName : 'users'
  });
  return User;
};