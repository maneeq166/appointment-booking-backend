const router = require("express").Router();
const {registerController, loginPhoneNoController, loginEmailController, registerProviderController} = require("../../controller/user/index");
const { authMiddleware } = require("../../middleware/authMiddleware");

router.post("/register",registerController);
router.post("/login-phone",loginPhoneNoController);
router.post("/login-email",loginEmailController);
router.post("/register-provider",authMiddleware,registerProviderController);

module.exports = router
