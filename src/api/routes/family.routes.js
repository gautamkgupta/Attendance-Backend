const router = require('express').Router();
// const { AuthMiddleware } = require('../middlewares');
const { FamilyController } = require('../controllers');

router.get("/get", FamilyController.getFamily);
router.post("/postData", FamilyController.postFamily);


module.exports = router;
