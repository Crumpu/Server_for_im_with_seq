"use strict";
const path = require("path");
const brandPath = path.resolve("src", "constants");
const { brand } = require(brandPath);

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("brands", brand, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("brands", null, {});
  },
};
