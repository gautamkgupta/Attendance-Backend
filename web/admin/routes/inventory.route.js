const router = require('express').Router();
const { InventoryController } = require('../controllers');
const { AuthMiddleware } = require('../middlewares');

router.get('/add-product', AuthMiddleware.authenticateToken, InventoryController.getAddInventory);
router.get('/product-list', AuthMiddleware.authenticateToken, InventoryController.getInventoryList);
router.get('/update-product/:product_id', AuthMiddleware.authenticateToken, InventoryController.getUpdateInventory);

router.get('/products/:product_id', AuthMiddleware.authenticateToken, InventoryController.getProduct);

router.post('/update-product/:product_id', AuthMiddleware.authenticateToken, InventoryController.postUpdateInventory);
router.post('/add-product', AuthMiddleware.authenticateToken, InventoryController.postAddInventory);

router.delete('/delete-product/:product_id', AuthMiddleware.authenticateToken, InventoryController.deleteInventory);
module.exports = router;