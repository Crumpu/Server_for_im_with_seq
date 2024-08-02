"use strict";
const fs = require('fs')
const path = require("path");
const orderPath = path.resolve("src", "constants");
const { orders } = require(orderPath);


// const rewriteOrders = () => {
//  let  orders = []
//   for(let i = 1; i <=200; i++){

//   const  order = {
//       code: i,
//       date: new Date().toISOString(),
//       customer: i <= 120 ? i : Math.floor((Math.random() * 120 ) + 1),
//       amount: Math.floor(Math.random() * 1000), 
//       paid: i % 2 === 0 ? true : false,
//       created_at: new Date().toISOString(),
//       updated_at: new Date().toISOString(),
//     }
//     orders.push(order)

//   }
//   console.log(orders)
//   fs.writeFileSync('orders.json', JSON.stringify(orders, null, 2))
//   return orders
// }

// const newOrders = rewriteOrders()

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("orders", orders, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("orders", null, {});
  },
};
