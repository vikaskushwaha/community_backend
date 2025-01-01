

const bodyParser = require('body-parser');

const setAuthTokenCookie = require("../../../../utils/cookieHelpher");
const { loginServices, signupServices, singUpPoints } = require("../services/authServices");
const { validationResult } = require('express-validator');
const { singupRefferalUrlSearch } = require("../dal/authDal");

const SECRET_KEY = process.env.JWT_SECRET;



async function login(req, res) {
    try {
        const userEmail = req.body.email;
        const { token, newId } = await loginServices(userEmail)
        console.log("done");
        setAuthTokenCookie(res, token);


        return res.status(200).json({
            status: "success",
            message: "Login successful",
            token,
            newId
        });


    }
    catch (error) {

        if (error.message == "user not found with this email") {
            return res.status(404).json({
                status: 'failed',
                message: error.message

            })
        }
        return res.status(500).json({
            status: 'failed',
            message: "internal server error"
        });
    }

}


async function signup(req, res) {

    try {
        const path = req.params;
        const requestUrl = req.url
        const { name, email, phone } = req.body
        const { token, newId } = await signupServices(requestUrl, path, name, email, phone)
        setAuthTokenCookie(res, token)
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
    console.log("hi");

    res.clearCookie('auth_token', {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
    });

    return res.status(200).send('Logged out successfully');

}

module.exports = {
    login,
    signup,
    logOut
}