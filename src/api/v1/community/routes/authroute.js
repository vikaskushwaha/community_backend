const express = require("express");
const { login, signup, logOut } = require("../controllers/authController");
const { checkUserExists } = require("../../../../middlewares/checkUserExists");
const { authenticate } = require("../../../../middlewares/authentication");
const { signupValidation } = require("../../../../middlewares/validation");

const router = express.Router();


router.post('/login', checkUserExists, login)

router.post('/signup/:shortenedUrl?', signupValidation, signup)

router.post('/logout', authenticate, logOut)


module.exports = router;