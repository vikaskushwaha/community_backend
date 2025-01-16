const db = require("../../../../database/db_config");


const getCurrentPointsOfUser = async (emailId) => {
    try {
        const query = await db.oneOrNone(`SELECT watched_video,total_points FROM userpoints WHERE email = $1`, [emailId])
        let totalPoints = query.total_points;
        return totalPoints
    } catch (error) {
        throw error
    }

}

const checkVideoIsAlreadyWatched = async (emailId, videoId) => {
    try {
        const result = await db.none(`SELECT 1 
            FROM userpoints 
            WHERE email= $1 AND array_position(watched_video, $2) IS NOT NULL`, [emailId, videoId]
        )
        return result
    } catch (error) {
        throw error
    }
}

const updateVideoList = async (emailId, videoId, totalPoints) => {
    try {
        await db.none(`
            UPDATE userpoints      
            SET watched_video = array_append(watched_video, $2),
                total_points = $3
            WHERE email = $1;
        `, [emailId, videoId, totalPoints]);
    } catch (error) {
        throw error;
    }
}

const updateLastWatchedVideo = async (emailId, videoId) => {
    try {
        const videotitle = await db.oneOrNone('SELECT title FROM dsaplaylist WHERE videoid = $1', [videoId])
        if (videotitle.title) {
            await db.none('UPDATE userpoints SET last_video_title = $1  WHERE email = $2', [videotitle.title, emailId])
        }
    } catch (error) {
        throw new Error("error from updateLastWatchedVideo form watchedVideoHistoryDal", error);

    }
}

module.exports = {
    getCurrentPointsOfUser,
    checkVideoIsAlreadyWatched,
    updateVideoList,
    updateLastWatchedVideo
}