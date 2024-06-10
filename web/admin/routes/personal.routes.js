const router = require('express').Router();
const { PersonalController } = require('../controllers');
const { AuthMiddleware } = require('../middlewares');

router.get('/add-personal', AuthMiddleware.authenticateToken, PersonalController.getAddPersonal);
router.get('/all-personal', AuthMiddleware.authenticateToken, PersonalController.getPersonalList);
router.get('/edit-personal/:personal_id', AuthMiddleware.authenticateToken, PersonalController.getUpdatePersonal);

// router.get('/personal/:personal_id', AuthMiddleware.authenticateToken, PersonalController.getProduct);

router.post('/edit-personal/:personal_id', AuthMiddleware.authenticateToken, PersonalController.postUpdatePersonal);
router.post('/add-personal', AuthMiddleware.authenticateToken, PersonalController.postAddPersonal);

// router.delete('/del-personal/:personal_id', AuthMiddleware.authenticateToken, PersonalController.deletePersonal);
module.exports = router;

