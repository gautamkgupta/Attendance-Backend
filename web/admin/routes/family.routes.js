const router = require('express').Router();
const { FamilyController } = require('../controllers');
const { AuthMiddleware } = require('../middlewares');

router.get('/add-family', AuthMiddleware.authenticateToken, FamilyController.getAddFamily);
router.get('/all-family', AuthMiddleware.authenticateToken, FamilyController.getFamilyList);
router.get('/edit-family/:family_id', AuthMiddleware.authenticateToken, FamilyController.getUpdateFamily);

// router.get('/family/:family_id', AuthMiddleware.authenticateToken, FamilyController.getProduct);

router.post('/edit-family/:family_id', AuthMiddleware.authenticateToken, FamilyController.postUpdateFamily);
router.post('/add-family', AuthMiddleware.authenticateToken, FamilyController.postAddFamily);

router.delete('/del-family/:family_id', AuthMiddleware.authenticateToken, FamilyController.deleteFamily);
module.exports = router;

