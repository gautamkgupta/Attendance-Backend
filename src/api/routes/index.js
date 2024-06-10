const express = require('express');
const router = express.Router();

const userRoute = require('./user.routes');
const familyRoute = require('./family.routes');
const attendanceRoute = require('./attendance.routes');
const educationRoute = require('./education.routes');
const professionalRoute = require('./professional.routes');
const TaskListRoute = require('./taskList.routes');
const TimeSheetRoute = require('./timeSheet.routes');
const RegularizationRoute = require('./regularization.routes');

router.use('/user', userRoute);
router.use('/family', familyRoute);
router.use('/attendance', attendanceRoute);
router.use('/education', educationRoute);
router.use('/professional', professionalRoute);
router.use('/taskList', TaskListRoute);
router.use('/timeSheet', TimeSheetRoute);
router.use('/regularization', RegularizationRoute);

module.exports = router;