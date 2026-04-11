const router = require("express").Router();
const {registerController} = require("../../controller/user/index");

router.post("/register",registerController);

module.exports = router
