const router = require('express').Router();
// const { AuthMiddleware } = require('../middlewares');
const { AdminController } = require('../controllers');

router.get("/get", AdminController.retrieveAdmin);

router.post("/postData", AdminController.postAdmin);

router.get("/view/:id", AdminController.getAdminById);


module.exports = router;