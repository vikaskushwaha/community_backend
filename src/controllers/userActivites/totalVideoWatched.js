const db = require("../../database/db_config");


async function videoWatchHistory(req, res) {


    const videoId = req.body.videoId;
    // console.log(videoId);
    const userId = req.user.userId;
    try {
        const query = await db.oneOrNone(`SELECT watched_video,total_points FROM userpoints WHERE id = $1`, [userId])
        let totalPoints = query.total_points;
        const result = await db.none(`SELECT 1 
            FROM userpoints 
            WHERE id = $1 AND array_position(watched_video, $2) IS NOT NULL`, [userId, videoId]
        )
        if (!result) {
            totalPoints += 10;
            await db.none(`
            UPDATE userpoints      
            SET watched_video = array_append(watched_video, $2),
                total_points = $3
            WHERE id = $1;
        `, [userId, videoId, totalPoints]);
        }
        res.status(200)
            .json(
                {
                    success: true,
                    message: "data Added"
                }
            );

    } catch (error) {
        res.status(500).json(
            {
                status: false,
                message: error.message
            }
        )
    }
}

module.exports = videoWatchHistory;
