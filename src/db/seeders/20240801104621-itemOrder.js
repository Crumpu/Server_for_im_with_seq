"use strict";
const path = require("path");
const itemOrderPath = path.resolve("src", "constants");
const { item_order } = require(itemOrderPath);


module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("item_orders", item_order, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("item_orders", null, {});
  },
};
