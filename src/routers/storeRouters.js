const {Router} = require('express');
// =================================
const storeController = require('../controllers/storeControllers')
const {
	validate: {validateStore}} = require('../middleware');
const {paginate} = require('../middleware')

const router = new Router();

router
  .route('/')
  .get(paginate.paginateSomething, storeController.getAllStores)
  .put(validateStore, storeController.updateStores)

router
  .route('/moreThan')
  .get(storeController.getAllStoresMoreThan)

router
  .route('/someStores')
  .delete(storeController.deleteSomeStore)
  .get(storeController.getSomeStores)

module.exports = router;