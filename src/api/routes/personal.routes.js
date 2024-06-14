const router = require('express').Router();
// const { AuthMiddleware } = require('../middlewares');
const { PersonalController } = require('../controllers');

router.get("/get", PersonalController.getPersonal);
router.post("/postData", PersonalController.postPersonal);


module.exports = router;
