const {Router} = require('express');
// =================================
const customerController = require('../controllers/customerControllers')
const {
	validate: {validateCustomer}} = require('../middleware');
const {paginate} = require('../middleware')

const router = new Router();

router
  .route('/')
  .get(paginate.paginateSomething, customerController.getAllCustomers)
  .put(validateCustomer, customerController.updateCustomer)

router
  .route('/moreThan')
  .get(customerController.getCustomersIdMoreThanHalf)

router
  .route('/someCustomers')
  .delete(customerController.deleteSomeCustomers)
  .get(customerController.getSomeCustomers)

module.exports = router;