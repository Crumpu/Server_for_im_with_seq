"use strict";
const path = require("path");
const itemsPath = path.resolve("src", "constants");
const { items } = require(itemsPath);



module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("items", items, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("items", null, {});
  },
};
