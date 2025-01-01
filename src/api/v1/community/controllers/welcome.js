
const { user } = require("pg/lib/defaults");

const { welcomePageServices } = require("../services/welcomePageServices");
const tokenDecoder = require("../../../../utils/tokenDecoder");

async function welcomePage(req, res) {
    const token = req.cookies.auth_token;


    const emailId = tokenDecoder(token)
    console.log(emailId);

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
}

module.exports = { welcomePage }
