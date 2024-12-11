const { func } = require("../database/db_config");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.JWT_SECRET;


function authenticate(req, res, next) {

    const cookieHeader = req.headers.cookie;
    // console.log("cookieHeader : ", cookieHeader);

    if (!cookieHeader) {
        return res.status(400)
            .json(
                {
                    success: false,
                    message: "cookie not found"
                }
            );
    }
    const token = req.headers.cookie.substr(11);

    const decodedToken = jwt.verify(token, SECRET_KEY);
    req.user = {
        userId: decodedToken.ulid,
        email: decodedToken.email
    }
    next()


    // console.log(req.user);


}

// async function videoContent(req, res) {
//     res.status(200).json({
//         success: true,
//         message: "Video content served.",
//         user: req.viks, // Access user details added by `authenticate` middleware
//     });
// }

module.exports = {
    authenticate,
    // videoContent
}

