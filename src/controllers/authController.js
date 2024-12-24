const { ulid } = require("ulid");
const { urlShortener, referalLink } = require("../services/url_services");
const { searchUser } = require("../services/user_search");
const db = require('../database/db_config')
const bodyParser = require('body-parser');
const visitedByReference = require("../services/referrals/visitedByReference");
const tokenGenerator = require("../utils/jwtTokenGenerator");
const setAuthTokenCookie = require("../utils/cookieHelpher");
const SECRET_KEY = process.env.JWT_SECRET;



async function login(req, res) {
    try {


        const userEmail = req.body;


        const user = req.user;
        const newId = user.id;

        const token = tokenGenerator({ ulid: newId, userEmail });
        setAuthTokenCookie(res, token)


        return res.status(200).json({
            status: "success",
            message: "Login successful",
            token,
            newId
        });
    }
    catch (error) {
        res.sendStatus(500)
        res.json({
            status: 'failed',
            message: "Internal server error"
        })
    }

}


async function signup(req, res) {
    try {
        const path = req.params;
        let referralId;


        if (path) {

            let searchedUrl = process.env.SEARCHED_URL + req.url;
            const result = await searchUser(searchedUrl)
            console.log(result);

            if (result) {
                const parsedUrl = new URL(result.referralurl);
                const params = new URLSearchParams(parsedUrl.search);
                referralId = params.get('referral_id');
            }
        }
        const newId = ulid();
        const refLink = referalLink(newId)
        const { name, email, phone } = req.body
        const shortenedURL = urlShortener();
        const insert = 'INSERT INTO users(id,name,email,phone,referralurl, shortenedurl) VALUES($1,$2,$3,$4,$5,$6)'
        await db.none(insert, [newId, name, email, phone, refLink, shortenedURL])
        const token = tokenGenerator({ ulid: newId, email });
        setAuthTokenCookie(res, token)

        const insertFirstLoginPoints = 'INSERT INTO  userpoints(id,email,total_points) VALUES($1,$2,$3)'
        await db.none(insertFirstLoginPoints, [newId, email, 50])
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
        else {
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