const router = require('express').Router();
const { AddressController } = require('../controllers');
const { AuthMiddleware } = require('../middlewares');

router.get('/add-address', AuthMiddleware.authenticateToken, AddressController.getAddAddress);
router.get('/all-address', AuthMiddleware.authenticateToken, AddressController.getAddressList);
router.get('/edit-address/:address_id', AuthMiddleware.authenticateToken, AddressController.getUpdateAddress);

// router.get('/address/:address_id', AuthMiddleware.authenticateToken, AddressController.getProduct);

router.post('/edit-address/:address_id', AuthMiddleware.authenticateToken, AddressController.postUpdateAddress);
router.post('/add-address', AuthMiddleware.authenticateToken, AddressController.postAddAddress);

// router.delete('/del-address/:address_id', AuthMiddleware.authenticateToken, AddressController.deleteAddress);
module.exports = router;

