"use strict";
const path = require("path");
const storePath = path.resolve("src", "constants");
const { store } = require(storePath);

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("stores", store, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("stores", null, {});
  },
};
