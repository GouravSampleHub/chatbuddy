'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PostComment extends Model {  
    static associate(models) {
      PostComment.belongsTo(models.User,{foreignKey:'sender',as : 'commentBy'})
    }
  }
  PostComment.init({
    comment: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cmtdate: {
      type  :DataTypes.DATE ,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'PostComment',
    tableName: 'post-comment'
  });
  return PostComment;
};