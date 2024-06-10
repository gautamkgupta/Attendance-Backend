const router = require('express').Router();
// const { AuthMiddleware } = require('../middlewares');
const { TaskListController } = require('../controllers');

router.get("/get", TaskListController.getTaskList);


module.exports = router;
