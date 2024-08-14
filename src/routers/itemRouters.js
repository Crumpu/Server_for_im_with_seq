const {Router} = require('express');
// =================================
const itemController = require('../controllers/itemControllers')
// const {
	// validate: {validateModel}} = require('../middleware');
const {paginate} = require('../middleware')

const router = new Router();

router
  .route('/')
  .get(paginate.paginateSomething, itemController.getAllItems)
//   .put(itemController.updateItems)

router
  .route('/moreThan')
  .get(itemController.getAllItemsMoreThan)

router
  .route('/someItems')
//   .delete(itemController.deleteSomeItems)
  .get(itemController.getSomeItems)

module.exports = router;