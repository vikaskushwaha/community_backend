
const { urlShortener, referalLink } = require("../../../../utils/url_services");
const bodyParser = require('body-parser');
const visitedByReference = require("../services/referrals/visitedByReference");
const tokenGenerator = require("../../../../utils/jwtTokenGenerator");
const setAuthTokenCookie = require("../../../../utils/cookieHelpher");
const db = require("../../../../database/db_config");
const { loginServices, signupServices, singUpPoints } = require("../services/authServices");
const { validationResult } = require('express-validator');
const { singupRefferalUrlSearch } = require("../dal/authDal");

const SECRET_KEY = process.env.JWT_SECRET;



async function login(req, res) {
    try {
        const userEmail = req.body;
        const user = req.user;
        const newId = user.id;
        const token = await loginServices(userEmail, newId)
        setAuthTokenCookie(res, token);
        return res.status(200).json({
            status: "success",
            message: "Login successful",
            token,
            newId
        });
    }
    catch (error) {
        return res.status(401).json({
            status: 'failed',
            message: "Invalid credentials"
        });
    }

}


async function signup(req, res) {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: 'failed',
            errors: errors.array()
        });
    }
    try {
        const path = req.params;
        let referralId;
        if (path) {
            let searchedUrl = process.env.SEARCHED_URL + req.url;
            const result = await singupRefferalUrlSearch(searchedUrl)
            if (result) {
                const parsedUrl = new URL(result.referralurl);
                const params = new URLSearchParams(parsedUrl.search);
                referralId = params.get('referral_id');
            }
        }
        const { name, email, phone } = req.body
        const { token, newId } = await signupServices(name, email, phone)
        setAuthTokenCookie(res, token)
        await singUpPoints(newId, email)
        if (referralId) {
            visitedByReference(referralId)
        }
        res.status(200);
        res.json({
            status: "success",
            token,
            newId
        })
    } catch (error) {
        console.log("error form signup", error);
        if (error.constraint === "users_email_key") {
            error.constraint = "This email already registered"
        }
        if (error.constraint === "users_phone_no") {
            error.constraint = "This Phone no is already registered"
        }
        res.status(500)
        res.json({
            error: error.constraint,
            status: "failed",
            message: "internal"
        })
    }
}

function logOut(req, res) {


    res.clearCookie('auth_token', {
        httpOnly: true, // Prevent client-side JavaScript access
        secure: true,   // Set true in production for HTTPS
        sameSite: 'strict', // Mitigate CSRF attacks
    });
    return res.status(200).send('Logged out successfully');

}

module.exports = {
    login,
    signup,
    logOut
}