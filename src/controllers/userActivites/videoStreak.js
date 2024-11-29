
const db = require("../../database/db_config");
const { dateIndianFormat } = require("../../services/date_format");



async function videoStreakTrack(req, res) {
    try {
        const userId = req.user.userId;
        const date = req.body.date
        const userPoints = await db.one('SELECT *FROM userpoints WHERE id = $1', [userId])
        let streak_days = userPoints.streak_days;
        let currentDate = dateIndianFormat(date)
        if (userPoints.prev_date_of_video_watch === null && userPoints.curr_date_of_video_watch === null) {
            streak_days = 1;
            const update = `
            UPDATE userpoints
            SET streak_days = $2,
                curr_date_of_video_watch = $3
            WHERE id = $1;
        `;
            await db.none(update, [userId, 1, currentDate])
        }
        else {
            let prevDate = dateIndianFormat(userPoints.curr_date_of_video_watch)
            prevDate = new Date(prevDate)
            currentDate = new Date(currentDate)
            const diffTime = Math.abs(currentDate - prevDate);
            const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
            console.log("dayDiff", diffDays);
            if (diffDays == 1) {
                streak_days += 1;
                const update = `
            UPDATE userpoints
            SET streak_days = $2,
                curr_date_of_video_watch = $3,
                prev_date_of_video_watch = $4
            WHERE id = $1;
        `;
                await db.none(update, [userId, streak_days, currentDate, prevDate])
            }
            else if (diffDays > 1) {
                streak_days = 1;
                const update = `
            UPDATE userpoints
            SET streak_days = $2,
                curr_date_of_video_watch = $3,
                prev_date_of_video_watch = $4
            WHERE id = $1;
        `;
                await db.none(update, [userId, streak_days, currentDate, prevDate])
            }

        }
        res.status(200)
            .json(
                {
                    success: true,
                    message: "data found"
                }
            );
    }
    catch (error) {
        console.error("Error in videoStreakTrack:", error.message);

        res.status(500).json({
            success: false,
            message: "An error occurred while processing your request.",
        });
    }

}

module.exports = videoStreakTrack;