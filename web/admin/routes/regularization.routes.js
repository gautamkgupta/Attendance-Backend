const router = require('express').Router();
const { RegularizationController } = require('../controllers');
const { AuthMiddleware } = require('../middlewares');

router.get('/add-regularization', AuthMiddleware.authenticateToken, RegularizationController.getAddRegularization);
router.get('/all-regularization', AuthMiddleware.authenticateToken, RegularizationController.getRegularizationList);
router.get('/edit-regularization/:Regularization_id', AuthMiddleware.authenticateToken, RegularizationController.getUpdateRegularization);

// router.get('/regularization/:Regularization_id', AuthMiddleware.authenticateToken, RegularizationController.getProduct);

router.post('/edit-regularization/:Regularization_id', AuthMiddleware.authenticateToken, RegularizationController.postUpdateRegularization);
router.post('/add-regularization', AuthMiddleware.authenticateToken, RegularizationController.postAddRegularization);

router.delete('/del-regularization/:Regularization_id', AuthMiddleware.authenticateToken, RegularizationController.deleteRegularization);

module.exports = router;
