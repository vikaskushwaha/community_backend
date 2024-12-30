
const { user } = require("pg/lib/defaults");

const { welcomePageServices } = require("../services/welcomePageServices");

async function welcomePage(req, res) {
    const userId = req.user.userId;
    const { userData, userPoints, totalpercent } = await welcomePageServices(userId)

    const usersInfo = {
        totalpercent,
        ListOfWatchedVideos: userPoints.watched_video,
        ShortenedLink: userData.shortenedurl,
        eulid: userData.id
    }
    res.status(200).json({
        success: true,
        usersInfo
    });
}

module.exports = { welcomePage }
