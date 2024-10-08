const { ValidationError } = require("yup");

const {
  Sequelize: { BaseError },
} = require("../db/models");

module.exports.validationErrorHandler = (err, req, res, next) => {
  if (err instanceof ValidationError) {
    return res.status(400).send({
      errors: [
        {
          title: "Validation error",
          details: err.message,
        },
      ],
    });
  }
  next(err);
};

module.exports.sequelizeErrorHandler = (err, req, res, next) => {
  if (err instanceof BaseError) {
    return res.status(406).send({
      errors: [
        {
          title: "Sequelize Error",
          details: err.errors,
        },
      ],
    });
  }
};

module.exports.errorHandlers = (err, req, res, next) => {
  if (res.headerSent) {
    return;
  }

  res.status(err?.status ?? 500).send({
    errors: [
      {
        title: err?.message ?? "Internal server error",
      },
    ],
  });
};
