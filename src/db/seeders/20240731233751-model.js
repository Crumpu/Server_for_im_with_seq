"use strict";
const path = require("path");
const modelPath = path.resolve("src", "constants");
const { model } = require(modelPath);

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("models", model, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("models", null, {});
  },
};
