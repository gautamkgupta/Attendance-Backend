const router = require('express').Router();
// const { AuthMiddleware } = require('../middlewares');
const { TimeSheetController } = require('../controllers');

router.get("/get", TimeSheetController.getTimeSheet);


module.exports = router;
