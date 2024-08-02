"use strict";
const path = require("path");
const categoryPath = path.resolve("src", "constants");
const { item_category } = require(categoryPath);

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("item_categories", item_category, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("item_categories", null, {});
  },
};
