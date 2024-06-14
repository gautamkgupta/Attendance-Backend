const router = require('express').Router();
// const { AuthMiddleware } = require('../middlewares');
const { AttendanceController } = require('../controllers');

router.get("/get", AttendanceController.getAttendance);
router.post("/postData", AttendanceController.postAttendance);
router.post("/postUpdate/:userId", AttendanceController.postUpdateAttendance);


module.exports = router;
