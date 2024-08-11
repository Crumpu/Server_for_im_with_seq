const yup = require("yup");
const path = require("path");

const { CATEGORY_BRAND_TYPE_STORE_SCHEMA, CUSTOMER_SCHEMA,  } = require(path.resolve(
  "src",
  "utils",
  "validationSchemas"
));

const validateSchema = function (schema) {
  return async (req, res, next) => {
    const { body } = req;
    try {
      await schema.validate(body, {
        abortEarly: false,
      });
      next();
    } catch (error) {
      console.log(error.errors);
      next(error);
    }
  };
};

module.exports.validateBrand = validateSchema(CATEGORY_BRAND_TYPE_STORE_SCHEMA);
module.exports.validateCustomer = validateSchema(CUSTOMER_SCHEMA);
module.exports.validateCategory = validateSchema(CATEGORY_BRAND_TYPE_STORE_SCHEMA);
module.exports.validateType = validateSchema(CATEGORY_BRAND_TYPE_STORE_SCHEMA);
module.exports.validateStore = validateSchema(CATEGORY_BRAND_TYPE_STORE_SCHEMA);


