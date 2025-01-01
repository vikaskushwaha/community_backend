const db = require("../../../../database/db_config");


const streakPoints = async (emailId, total_points) => {
    try {
        const update = `
            UPDATE userpoints
            SET total_points = $2
              
        WHERE email = $1;
 
        `;
        await db.none(update, [emailId, total_points])
    } catch (error) {
        throw error
    }

}

const updateStreak = async (emailId, streak_days, currentDate, prevDate) => {
    try {
        const update = `
            UPDATE userpoints
            SET streak_days = $2,
                curr_date_of_video_watch = $3,
                prev_date_of_video_watch = $4
            WHERE email = $1;
        `;
        await db.none(update, [emailId, streak_days, currentDate, prevDate])
    } catch (error) {
        throw error
    }

}

const getUserActivityData = async (emailId) => {
    try {
        const userActivityData = await db.one('SELECT *FROM userpoints WHERE email = $1', [emailId])
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