const router = require('express').Router();
const { ProfessionalController } = require('../controllers');
const { AuthMiddleware } = require('../middlewares');

router.get('/add-professional', AuthMiddleware.authenticateToken, ProfessionalController.getAddProfessional);
router.get('/all-professional', AuthMiddleware.authenticateToken, ProfessionalController.getProfessionalList);
router.get('/edit-professional/:Professional_id', AuthMiddleware.authenticateToken, ProfessionalController.getUpdateProfessional);

// router.get('/professional/:Professional_id', AuthMiddleware.authenticateToken, ProfessionalController.getProduct);

router.post('/edit-professional/:Professional_id', AuthMiddleware.authenticateToken, ProfessionalController.postUpdateProfessional);
router.post('/add-professional', AuthMiddleware.authenticateToken, ProfessionalController.postAddProfessional);

router.delete('/del-professional/:Professional_id', AuthMiddleware.authenticateToken, ProfessionalController.deleteProfessional);

module.exports = router;

