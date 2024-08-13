const {Router} = require('express');
// =================================
const orderController = require('../controllers/orderControllers')
const {
	validate: {validateOrder}} = require('../middleware');
const {paginate} = require('../middleware')

const router = new Router();

router
  .route('/')
  .get(paginate.paginateSomething, orderController.getAllOrders)
  .put(validateOrder, orderController.updateOrders)

router
  .route('/moreThan')
  .get(orderController.getAllOrdersMoreThan)

router
  .route('/someOrders')
  .delete(orderController.deleteSomeOrder)
  .get(orderController.getSomeOrders)

module.exports = router;