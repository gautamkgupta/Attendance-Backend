const router = require('express').Router();
// const { AuthMiddleware } = require('../middlewares');
const { EducationController } = require('../controllers');

router.get("/get", EducationController.getEducation);
router.post("/postData", EducationController.postEducation);


module.exports = router;
