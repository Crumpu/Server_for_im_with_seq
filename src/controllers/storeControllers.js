const { Op } = require("sequelize");
const path = require("path");
const createError = require("http-errors");
const { Store, sequelize } = require(path.resolve(
  "src",
  "db",
  "models"
));

class BrandController {
  async getAllStores(req, res, next) {
    try {
      const { limit, offset } = req.pagination;
      const stores = await Store.findAll({
        raw: true,
        limit,
        offset,
        order: ["id"],
      });
      if (stores.length > 0) {
        console.log(`Result is: ${JSON.stringify(stores, null, 2)}`);
        res.status(200).json(stores);
      } else {
        console.log('Bad request, stores not found')
        next(createError(404, 'Bad request, stores not found'));
      }
    } catch (error) {first
      console.log(error.message);
      next(error);
    }
  }

  async getAllStoresMoreThan(req, res, next) {
    try {
      const storesId = await Store.count("id");
      const stores = await Store.findAll({
        offset: storesId / 2,
        raw: true,
        order: ["id"],
      });
      if (stores.length > 0) {
        console.log(`Result is: ${JSON.stringify(stores, null, 2)}`);
        res.status(200).json(stores);
      } else {
        console.log('Bad request, stores not found')
        next(createError(404, 'Bad request, stores not found'));
      }
    } catch (error) {
      console.log(error.message); 
      next(error);
    }
  }

  async getSomeStores(req, res, next) {
    try {
      const stores = req.query.stores;
      const someStores = await Store.findAll({
        where: {
          title: {
            [Op.in]: stores,
          },
        },
        raw: true,
      });
      if (someStores.length > 0) {
        console.log(`Result is: ${JSON.stringify(someStores, null, 2)}`);
        res.status(200).json(someStores);
      } else {
        console.log('Bad request, stores not found');
        next(createError(404, 'Bad request, stores not found'));
      }
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }

  async deleteSomeStore(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const deletedCount = await Store.destroy({
        where: {
          description: {
            [Op.notILike]: "%.com%",
          },
        },
        transaction: t,
      });
      console.log(deletedCount)
      if (deletedCount) {
        console.log(res.statusCode, "Types has been deleted");
        res.sendStatus(res.statusCode);
      } else {
        console.log(res.statusCode);
        next(createError(404, "No types to delete"));
      }
      await t.commit();
    } catch (error) {
      console.log(error.message);
      await t.rollback();
      next(error);
    }
  }

  async updateStores(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const { body } = req;
      const updatedStore = await Store.update(body, {
        where: {
          id: body.id,
        },
        raw: true,
        transaction: t,
        returning: ["title", "description"],
      });
      if (updatedStore) {
        console.log(`Result is: ${JSON.stringify(updatedStore, null, 2)}`);
        res.status(200).json(updatedStore);
      } else {
        console.log("No stores to update")
        next(createError(404, "No stores to update"));
      }
      await t.commit();
    } catch (error) {
      console.log(error.message);
      await t.rollback();
      next(error);
    }
  }
}

module.exports = new BrandController();
