const router = require('express').Router();
// const { AuthMiddleware } = require('../middlewares');
const { AttendanceController } = require('../controllers');

router.get("/get", AttendanceController.getAttendance);


module.exports = router;
