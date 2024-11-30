const db = require("../../database/db_config");

async function getTotalPoints(referralId) {
    let { value: totalPointsOfReferringUser } = await db.one(`SELECT total_points AS VALUE FROM userpoints WHERE id = $1`, [referralId])
    console.log("totalPointsOfReferringUser", totalPointsOfReferringUser);
    return totalPointsOfReferringUser;
}

module.exports = getTotalPoints