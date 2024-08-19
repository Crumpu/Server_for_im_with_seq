const yup = require("yup");

const TITLE_NAME_SCHEMA = yup.string().trim().min(2).max(50).required();
const DESCRIPTION_SCHEMA = yup.string().min(7);
const EMAIL_SCHEMA = yup.string().email().required();

// Customer schema

const CUSTOMER_SCHEMA = yup.object().shape({
  name: TITLE_NAME_SCHEMA,
  email: EMAIL_SCHEMA,
  password: yup.string().required(),
});

// Pagination schema

const PAGINATION_SCHEMA = yup.object().shape({
  limit: yup.number().min(1).max(100).required(),
  offset: yup.number().min(0).required(),
});

// Category, brand, type, store schema

const CATEGORY_BRAND_TYPE_STORE_SCHEMA = yup.object().shape({
  title: TITLE_NAME_SCHEMA,
  description: DESCRIPTION_SCHEMA,
});

// Orders schema 

const ORDER_SCHEMA = yup.object().shape({
  code: yup.number().positive().required(),
  date: yup.date().required(),
  customer: yup.string().min(2),
  amount: yup.number().min(0),
  paid: yup.boolean().required(),
})

// Models schema

const MODELS_SCHEMA = yup.object().shape({
  title: TITLE_NAME_SCHEMA,
  brand: yup.string().min(2).required(),
  description: DESCRIPTION_SCHEMA,
})

// Items schema

const ITEMS_SCHEMA = yup.object().shape({
  category: yup.string().min(2).required(),
  type: yup.string().min(2).required(),
  brand: yup.string().min(2).required(),
  model: yup.string().min(2).required(),
  price: yup.number().min(0),
  store: yup.string(),
  amount: yup.number().min(0)
})

module.exports = {
  MODELS_SCHEMA,
  PAGINATION_SCHEMA,
  CUSTOMER_SCHEMA,
  CATEGORY_BRAND_TYPE_STORE_SCHEMA,
  ORDER_SCHEMA,
  ITEMS_SCHEMA
};
