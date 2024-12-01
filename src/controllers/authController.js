const { ulid } = require("ulid");
const { urlShortener, referalLink } = require("../services/url_services");
const { searchUser } = require("../services/user_search");
const db = require('../database/db_config')
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const visitedByReference = require("../services/referrals/visitedByReference");
const SECRET_KEY = process.env.JWT_SECRET;

async function login(req, res) {
    try {
        const userEmail = req.body;
        const user = req.user;
        const newId = user.id;
        const token = jwt.sign({ ulid: newId, email: userEmail }, SECRET_KEY);
        return res.status(200).json({
            status: "success",
            message: "Login successful",
            token,
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
        console.log(path);
        let referralId;
        console.log("referralId", referralId);

        if (path) {
            console.log("hi");
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
        const token = jwt.sign({ ulid: newId, email: email }, SECRET_KEY);

        const insertFirstLoginPoints = 'INSERT INTO  userpoints(id,email,total_points) VALUES($1,$2,$3)'
        await db.none(insertFirstLoginPoints, [newId, email, 50])
        if (referralId) {
            visitedByReference(referralId)
        }
        res.status(200);
        res.json({
            status: "success",
            message: `${newId} ${token} "userloggedin`
        })
    } catch (error) {
        console.log(error);
        res.status(500)
        res.json({
            status: "failed",
            message: "internal"
        })
    }
}

module.exports = {
    login,
    signup
}