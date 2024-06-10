const router = require('express').Router();
const { AttendanceController } = require('../controllers');
const { AuthMiddleware } = require('../middlewares');

router.get('/add-attendance', AuthMiddleware.authenticateToken, AttendanceController.getAddAttendance);
router.get('/all-attendance', AuthMiddleware.authenticateToken, AttendanceController.getAttendanceList);
router.get('/edit-attendance/:attendance_id', AuthMiddleware.authenticateToken, AttendanceController.getUpdateAttendance);

// router.get('/attendance/:attendance_id', AuthMiddleware.authenticateToken, AttendanceController.getProduct);

router.post('/edit-attendance/:attendance_id', AuthMiddleware.authenticateToken, AttendanceController.postUpdateAttendance);
router.post('/add-attendance', AuthMiddleware.authenticateToken, AttendanceController.postAddAttendance);

// router.delete('/del-attendance/:attendance_id', AuthMiddleware.authenticateToken, AttendanceController.deleteAttendance);
module.exports = router;

