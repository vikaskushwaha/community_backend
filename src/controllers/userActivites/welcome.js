
const { user } = require("pg/lib/defaults");
const db = require("../../database/db_config");
async function welcomePage(req, res) {

    const userId = req.user.userId;

    const userData = await db.one('SELECT *FROM users WHERE id = $1', [userId])
    const userPoints = await db.one('SELECT *FROM userpoints WHERE id = $1', [userId])

    let totalpercent;
    if (userPoints.watched_video == null) {
        totalpercent = 0;

    }
    else {
        totalpercent = Math.floor((userPoints.watched_video.length * 100) / 112);
    }
    // let totalpercent;
    // if (userPoints.watched_video != null) {
    //     if ((userPoints.watched_video).length > 0) {
    //         totalpercent = Math.floor((userPoints.watched_video.length * 100) / 112);
    //     }
    // }
    // else {
    //     totalpercent = 0;
    // }


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
