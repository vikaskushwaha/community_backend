const express = require("express");
const { login, signup, logOut } = require("../controllers/authController");
const { checkUserExists } = require("../../../../middlewares/checkUserExists");
const { authenticate } = require("../../../../middlewares/authentication");
const { signupValidation, loginValidation, authorizationValidator } = require("../../../../middlewares/validation");
const { validateRequest } = require("../../../../middlewares/expressValidator");

const router = express.Router();


router.post('/login', validateRequest(loginValidation, 400), login)

router.post('/signup/:shortenedUrl?', validateRequest(signupValidation, 400), signup)

router.post('/logout', validateRequest(authorizationValidator, 401), logOut)


module.exports = router;