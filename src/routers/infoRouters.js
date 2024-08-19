const {Router} = require('express');
// =================================
const infoController = require('../controllers/infoControllers')

const router = new Router();

router
  .route('/countModel')
  .get(infoController.getCountModelsPerBrand)

router
  .route('/itemPerStore')
  .get(infoController.getItemsForTypePerStore)

router
  .route('/highestCustomer')
  .get(infoController.highestNumberOfPurchases)

  router
  .route('/mostExpensive')
  .get(infoController.mostExpensivePurchase)

module.exports = router;