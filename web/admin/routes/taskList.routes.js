const router = require('express').Router();
const { TaskListController } = require('../controllers');
const { AuthMiddleware } = require('../middlewares');

router.get('/add-taskList', AuthMiddleware.authenticateToken, TaskListController.getAddTaskList);
router.get('/all-taskList', AuthMiddleware.authenticateToken, TaskListController.getTaskList);
router.get('/edit-taskList/:TaskList_id', AuthMiddleware.authenticateToken, TaskListController.getUpdateTaskList);

// router.get('/taskList/:TaskList_id', AuthMiddleware.authenticateToken, TaskListController.getProduct);

router.post('/edit-taskList/:TaskList_id', AuthMiddleware.authenticateToken, TaskListController.postUpdateTaskList);
router.post('/add-taskList', AuthMiddleware.authenticateToken, TaskListController.postAddTaskList);

router.delete('/del-taskList/:TaskList_id', AuthMiddleware.authenticateToken, TaskListController.deleteTaskList);

module.exports = router;
