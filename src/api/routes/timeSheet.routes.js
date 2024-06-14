const router = require('express').Router();
// const { AuthMiddleware } = require('../middlewares');
const { TimeSheetController } = require('../controllers');

router.get("/get", TimeSheetController.getTimeSheet);
router.post("/postData", TimeSheetController.postTimeSheet);


module.exports = router;
