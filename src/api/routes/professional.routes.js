const router = require('express').Router();
const { ProfessionalController } = require('../controllers');

router.get("/get", ProfessionalController.getProfessional);
router.post("/postData", ProfessionalController.postProfessional);


module.exports = router;
