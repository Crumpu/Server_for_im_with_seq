"use strict";
const path = require("path");
const orderPath = path.resolve("src", "constants");
const { orders } = require(orderPath);

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("orders", orders, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("orders", null, {});
  },
};
