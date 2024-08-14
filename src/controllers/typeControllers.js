const { Op } = require("sequelize");
const path = require("path");
const createError = require("http-errors");
const { Item_type: Type, sequelize } = require(path.resolve(
  "src",
  "db",
  "models"
));

class TypeController {
  async getAllTypes(req, res, next) {
    try {
      const { limit, offset } = req.pagination;
      const types = await Type.findAll({
        raw: true,
        limit,
        offset,
        order: ["id"],
      });
      if (types.length > 0) {
        console.log(`Result is: ${JSON.stringify(types, null, 2)}`);
        res.status(200).json(types);
      } else {
        console.log('Bad request, types not found')
        next(createError(404, 'Bad request, types not found'));
      }
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }

  async getAllTypesMoreThan(req, res, next) {
    try {
      const typesId = await Type.count("id");
      const types = await Type.findAll({
        offset: typesId / 2,
        raw: true,
        order: ["id"],
      });
      if (types.length > 0) {
        console.log(`Result is: ${JSON.stringify(types, null, 2)}`);
        res.status(200).json(types);
      } else {
        console.log('Bad request, types not found')
        next(createError(404, 'Bad request, types not found'));
      }
    } catch (error) {
      console.log(error.message); 
      next(error);
    }
  }

  async getSomeTypes(req, res, next) {
    try {
      const types = req.query.types;
      const someTypes = await Type.findAll({
        where: {
          title: {
            [Op.in]: types,
          },
        },
        raw: true,
      });
      if (someTypes.length > 0) {
        console.log(`Result is: ${JSON.stringify(someTypes, null, 2)}`);
        res.status(200).json(someTypes);
      } else {
        console.log('Bad request, types not found')
        next(createError(404, 'Bad request, categories not found'));
      }
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }

  async deleteSomeType(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const deletedCount = await Type.destroy({
        where: {
          description: {
            [Op.substring]: "Mobile",
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

  async updateTypes(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const { body } = req;
      const updatedType = await Type.update(body, {
        where: {
          id: body.id,
        },
        raw: true,
        transaction: t,
      });
      if (updatedType[0] > 0) {
        console.log(`Result is: ${JSON.stringify(updatedType, null, 2)}`);
        res.status(200).json(updatedType);
      } else {
        console.log("No types to update")
        next(createError(404, "No types to update"));
      }
      await t.commit();
    } catch (error) {
      console.log(error.message);
      await t.rollback();
      next(error);
    }
  }
}

module.exports = new TypeController();
