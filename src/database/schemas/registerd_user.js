const { ulid } = require("ulid");
const db = require("../db_config");
const { ParameterizedQuery, TableName } = require("pg-promise");
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const { nanoid } = require("nanoid");
const SECRET_KEY = 'Vikas@1998';




async function searchUser(shortendLink) {
    const findLink = new ParameterizedQuery({ text: 'SELECT * FROM SignedUp WHERE  shortenedurl = $1;', values: [shortendLink] })
    try {
        const result = await db.oneOrNone(findLink);
        console.log(result);

        return result;
    } catch (error) {
        console.error('Error fetching user details:', error);
    }
}


async function visitedByReference(referralId) {
    const date = new Date().toISOString().slice(0, 10);
    // const date = JSON.stringify(req.body);
    const query = `
        UPDATE SignedUp
        SET referredCount = 
            CASE
                WHEN referredCount IS NULL THEN  -- If referredCount is NULL, initialize with the key
                    hstore($2, '1')  
                WHEN referredCount ? $2 AND (referredCount->$2)::int < 10  THEN
                    referredCount || hstore($2, (CAST((referredCount -> $2)::int + 1 AS text)))  -- Increment the value by 1
                ELSE
                   hstore($2, '1')
                  
            END
        WHERE id = $1;
    `;
    await db.none(query, [referralId, date]);
}

function referalLink(ulid) {
    const baseUrl = "http://localhost:2000/insertdata"
    const fullUrl = `${baseUrl}?referral_id=${ulid}`
    return (fullUrl);
}

async function createRegisteredUserTable(req, res) {


    const createTable =
        (`CREATE TABLE IF NOT EXISTS SignedUp(
            id CHAR(26) PRIMARY KEY,
            name VARCHAR(255),
            email VARCHAR(255) UNIQUE,
            phone VARCHAR(255) UNIQUE,
            ogreferralurl VARCHAR(255),
            shortenedurl VARCHAR(100),
            referredCount  HSTORE          
        
    ) `);

    try {
        await db.none(createTable);
        res.status(200)
        res.json({
            status: "success",
            message: "table created succesfully"
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

function urlShortener() {
    const shortenedPath = nanoid(8);
    const baseURL = "http://localhost:2000/insertdata/";
    const shortenedURL = `${baseURL}${shortenedPath}`
    return shortenedURL;
}
async function insertUserDetails(req, res) {
    try {
        const path = req.params.shortenedPath;
        let referralId = req.query.referral_id;
        if (path) {
            let searchedUrl = "http://localhost:2000" + req.url;
            const result = await searchUser(searchedUrl)
            if (result) {
                const parsedUrl = new URL(result.ogreferralurl);
                const params = new URLSearchParams(parsedUrl.search);
                referralId = params.get('referral_id');
            }
        }
        const newId = ulid();
        const refLink = referalLink(newId)
        const { name, email, phone } = req.body
        const shortenedURL = urlShortene