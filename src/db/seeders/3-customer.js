"use strict";
const path = require("path");
const { Customer } = require('../models'); 
const customerPath = path.resolve("src", "constants");
const { customer } = require(customerPath); 

module.exports = {
  async up() {
 
    await Customer.bulkCreate(customer);
  },

  async down() {
    await Customer.destroy({ where: {} });
  },
};
