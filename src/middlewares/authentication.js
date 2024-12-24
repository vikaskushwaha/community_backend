const { logOut } = require("../controllers/authController");
const { func } = require("../database/db_config");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.JWT_SECRET;

function authenticate(req, res, next) {
    const cookieHeader = req.headers.cookie;
    if (!cookieHeader) {
        return res.status(401)
            .json(
                {
                    success: false,
                    message: "cookie not found"
                }
            );
    }
    const token = cookieHeader.split("=")[1];

    const decodedToken = jwt.verify(token, SECRET_KEY);

    req.user = {
        userId: decodedToken.ulid,
        // email: decodedToken.userEmail.email,
        token
    }
    next()

}


module.exports = {
    authenticate,

}

