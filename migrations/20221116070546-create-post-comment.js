'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('post-comment', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      comment: {
        type: Sequelize.STRING,
        allowNull: false
      },
      cmtdate: {
        type  :Sequelize.DATE ,
        allowNull: false
      },
      sender: { 
        type : Sequelize.INTEGER,
        references : { model : 'users' , primaryKey: 'id'}
      },
      post: { 
        type : Sequelize.INTEGER,
        references : { model : 'user-post' , primaryKey: 'id'}
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('post-comment');
  }
};