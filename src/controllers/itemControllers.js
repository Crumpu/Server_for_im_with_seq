const { Op } = require("sequelize");
const path = require("path");
const createError = require("http-errors");
const {
  Item,
  Brand,
  Item_category: Category,
  Item_type: Type,
  Item_model: Model,
  Store,
  sequelize,
} = require(path.resolve("src", "db", "models"));

class OrderController {
  async getAllItems(req, res, next) {
    try {
      const { limit, offset } = req.pagination;
      const items = await Item.findAll({
        attributes: [
          "id",
          [sequelize.col("Item_category.title"), "category"],
          [sequelize.col("Item_type.title"), "type"],
          [sequelize.col("Brand.title"), "brand"],
          [sequelize.col("Item_model.title"), "model"],
          "price",
          [sequelize.col("Store.title"), "store"],
          "amount",
        ],
        include: [
          {
            model: Category,
            attributes: [],
          },
          {
            model: Type,
            attributes: [],
          },
          {
            model: Brand,
            attributes: [],
          },
          {
            model: Model,
            attributes: [],
          },
          {
            model: Store,
            attributes: [],
          },
        ],
        raw: true,
        limit,
        offset,
        order: ["id"],
      });
      if (items.length > 0) {
        console.log(`Result is: ${JSON.stringify(items, null, 2)}`);
        res.status(200).json(items);
      } else {
        console.log("Bad request, models not found");
        next(createError(404, "Bad request, models not found"));
      }
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }

  async getAllItemsMoreThan(req, res, next) {
    try {
      const itemsId = await Item.count("id");
      const items = await Item.findAll({
        attributes: [
          "id",
          [sequelize.col("Item_category.title"), "category"],
          [sequelize.col("Item_type.title"), "type"],
          [sequelize.col("Brand.title"), "brand"],
          [sequelize.col("Item_model.title"), "model"],
          "price",
          [sequelize.col("Store.title"), "store"],
          "amount",
        ],
        include: [
          {
            model: Category,
            attributes: [],
          },
          {
            model: Type,
            attributes: [],
          },
          {
            model: Brand,
            attributes: [],
          },
          {
            model: Model,
            attributes: [],
          },
          {
            model: Store,
            attributes: [],
          },
        ],
        offset: itemsId / 2,
        raw: true,
        order: ["id"],
      });
      if (items.length > 0) {
        console.log(`Result is: ${JSON.stringify(items, null, 2)}`);
        res.status(200).json(items);
      } else {
        console.log("Bad request, models not found");
        next(createError(404, "Bad request, models not found"));
      }
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }

  async getSomeItems(req, res, next) {
    try {
      const brands = req.query.brands;
      const arrBrands = Array.isArray(brands) ? brands : [brands];
      const someBrands = await Brand.findAll({
        where: {
          [Op.or]: arrBrands.map((brand) => ({
            title: {
              [Op.iLike]: `%${brand}%`,
            },
          })),
        },
        raw: true,
      });

      const arrIdBrands = [];
      someBrands.map((brand) => arrIdBrands.push(brand.id));
      console.log(arrIdBrands);

      const someItems = await Item.findAll({
        where: {
          brand_id: {
            [Op.in]: arrIdBrands,
          },
        },

        attributes: [
          "id",
          [sequelize.col("Item_category.title"), "category"],
          [sequelize.col("Item_type.title"), "type"],
          [sequelize.col("Brand.title"), "brand"],
          [sequelize.col("Item_model.title"), "model"],
          "price",
          [sequelize.col("Store.title"), "store"],
          "amount",
        ],
        include: [
          {
            model: Category,
            attributes: [],
          },
          {
            model: Type,
            attributes: [],
          },
          {
            model: Brand,
            attributes: [],
          },
          {
            model: Model,
            attributes: [],
          },
          {
            model: Store,
            attributes: [],
          },
        ],
        raw: true,
        order: ["id"],
      });
      console.log(someItems);
      if (someItems.length > 0) {
        console.log(`Result is: ${JSON.stringify(someItems, null, 2)}`);
        res.status(200).json(someItems);
      } else {
        console.log("Bad request, models not found");
        next(createError(404, "Bad request, models not found"));
      }
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }

  async deleteSomeItems(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const modelFromQuery = req.query.models;

      const arrModels = Array.isArray(modelFromQuery)
        ? modelFromQuery
        : [modelFromQuery];

      const itemToDelete = await Model.findAll({
        where: {
          [Op.or]: arrModels.map((model) => ({
            title: {
              [Op.iLike]: `%${model}%`,
            },
          })),
        },
        raw: true,
      });

      const arrIdModels = [];
      const idModelsToDelete = arrIdModels.push(
        ...itemToDelete.map((model) => model.id)
      );
      console.log(arrIdModels);

      const deletedCount = await Item.destroy({
        where: {
          model_id: {
            [Op.or]: arrIdModels,
          },
        },
        transaction: t,
      });
      if (deletedCount) {
        console.log(res.statusCode, "Items has been deleted");
        res.sendStatus(res.statusCode);
      } else {
        console.log(res.statusCode);
        next(createError(404, "No items to delete"));
      }
      await t.commit();
    } catch (error) {
      console.log(error.message);
      await t.rollback();
      next(error);
    }
  }

  async updateItems(req, res, next) {
    try {
      const { body } = req;
      const t = await sequelize.transaction();

      const category = await Category.findOrCreate({
        where: {
          title: {
            [Op.iLike]: body.category,
          },
        },
        defaults: {
          title: body.category,
          description: "Description for this category",
        },

        attributes: ["id"],
      });
      console.log(category[0].id, "111111");
      const type = await Type.findOrCreate({
        where: {
          title: {
            [Op.iLike]: body.type,
          },
        },
        defaults: {
          title: body.type,
          description: "Description for this type",
        },

        attributes: ["id"],
      });
      console.log(type[0].id, "222222");

      const brand = await Brand.findOrCreate({
        where: {
          title: {
            [Op.iLike]: body.brand,
          },
        },
        defaults: {
          title: body.brand,
          description: "Description for this brand",
        },

        attributes: ["id"],
      });
      console.log(brand[0].id, "333333333");
      const model = await Model.findOrCreate({
        where: {
          title: {
            [Op.iLike]: body.model,
          },
        },
        defaults: {
          title: body.model,
          description: "Description for this model",
        },

        attributes: ["id"],
      });
      console.log(model[0].id);
      const store = await Store.findOrCreate({
        where: {
          title: {
            [Op.iLike]: body.store,
          },
        },
        defaults: {
          title: body.store,
          description: "Description for this store",
        },
        attributes: ["id"],
      });
      console.log(store[0].id);

      const updatedItem = await Item.update(
        {
          ...body,
          category_id: category[0].id,
          type_id: type[0].id,
          brand_id: brand[0].id,
          model_id: model[0].id,
          store_id: store[0].id,
        },
        {
          where: {
            id: body.id,
          },
          transaction: t,
          raw: true,
        }
      );
      if (updatedItem[0] > 0) {
        console.log(`Result is: ${JSON.stringify(updatedItem, null, 2)}`);
        res.status(200).json(updatedItem);
      } else {
        console.log("No items to update");
        next(createError(404, "No items to update"));
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
