const { Op } = require("sequelize");
const path = require("path");
const createError = require("http-errors");
const { Item_category: Category, sequelize } = require(path.resolve(
  "src",
  "db",
  "models"
));

class BrandController {
  async getAllCategories(req, res, next) {
    try {
      const { limit, offset } = req.pagination;
      const categories = await Category.findAll({
        raw: true,
        limit,
        offset,
        order: ["id"],
      });
      if (categories.length > 0) {
        console.log(`Result is: ${JSON.stringify(categories, null, 2)}`);
        res.status(200).json(categories);
      } else {
        console.log("Bad request, categories not found");
        next(createError(404, "Bad request, categories not found"));
      }
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }

  async getAllCategoryMoreThan(req, res, next) {
    try {
      const categoriesId = await Category.count("id");
      const categories = await Category.findAll({
        offset: categoriesId / 2,
        raw: true,
        order: ["id"],
      });
      if (categories.length > 0) {
        console.log(`Result is: ${JSON.stringify(categories, null, 2)}`);
        res.status(200).json(categories);
      } else {
        console.log("Bad request, categories not found");
        next(createError(404, "Bad request, categories not found"));
      }
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }

  async getSomeCategories(req, res, next) {
    try {
      const categories = req.query.categories;
      const someCategories = await Category.findAll({
        where: {
          title: {
            [Op.in]: categories,
          },
        },
        raw: true,
      });
      if (someCategories.length > 0) {
        console.log(`Result is: ${JSON.stringify(someCategories, null, 2)}`);
        res.status(200).json(someCategories);
      } else {
        console.log("Bad request, categories not found");
        next(createError(404, "Bad request, categories not found"));
      }
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }

  async deleteSomeCategory(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const deletedCount = await Category.destroy({
        where: {
          description: {
            [Op.substring]: "hom",
          },
        },
        transaction: t,
      });
      console.log(deletedCount);
      if (deletedCount) {
        console.log(res.statusCode, "Category has been deleted");
        res.sendStatus(res.statusCode);
      } else {
        console.log(res.statusCode);
        next(createError(404, "No categories to delete"));
      }
      await t.commit();
    } catch (error) {
      console.log(error.message);
      await t.rollback();
      next(error);
    }
  }

  async updateCategory(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const { body } = req;
      const updatedCategory = await Category.update(body, {
        where: {
          id: body.id,
        },
        raw: true,
        transaction: t,
        returning: ["title", "description"],
      });
      if (updatedCategory) {
        console.log(`Result is: ${JSON.stringify(updatedCategory, null, 2)}`);
        res.status(200).json(updatedCategory);
      } else {
        console.log("No categories to update");
        next(createError(404, "No categories to update"));
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
