const router = require('express').Router();
const { TimeSheetController } = require('../controllers');
const { AuthMiddleware } = require('../middlewares');

router.get('/add-timeSheet', AuthMiddleware.authenticateToken, TimeSheetController.getAddTimeSheet);
router.get('/all-timeSheet', AuthMiddleware.authenticateToken, TimeSheetController.getTimeSheetList);
router.get('/edit-timeSheet/:TimeSheet_id', AuthMiddleware.authenticateToken, TimeSheetController.getUpdateTimeSheet);

// router.get('/timeSheet/:TimeSheet_id', AuthMiddleware.authenticateToken, TimeSheetController.getProduct);

router.post('/edit-timeSheet/:TimeSheet_id', AuthMiddleware.authenticateToken, TimeSheetController.postUpdateTimeSheet);
router.post('/add-timeSheet', AuthMiddleware.authenticateToken, TimeSheetController.postAddTimeSheet);

router.delete('/del-timeSheet/:TimeSheet_id', AuthMiddleware.authenticateToken, TimeSheetController.deleteTimeSheet);

module.exports = router;
