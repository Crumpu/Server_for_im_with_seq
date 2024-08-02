"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("items", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      categ_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "item_categories",
          key: "id",
        },
      },
      type_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "item_types",
          key: "id",
        },
      },
      brand_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "brands",
          key: "id",
        },
      },
      model_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "models",
          key: "id",
        },
      },
      price: {
        type: Sequelize.DECIMAL(10, 2),
      },
      store_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "stores",
          key: "id",
        },
      },
      amount: {
        type: Sequelize.DECIMAL(10, 0),
      },
      created_at: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("items");
  },
};
