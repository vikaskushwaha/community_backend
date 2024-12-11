
const db = require("../../database/db_config");
const { dateIndianFormat } = require("../../services/date_format");

async function streakPoints(userId, userTotalPoints) {
    const update = `
            UPDATE userpoints
            SET total_points = $2
              
        WHERE id = $1;
 
        `;
    await db.none(update, [userId, userTotalPoints])
}

async function updateStreak(userId, streak_days, currentDate, prevDate) {

    const update = `
            UPDATE userpoints
            SET streak_days = $2,
                curr_date_of_video_watch = $3,
                prev_date_of_video_watch = $4
            WHERE id = $1;
        `;
    await db.none(update, [userId, streak_days, currentDate, prevDate])
}

async function videoStreakTrack(req, res) {
    try {
        const userId = req.user.userId;
        const date = new Date();
        let currentDate = dateIndianFormat(date)
        const userPoints = await db.one('SELECT *FROM userpoints WHERE id = $1', [userId])
        let { streak_days, userTotalPoints, prev_date_of_video_watch, curr_date_of_video_watch } = userPoints;
        // let streak_days = userPoints.streak_days;
        // let userTotalPoints = userPoints.total_points;

        if (streak_days === 7) {
            userTotalPoints += 50;
            await streakPoints(userId, userTotalPoints)
        }
        if (streakPoints === 30) {
            userTotalPoints += 100;
            await streakPoints(userId, userTotalPoints)
        }
        if (prev_date_of_video_watch === null && curr_date_of_video_watch === null) {
            streak_days = 1;
            await updateStreak(userId, streak_days, currentDate, null)
        }
        else {
            let prevDate = dateIndianFormat(curr_date_of_video_watch)
            prevDate = new Date(prevDate)
            currentDate = new Date(currentDate)
            const diffTime = Math.abs(currentDate - prevDate);
            const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
            console.log("dayDiff", diffDays);
            if (diffDays === 1) {
                streak_days += 1;
                await updateStreak(userId, streak_days, currentDate, prevDate)
            }
            else if (diffDays > 1) {
                streak_days = 1;
                await updateStreak(userId, streak_days, currentDate, prevDate)
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