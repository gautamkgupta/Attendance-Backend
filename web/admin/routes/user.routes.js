const router = require('express').Router();
const { UserController } = require('../controllers');
const { AuthMiddleware, MulterMiddleware } = require('../middlewares');

router.get('/add-user', AuthMiddleware.authenticateToken, UserController.getAddUser);
router.get('/all-user', AuthMiddleware.authenticateToken, UserController.getUserList);
router.get('/edit-user/:user_id', AuthMiddleware.authenticateToken, UserController.getUpdateUser);

// router.get('/user/:user_id', AuthMiddleware.authenticateToken, UserController.getProduct);

router.post('/edit-user/:user_id', AuthMiddleware.authenticateToken, MulterMiddleware.upload.fields([{ name: 'image_logo', maxCount: 1 }, { name: 'images', maxCount: 1 }]), UserController.postUpdateUser);
router.post('/add-user', AuthMiddleware.authenticateToken, MulterMiddleware.upload.fields([{ name: 'image_logo', maxCount: 1 }, { name: 'images', maxCount: 1 }]), UserController.postAddUser);

router.delete('/del-user/:user_id', AuthMiddleware.authenticateToken, UserController.deleteUser);
module.exports = router;

