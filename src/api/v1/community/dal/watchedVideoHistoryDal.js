const db = require("../../../../database/db_config");


const getCurrentPointsOfUser = async (userId) => {
    try {
        const query = await db.oneOrNone(`SELECT watched_video,total_points FROM userpoints WHERE id = $1`, [userId])
        let totalPoints = query.total_points;
        return totalPoints
    } catch (error) {
        throw error
    }

}

const checkVideoIsAlreadyWatched = async (userId, videoId) => {
    try {
        const result = await db.none(`SELECT 1 
            FROM userpoints 
            WHERE id = $1 AND array_position(watched_video, $2) IS NOT NULL`, [userId, videoId]
        )
        return result
    } catch (error) {
        throw error
    }
}

const updateVideoList = async (userId, videoId, totalPoints) => {
    try {
        await db.none(`
            UPDATE userpoints      
            SET watched_video = array_append(watched_video, $2),
                total_points = $3
            WHERE id = $1;
        `, [userId, videoId, totalPoints]);
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getCurrentPointsOfUser,
    checkVideoIsAlreadyWatched,
    updateVideoList
}