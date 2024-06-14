const router = require('express').Router();
// const { AuthMiddleware } = require('../middlewares');
const { RegularizationController } = require('../controllers');

router.get("/get", RegularizationController.getRegularization);
router.post("/postData", RegularizationController.postRegularization);


module.exports = router;
