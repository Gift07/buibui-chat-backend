const { SignUp, SignIn } = require("../controllers/auth");

const router = require("express").Router();

router.post("/sign-up", SignUp);
router.post("/sign-in", SignIn);

module.exports = router;
