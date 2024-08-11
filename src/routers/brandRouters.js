const {Router} = require('express');
// =================================
const brandController = require('../controllers/brandControllers')
const {
	validateBrand} = require('../middleware/validate.mw');
const {paginate} = require('../middleware')

const router = new Router();

router
  .route('/')
  .get(paginate.paginateSomething, brandController.getAllBrands)
  .put(validateBrand, brandController.updateBrand)

router
  .route('/moreThan')
  .get(brandController.getAllBrandsMoreThan)

router
  .route('/someBrands')
  .delete(brandController.deleteSomeBrands)
  .get(brandController.getSomeBrands)

module.exports = router; 