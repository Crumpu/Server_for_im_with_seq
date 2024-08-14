const { Op } = require("sequelize");
const path = require("path");
const createError = require("http-errors");
const { Brand, sequelize } = require(path.resolve("src", "db", "models"));

class BrandController {
  async getAllBrands(req, res, next) {
    try {
      const { limit, offset } = req.pagination;
      const brands = await Brand.findAll({
        raw: true,
        limit,
        offset,
        order: ["id"],
      });
      if (brands.length > 0) {
        console.log(`Result is: ${JSON.stringify(brands, null, 2)}`);
        res.status(200).json(brands);
      } else {
        next(createError(404, 'Brands from your request not found'));
      }
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }

  async getAllBrandsMoreThan(req, res, next) {
    try {
      const brandsId = await Brand.count("id");
      const brands = await Brand.findAll({
        offset: brandsId / 2,
        raw: true,
        order: ["id"],
      });
      if (brands.length > 0) {
        console.log(`Result is: ${JSON.stringify(brands, null, 2)}`);
        res.status(200).json(brands);
      } else {
        console.log('Brands from your request not found')
        next(createError(404, 'Brands from your request not found'));
      }
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }

  async getSomeBrands(req, res, next) {
    try {
      const brands = req.query.brands;
      const someBrands = await Brand.findAll({
        where: {
          title: {
            [Op.in]: brands,
          },
        },
        raw: true,
      });
      if (someBrands.length > 0) {
        console.log(`Result is: ${JSON.stringify(someBrands, null, 2)}`);
        res.status(200).json(someBrands);
      } else {
        console.log('Brands from your request not found')
        next(createError(404, 'Brands from your request not found'));
      }
    } catch (error) {
      console.log(error.message);
      next(error.message);
    }
  }

  async deleteSomeBrands(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const deletedCount = await Brand.destroy({
        where: {
          description: {
            [Op.substring]: "gad",
          },
        },
        transaction: t,
      });
      console.log(deletedCount);
      if (deletedCount) {
        console.log(res.statusCode, "Brand has been deleted");
        res.sendStatus(res.statusCode);
      } else {
        console.log(res.statusCode);
        next(createError(404, "No brands to delete"));
      }
      await t.commit();
    } catch (error) {
      console.log(error.message);
      await t.rollback();
      next(error);
    }
  }

  async updateBrand(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const { body } = req;
      const updatedBrand = await Brand.update(body, {
        where: {
          id: body.id,
        },
        raw: true,
        transaction: t,
      });
      if (updatedBrand[0] > 0) {
        console.log(`Result is: ${JSON.stringify(updatedBrand, null, 2)}`);
        res.status(200).json(updatedBrand);
      } else {
        next(createError(404, "No brands to update"));
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
