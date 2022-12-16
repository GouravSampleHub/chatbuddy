'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserPost extends Model {  
    static associate(models) {
      UserPost.hasMany(models.PostComment,{foreignKey:'post',as : 'comments'})
      UserPost.belongsTo(models.User,{foreignKey:'user',as : 'postBy'})
    }
  }
  UserPost.init({
    message: {
      type : DataTypes.STRING,
      allowNull: false
    },
    postfile: {
      type : DataTypes.STRING,
      allowNull: true
    },
    postdate: {
      type  :DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'UserPost',
    tableName: 'user-post'
  });
  return UserPost;
};