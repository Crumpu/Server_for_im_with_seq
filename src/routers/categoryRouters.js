const {Router} = require('express');
// =================================
const categoryController = require('../controllers/categoryController')
const {
	validate: {validateCategory}} = require('../middleware');
const {paginate} = require('../middleware')

const router = new Router();

router
  .route('/')
  .get(paginate.paginateSomething, categoryController.getAllCategories)
  .put(validateCategory, categoryController.updateCategory)

router
  .route('/moreThan')
  .get(categoryController.getAllCategoryMoreThan)

router
  .route('/someCategory')
  .delete(categoryController.deleteSomeCategory)
  .get(categoryController.getSomeCategories)

module.exports = router;