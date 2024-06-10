const router = require('express').Router();
const { EducationController } = require('../controllers');
const { AuthMiddleware } = require('../middlewares');

router.get('/add-education', AuthMiddleware.authenticateToken, EducationController.getAddEducation);
router.get('/all-education', AuthMiddleware.authenticateToken, EducationController.getEducationList);
router.get('/edit-education/:education_id', AuthMiddleware.authenticateToken, EducationController.getUpdateEducation);

// router.get('/education/:education_id', AuthMiddleware.authenticateToken, EducationController.getProduct);

router.post('/edit-education/:education_id', AuthMiddleware.authenticateToken, EducationController.postUpdateEducation);
router.post('/add-education', AuthMiddleware.authenticateToken, EducationController.postAddEducation);

// router.delete('/del-education/:education_id', AuthMiddleware.authenticateToken, EducationController.deleteEducationExperience);

module.exports = router;
