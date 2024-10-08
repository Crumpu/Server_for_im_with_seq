'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("item_orders", {
      item_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "items",
          key: "id",
        },
        onDelete: 'CASCADE', 
        onUpdate: 'CASCADE',
      },
      order_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "orders",
          key: "id",
        },
        onDelete: 'CASCADE', 
        onUpdate: 'CASCADE',
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("item_orders");
  }
};