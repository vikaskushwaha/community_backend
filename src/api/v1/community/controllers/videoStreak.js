

const { videoStreakTrackServices } = require("../services/videoStreakServices");

// async function streakPoints(userId, total_points) {
//     const update = `
//             UPDATE userpoints
//             SET total_points = $2

//         WHERE id = $1;

//         `;
//     await db.none(update, [userId, total_points])
// }
// exports.streakPoints = streakPoints;

// async function updateStreak(userId, streak_days, currentDate, prevDate) {

//     const update = `
//             UPDATE userpoints
//             SET streak_days = $2,
//                 curr_date_of_video_watch = $3,
//                 prev_date_of_video_watch = $4
//             WHERE id = $1;
//         `;
//     await db.none(update, [userId, streak_days, currentDate, prevDate])
// }
// exports.updateStreak = updateStreak;

async function videoStreakTrack(req, res) {
    try {
        const userId = req.user.userId;
        await videoStreakTrackServices(userId);
        // const date = new Date();
        // let currentDate = dateIndianFormat(date)
        // // const userPoints = await db.one('SELECT *FROM userpoints WHERE id = $1', [userId])
        // let { streak_days, total_points, prev_date_of_video_watch, curr_date_of_video_watch } = userPoints;

        // if (prev_date_of_video_watch === null && curr_date_of_video_watch === null) {
        //     streak_days = 1;
        //     await updateStreak(userId, streak_days, currentDate, null)
        // }
        // else {
        //     let prevDate = dateIndianFormat(curr_date_of_video_watch)
        //     prevDate = new Date(prevDate)
        //     currentDate = new Date(currentDate)
        //     const diffTime = Math.abs(currentDate - prevDate);
        //     const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        //     console.log("dayDiff", diffDays);
        //     if (diffDays === 1) {
        //         if (streak_days === 7) {
        //             total_points += 50;
        //             await streakPoints(userId, total_points)
        //         }
        //         if (streakPoints === 30) {
        //             total_points += 100;
        //             await streakPoints(userId, total_points)
        //         }
        //         streak_days += 1;
        //         await updateStreak(userId, streak_days, currentDate, prevDate)
        //     }
        //     else if (diffDays > 1) {
        //         streak_days = 1;
        //         await updateStreak(userId, streak_days, currentDate, prevDate)
        //     }

        // }
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