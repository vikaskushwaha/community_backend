const db = require("../../database/db_config");

async function videoStreakTrack(req, res) {

    const userId = req.user.userId;
    const date = req.body.date
    const userPoints = await db.one('SELECT *FROM userpoints WHERE id = $1', [userId])
    const formattedDate = new Date(date).toISOString();
    let prevDate = userPoints.prev_date_of_video_watch;
    let currDate = userPoints.curr_date_of_video_watch;
    if (userPoints.prev_date_of_video_watch === null && userPoints.curr_date_of_video_watch === null) {
        console.log("hi");

        const update = `
            UPDATE userpoints
            SET streak_days = $2,
                curr_date_of_video_watch = $3
            WHERE id = $1;
        `;
        await db.none(update, [userId, 1, formattedDate])
    }
    else {
        prevDate = currDate;
        currDate = formattedDate;
        // if ()
    }
    res.status(200)
        .json(
            {
                success: true,
                message: "data found"
            }
        );
}

module.exports = videoStreakTrack;