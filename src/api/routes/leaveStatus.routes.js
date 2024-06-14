const router = require('express').Router();
// const { AuthMiddleware } = require('../middlewares');
const { LeaveStatusController } = require('../controllers');

router.get("/get", LeaveStatusController.getLeaveStatus);
router.post("/postData", LeaveStatusController.postLeaveStatus);


module.exports = router;
