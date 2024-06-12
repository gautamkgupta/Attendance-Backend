const router = require('express').Router();
const { ProjectController } = require('../controllers');
const { AuthMiddleware } = require('../middlewares');

router.get('/add-project', AuthMiddleware.authenticateToken, ProjectController.getAddProject);
router.get('/all-project', AuthMiddleware.authenticateToken, ProjectController.getProjectList);
router.get('/edit-project/:project_id', AuthMiddleware.authenticateToken, ProjectController.getUpdateProject);

// router.get('/project/:project_id', AuthMiddleware.authenticateToken, ProjectController.getProduct);

router.post('/edit-project/:project_id', AuthMiddleware.authenticateToken, ProjectController.postUpdateProject);
router.post('/add-project', AuthMiddleware.authenticateToken, ProjectController.postAddProject);

router.delete('/del-project/:project_id', AuthMiddleware.authenticateToken, ProjectController.deleteProject);

module.exports = router;
