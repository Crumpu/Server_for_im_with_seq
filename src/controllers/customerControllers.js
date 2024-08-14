const createError = require("http-errors");
const path = require("path");
const { Op } = require("sequelize");
const { Customer, sequelize } = require('../db/models');

class CustomerController {
  async getAllCustomers(req, res, next) {
    try {
      const { limit, offset } = req.pagination;
      const customers = await Customer.findAll({
        raw: true,
        limit,
        offset,
        order: ["id"],
      });
       if(customers.length > 0){
        console.log(`Result is: ${JSON.stringify(customers, null, 2)}`)
        res.status(200).json(customers)
       } else {
        console.log('Customers not found')
        next(createError(404, 'Customers not found'));
       }
    } catch (error) {
      console.log(error.message)
      next(error)
    }
  }

  async getCustomersIdMoreThanHalf(req, res, next){

    try {
      const maxId = await Customer.count('id');
      const customers = await Customer.findAll({
     offset: maxId / 2,
     raw: true,
     order: ['id']
      })
      if(customers.length > 0){
        console.log(`Result is: ${JSON.stringify(customers, null, 2)}`)
        res.status(200).json(customers)
      } else {
        console.log('Customers not found')
        next(createError(404, 'Customers not found'));

      }
    } catch (error) {
      console.log(error.message)
      next(error)      
    }
  }

  async getSomeCustomers(req, res, next){
   try {
    const findWord = req.query.find
    const customers = await Customer.findAll({
      where: {
        name: {
          [Op.iLike]: `%${findWord}`,
        }
      }, 
      raw: true,
    })
    if(customers.length > 0){
      console.log(`Result is: ${JSON.stringify(customers, null, 2)}`)
      res.status(200).json(customers)
    } else {
      console.log('Customers not found')
      next(createError(404, 'Customers not found'));
    }
   } catch (error) {
    console.log(error.message)
    next(error)
   }
  }

  async deleteSomeCustomers(req, res, next){
    const t = await sequelize.transaction();
    try {
      const deletedCount = await Customer.destroy({
        where: {
          name: {
            [Op.like]: "Will%",
          },
        },
        raw: true,
        transaction: t,
      });

      if (deletedCount) {
        console.log(res.statusCode, "Customers has been deleted");
        res.sendStatus(res.statusCode);
      } else {
        console.log(res.statusCode);
        next(createError(404, "No customer to delete"));
      }
      await t.commit();
    } catch (error) {
      console.log(error.message);
      await t.rollback();
      next(error);
    }
  }

  async updateCustomer(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const { body } = req;
      const updatedCustomer = await Customer.update(body, {
        where: {
          id: body.id,
        },
        raw: true,
        transaction: t,
      });
      if (updatedCustomer[0] > 0) {
        console.log(`Result is: ${JSON.stringify(updatedCustomer, null, 2)}`);
        res.status(200).json(updatedCustomer);
      } else {
        next(createError(404, "No customer to update"));

      }
      await t.commit();
    } catch (error) {
      console.log(error.message);
      await t.rollback();
      next(error);
    }
  }
}


module.exports = new CustomerController();