const router = require("express").Router();
const {registerController, loginPhoneNoController, loginEmailController} = require("../../controller/user/index");

router.post("/register",registerController);
router.post("/login-phone",loginPhoneNoController);
router.post("/login-email",loginEmailController);

module.exports = router
