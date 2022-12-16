'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user-post', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      message: {
        type : Sequelize.STRING,
        allowNull: false
      },
      postfile: {
        type : Sequelize.STRING,
        allowNull: true
      },
      postdate: {
        type  :Sequelize.DATE,
        allowNull: false
      },
      user: { 
        type : Sequelize.INTEGER,
        references : { model : 'users' , primaryKey: 'id'}
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
    await queryInterface.dropTable('user-post');
  }
};