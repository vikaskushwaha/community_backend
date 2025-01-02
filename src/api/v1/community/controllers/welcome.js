
const { user } = require("pg/lib/defaults");

const { welcomePageServices } = require("../services/welcomePageServices");
const tokenDecoder = require("../../../../utils/tokenDecoder");

async function welcomePage(req, res) {
    try {

        const token = req.cookies.auth_token;
        if (!token) {
            res.status(401).json({
                success: false,
                message: "Auth token not found on Welcome Page"

            })
        }
        const emailId = tokenDecoder(token)
        if (!emailId) {
            res.status(404).json({
                success: false,
                message: "EmailId not found on welcome Page"

            })
        }
        const { userPoints, totalpercent } = await welcomePageServices(emailId)
        const usersInfo = {
            totalpercent,
            ListOfWatchedVideos: userPoints.watched_video,
            ShortenedLink: userPoints.shortenedurl,
            eulid: userPoints.id
        }
        res.status(200).json({
            success: true,
            usersInfo
        });
    } catch (error) {
        res.status(401).json({
            success: false,
            error: error.message,
        });
    }

}

module.exports = { welcomePage }
