const { Op } = require("sequelize");
const path = require("path");
const createError = require("http-errors");
const { Item_model: Model, Brand, sequelize } = require(path.resolve(
  "src",
  "db",
  "models"
));

class OrderController {
  async getAllModels(req, res, next) {
    try {
      const { limit, offset } = req.pagination;
      const models = await Model.findAll({
        attributes: [
          "id",
          "title",
          [sequelize.col("Brand.title"), "brand"],
          "description",
        ],
        include: [
          {
            model: Brand,
            attributes: [],
          },
        ],
        raw: true,
        limit,
        offset,
        order: ["id"],
      });
      console.log(models);
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

  async getAllModelsMoreThan(req, res, next) {
    try {
      const modelsId = await Model.count("id");
      const models = await Model.findAll({
        attributes: [
          "id",
          "title",
          [sequelize.col("Brand.title"), "brand"],
          "description",
        ],
        include: [
          {
            model: Brand,
            attributes: [],
          },
        ],
        offset: modelsId / 2,
        raw: true,
        order: ["id"],
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

  async getSomeModels(req, res, next) {
    try {
      const models = req.query.models;
      console.log(models);
      const someModels = await Model.findAll({
        where: {
          [Op.or]: models.map((model) => ({
            title: {
              [Op.iLike]: `%${model}%`,
            },
          })),
        },
        attributes: [
          "id",
          "title",
          [sequelize.col("Brand.title"), "brand"],
          "description",
        ],
        include: {
          model: Brand,
          attributes: [],
        },
        raw: true,
        order: ["id"],
      });
      console.log(someModels);
      if (someModels.length > 0) {
        console.log(`Result is: ${JSON.stringify(someModels, null, 2)}`);
        res.status(200).json(someModels);
      } else {
        console.log("Bad request, models not found");
        next(createError(404, "Bad request, models not found"));
      }
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }

  async deleteSomeModels(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const modelToDelete = req.query.models
      const deletedCount = await Model.destroy({
        where: {
          title: {
            [Op.iLike]: `%${modelToDelete}%`,
          },
        },
        transaction: t,
      });
      if (deletedCount) {
        console.log(res.statusCode, "Models has been deleted");
        res.sendStatus(res.statusCode);
      } else {
        console.log(res.statusCode);
        next(createError(404, "No models to delete"));
      }
      await t.commit();
    } catch (error) {
      console.log(error.message);
      await t.rollback();
      next(error);
    }
  }

  async updateModels(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const { body } = req;
      const brand = await Brand.findOne({
        where: {
          title: {
            [Op.iLike]: body.brand,
          },
        },
        raw: true,
      });
      const updatedOrder = await Model.update({...body, brand: brand.id,}, {
        where: {
          id: body.id,
        },
        raw: true,
        transaction: t,
      });
      console.log(updatedOrder)
      if (updatedOrder[0] > 0) {
        console.log(`Result is: ${JSON.stringify(updatedOrder, null, 2)}`);
        res.status(200).json(updatedOrder);
      } else {
        console.log("No models to update");
        next(createError(404, "No models to update"));
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
