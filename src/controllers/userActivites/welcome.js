
const db = require("../../database/db_config");
async function welcomePage(req, res) {
    const userId = req.user.userId;
    console.log("userId", userId);
    const userData = await db.one('SELECT *FROM users WHERE id = $1', [userId])
    // const userPoints = await db.one('SELECT *FROM userpoints WHERE id = $1', [userId])
    console.log(userData);
    const message = {
        // totalPoints: `total points ${userPoints.referral_points}`,
        ShotnedLink: `referral link ${userData.shortenedurl}`
    }
    res.status(200).json({
        success: true,
        message
    });
}

module.exports = { welcomePage }
