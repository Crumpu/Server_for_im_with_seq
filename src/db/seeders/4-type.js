"use strict";
const path = require("path");
const typePath = path.resolve("src", "constants");
const { type } = require(typePath);

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("item_types", type, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("item_types", null, {});
  },
};
