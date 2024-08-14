const {Router} = require('express');
// =================================
const modelController = require('../controllers/modelControllers')
const {
	validate: {validateModel}} = require('../middleware');
const {paginate} = require('../middleware')

const router = new Router();

router
  .route('/')
  .get(paginate.paginateSomething, modelController.getAllModels)
  .put(validateModel, modelController.updateModels)

router
  .route('/moreThan')
  .get(modelController.getAllModelsMoreThan)

router
  .route('/someModels')
  .delete(modelController.deleteSomeModels)
  .get(modelController.getSomeModels)

module.exports = router;