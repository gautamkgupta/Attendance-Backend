const router = require('express').Router();
const { ProfessionalController } = require('../controllers');

router.get("/get", ProfessionalController.getProfessional);


module.exports = router;
