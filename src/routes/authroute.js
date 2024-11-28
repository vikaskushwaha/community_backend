const express = require("express");
const { login, signup } = require("../controllers/authController");
const { checkUserExists } = require("../middlewares/checkUserExists");


const router = express.Router();


router.post('/login', checkUserExists, login)

router.post('/signup/:shortenedUrl?', signup)


module.exports = router;