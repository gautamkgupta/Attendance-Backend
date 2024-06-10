const router = require('express').Router();
// const { AuthMiddleware } = require('../middlewares');
const { RegularizationController } = require('../controllers');

router.get("/get", RegularizationController.getRegularization);


module.exports = router;
