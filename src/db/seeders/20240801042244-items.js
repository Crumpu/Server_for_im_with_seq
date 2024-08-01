"use strict";
const path = require("path");
const itemPath = path.resolve("src", "constants");
const { items } = require(itemPath);



module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("items", items, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("items", null, {});
  },
};
