const router = require('express').Router();
// const { AuthMiddleware } = require('../middlewares');
const { WorkExperienceController } = require('../controllers');

router.get("/get", WorkExperienceController.getWorkExperience);
router.post("/postData", WorkExperienceController.postWorkExperience);


module.exports = router;
