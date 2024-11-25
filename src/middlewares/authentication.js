const { func } = require("../database/db_config");
const jwt = require("jsonwebtoken");
const SECRET_KEY = 'Vikas@1998';
function authenticate(req, res, next) {
    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
        res.status(200)
            .json(
                {
                    success: false,
                    message: "Error!Token was not provided."
                }
            );
    }
    const decodedToken = jwt.verify(token, SECRET_KEY);
    req.viks = {
        userId: decodedToken.userId,
        email: decodedToken.email
    }
    console.log(req.user);
    next()

}

async function videoContent(req, res) {
    res.status(200).json({
        success: true,
        message: "Video content served.",
        user: req.viks, // Access user details added by `authenticate` middleware
    });
}

module.exports = {
    authenticate,
    videoContent
}

