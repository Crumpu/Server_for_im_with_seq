const {Router} = require('express');
// =================================
const typeController = require('../controllers/typeControllers')
const {
	validate: {validateType}} = require('../middleware');
const {paginate} = require('../middleware')

const router = new Router();

router
  .route('/')
  .get(paginate.paginateSomething, typeController.getAllTypes)
  .put(validateType, typeController.updateTypes)

router
  .route('/moreThan')
  .get(typeController.getAllTypesMoreThan)

router
  .route('/someTypes')
  .delete(typeController.deleteSomeType)
  .get(typeController.getSomeTypes)

module.exports = router;