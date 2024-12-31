const express = require("express");
const { login, signup, logOut } = require("../controllers/authController");
const { checkUserExists } = require("../../../../middlewares/checkUserExists");
const { authenticate } = require("../../../../middlewares/authentication");
const { signupValidation, loginValidation } = require("../../../../middlewares/validation");
const { validateRequest } = require("../../../../middlewares/expressValidator");

const router = express.Router();


router.post('/login', validateRequest(loginValidation), login)

router.post('/signup/:shortenedUrl?', validateRequest(signupValidation), signup)

router.post('/logout', authenticate, logOut)


module.exports = router;