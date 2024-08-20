const { Op } = require("sequelize");
const path = require("path");
const createError = require("http-errors");

const {
  Brand,
  Item,
  Item_model: Model,
  Store,
  Customer,
  Order,
  Item_type: Type,
  sequelize,
} = require(path.resolve("src", "db", "models"));

class InfoController {
  async getCountModelsPerBrand(req, res, next) {
    try {
      const models = await Model.findAll({
        attributes: [
          [sequelize.col("Brand.title"), "brand"],
          [sequelize.fn("COUNT", sequelize.col("Item_model.id")), "modelCount"],
        ],
        include: [
          {
            model: Brand,
            attributes: [],
          },
        ],
        raw: true,
        order: [[sequelize.col("Brand.id"), "ASC"]],
        group: ["Brand.id"],
      });
      if (models.length > 0) {
        console.log(`Result is: ${JSON.stringify(models, null, 2)}`);
        res.status(200).json(models);
      } else {
        console.log("Bad request, models not found");
        next(createError(404, "Bad request, models not found"));
      }
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }

  async getItemsForTypePerStore(req, res, next) {
    try {
      const models = await Item.findAll({
        attributes: [
          [sequelize.col("Store.title"), "Store"],
          [sequelize.col("Item_type.title"), "Type"],
          [sequelize.fn("SUM", sequelize.col("Item.amount")), "amount"],
        ],
        include: [
          {
            model: Store,
            attributes: [],
          },
          {
            model: Type,
            attributes: [],
          },
        ],
        raw: true,
        group: ["Store.id", "Item_type.id"],
        order: [sequelize.col("Store.id"), "Store"],
      });
      if (models.length > 0) {
        console.log(`Result is: ${JSON.stringify(models, null, 2)}`);
        res.status(200).json(models);
      } else {
        console.log("Bad request, models not found");
        next(createError(404, "Bad request, models not found"));
      }
      console.log(models);
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }

  async highestNumberOfPurchases(req, res, next) {
    try {
      const customers = await Order.findAll({
        attributes: [
          [sequelize.col("Customer.name"), "name"],
          [
            sequelize.fn("COUNT", sequelize.col("Order.customer")),
            "numberOfCustomers",
          ],
        ],
        include: [
          {
            model: Customer,
            attributes: [],
          },
        ],
        raw: true,
        group: ["Customer.id"],
      });
      const maxOrderCount = Math.max(
        ...customers.map((order) => order.numberOfCustomers)
      );
      const maxOrderCustomer = customers.filter(
        (customer) => customer.numberOfCustomers === maxOrderCount.toString()
      );

      if (maxOrderCustomer.length > 0) {
        console.log(`Result is: ${JSON.stringify(maxOrderCustomer, null, 2)}`);
        res.status(200).json(maxOrderCustomer);
      } else {
        console.log("Bad request, customer not found");
        createError(404, "Bad request, customer not found");
      }
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }
  async mostExpensivePurchase(req, res, next) {
    try {
      const customers = await Order.findAll({
        attributes: [
          ["id", "order_id"],
          [sequelize.col("Customer.name"), "name"],
          [sequelize.col("items.price"), "price"],
          [sequelize.col("Order.amount"), "amount"],
          [sequelize.fn("MAX", sequelize.literal('"Order"."amount" * "items"."price"')), "orderPrice"]
        ],

        include: [
          {
            model: Customer,
            attributes: [],
          },
          {
            through: {
              attributes: [],
            },
            model: Item,
            as: "items",
            attributes: [],
          },
        ],
        raw: true,
        group: ["Order.id", "items.id", "Customer.name"],
        order: [["orderPrice", "DESC"]],
      });
      const maxOrderPice = Math.max(
        ...customers.map((order) => order.orderPrice)
      );
      // console.log(maxOrderPice)
      const maxCustomerPrice = customers.filter(
        (customer) => customer.orderPrice === maxOrderPice.toFixed(2));
        if(maxCustomerPrice.length > 0){
          console.log(`Result is: ${JSON.stringify(maxCustomerPrice, null, 2)}`)
          res.status(200).json(maxCustomerPrice);
        } else { 
          console.log('Customers not found, bad request');
        createError(404, "Bad request, customer not found");
        }
    } catch (error) {
      console.error(error.message);
      next(error);
    }
  }
}

module.exports = new InfoController();
