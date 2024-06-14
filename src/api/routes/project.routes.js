const router = require('express').Router();
// const { AuthMiddleware } = require('../middlewares');
const { ProjectController } = require('../controllers');

router.get("/get", ProjectController.getProject);
router.post("/postData", ProjectController.postProject);


module.exports = router;
