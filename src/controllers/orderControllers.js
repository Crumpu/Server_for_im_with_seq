const { Op } = require("sequelize");
const path = require("path");
const createError = require("http-errors");
const { Order, Customer, sequelize } = require(path.resolve(
  "src",
  "db",
  "models"
));

class OrderController {
  async getAllOrders(req, res, next) {
    try {
      const { limit, offset } = req.pagination;
      const orders = await Order.findAll({
        attributes: [
          "id",
          "code",
          "date",
          "amount",
          "paid",
          [sequelize.col("Customer.name"), "customer"],
        ],
        include: [
          {
            model: Customer,
            attributes: [],
          },
        ],
        raw: true,
        limit,
        offset,
        order: ["id"],
      });
      if (orders.length > 0) {
        console.log(`Result is: ${JSON.stringify(orders, null, 2)}`);
        res.status(200).json(orders);
      } else {
        console.log("Bad request, orders not found");
        next(createError(404, "Bad request, orders not found"));
      }
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }

  async getAllOrdersMoreThan(req, res, next) {
    try {
      const ordersId = await Order.count("id");
      const orders = await Order.findAll({
        offset: ordersId / 2,
        raw: true,
        order: ["id"],
      });
      if (orders.length > 0) {
        console.log(`Result is: ${JSON.stringify(orders, null, 2)}`);
        res.status(200).json(orders);
      } else {
        console.log("Bad request, orders not found");
        next(createError(404, "Bad request, orders not found"));
      }
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }

  async getSomeOrders(req, res, next) {
    try {
      const orders = req.query.orders;
      const customerId = await Customer.findAll({
        where: {
          [Op.or]: orders.map((customer) => ({
            name: {
              [Op.like]: `%${customer}`,
            },
          })),
        },
        returning: "id",
        raw: true,
      });
      let arrId = [];
      customerId.map((customer) => arrId.push(customer.id));
      const someOrders = await Order.findAll({
        where: {
          customer: {
            [Op.in]: arrId,
          },
        },
        include: {
          model: Customer,
          attributes: ["name"],
        },
        raw: true,
      });
      if (someOrders.length > 0) {
        console.log(`Result is: ${JSON.stringify(someOrders, null, 2)}`);
        res.status(200).json(someOrders);
      } else {
        console.log("Bad request, orders not found");
        next(createError(404, "Bad request, orders not found"));
      }
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }

  async deleteSomeOrder(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const deletedCount = await Order.destroy({
        where: {
          paid: {
            [Op.is]: false,
          },
        },
        transaction: t,
      });
      console.log(deletedCount);
      if (deletedCount) {
        console.log(res.statusCode, "Orders has been deleted");
        res.sendStatus(res.statusCode);
      } else {
        console.log(res.statusCode);
        next(createError(404, "No orders to delete"));
      }
      await t.commit();
    } catch (error) {
      console.log(error.message);
      await t.rollback();
      next(error);
    }
  }

  async updateOrders(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const { body } = req;
      console.log(body)
      const updatedOrder = await Order.update(body, {
        where: {
          id: body.code,
        },
        raw: true,
        transaction: t,
      });
      if (updatedOrder) {
        console.log(`Result is: ${JSON.stringify(updatedOrder, null, 2)}`);
        res.status(200).json(updatedOrder);
      } else {
        console.log("No orders to update");
        next(createError(404, "No orders to update"));
      }
      await t.commit();
    } catch (error) {
      console.log(error.message);
      await t.rollback();
      next(error);
    }
  }
}

module.exports = new OrderController();
