
const db = require("../../database/db_config");
async function welcomePage(req, res) {

    const userId = req.user.userId;

    const userData = await db.one('SELECT *FROM users WHERE id = $1', [userId])
    const userPoints = await db.one('SELECT *FROM userpoints WHERE id = $1', [userId])


    const usersInfo = {
        ListOfWatchedVideos: userPoints.watched_video,
        ShortenedLink: userData.shortenedurl
    }
    res.status(200).json({
        success: true,
        usersInfo
    });
}

module.exports = { welcomePage }
