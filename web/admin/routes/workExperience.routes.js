const router = require('express').Router();
const { WorkExperienceController } = require('../controllers');
const { AuthMiddleware } = require('../middlewares');

router.get('/add-work', AuthMiddleware.authenticateToken, WorkExperienceController.getAddWorkExperience);
router.get('/all-work', AuthMiddleware.authenticateToken, WorkExperienceController.getWorkExperienceList);
router.get('/edit-work/:work_id', AuthMiddleware.authenticateToken, WorkExperienceController.getUpdateWorkExperience);

// router.get('/work/:work_id', AuthMiddleware.authenticateToken, WorkExperienceController.getWorkExperience);

router.post('/edit-work/:work_id', AuthMiddleware.authenticateToken, WorkExperienceController.postUpdateWorkExperience);
router.post('/add-work', AuthMiddleware.authenticateToken, WorkExperienceController.postAddWorkExperience);

// router.delete('/del-work/:work_id', AuthMiddleware.authenticateToken, WorkExperienceController.deleteWorkExperience);

module.exports = router;