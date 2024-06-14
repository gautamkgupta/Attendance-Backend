const router = require('express').Router();
// const { AuthMiddleware } = require('../middlewares');
const { BankController } = require('../controllers');

router.get("/get", BankController.getBank);
router.post("/postData", BankController.postBank);


module.exports = router;
