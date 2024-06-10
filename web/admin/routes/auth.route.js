const router = require('express').Router();
const { AuthController } = require('../controllers');
const { AuthMiddleware } = require('../middlewares');

router.get('/login', AuthController.getLogin);
router.get('/dashboard', AuthMiddleware.authenticateToken, AuthController.getdashboard);
router.get('/get-user/:userId', AuthMiddleware.authenticateToken, AuthController.getuser);
router.post('/login', AuthController.verifyLogin);
router.post('/logout', AuthMiddleware.authenticateToken, AuthController.logout);

module.exports = router;