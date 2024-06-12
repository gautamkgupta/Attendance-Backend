const router = require('express').Router();
const { BankController } = require('../controllers');
const { AuthMiddleware } = require('../middlewares');

router.get('/add-bank', AuthMiddleware.authenticateToken, BankController.getAddBank);
router.get('/all-bank', AuthMiddleware.authenticateToken, BankController.getBankList);
router.get('/edit-bank/:bank_id', AuthMiddleware.authenticateToken, BankController.getUpdateBank);

// router.get('/bank/:bank_id', AuthMiddleware.authenticateToken, BankController.getProduct);

router.post('/add-bank', AuthMiddleware.authenticateToken, BankController.postAddBank);
router.post('/edit-bank/:bank_id', AuthMiddleware.authenticateToken, BankController.postUpdateBank);

router.delete('/del-bank/:bank_id', AuthMiddleware.authenticateToken, BankController.deleteBank);

module.exports = router;
