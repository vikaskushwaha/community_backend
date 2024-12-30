const db = require("../../../../database/db_config");


const streakPoints = async (userId, total_points) => {
    try {
        const update = `
            UPDATE userpoints
            SET total_points = $2
              
        WHERE id = $1;
 
        `;
        await db.none(update, [userId, total_points])
    } catch (error) {
        throw error
    }

}

const updateStreak = async (userId, streak_days, currentDate, prevDate) => {
    try {
        const update = `
            UPDATE userpoints
            SET streak_days = $2,
                curr_date_of_video_watch = $3,
                prev_date_of_video_watch = $4
            WHERE id = $1;
        `;
        await db.none(update, [userId, streak_days, currentDate, prevDate])
    } catch (error) {
        throw error
    }

}

const getUserActivityData = async (userId) => {
    try {
        const userActivityData = await db.one('SELECT *FROM userpoints WHERE id = $1', [userId])
        return userActivityData
    } catch (error) {
        throw error
    }
}

module.exports = {
    streakPoints,
    updateStreak,
    getUserActivityData
}