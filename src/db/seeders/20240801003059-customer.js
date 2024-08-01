"use strict";
const path = require("path");
const customerPath = path.resolve("src", "constants");
const { customer } = require(customerPath);

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("customers", customer, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("customers", null, {});
  },
};
