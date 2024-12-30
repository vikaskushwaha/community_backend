const db = require("../../../../../database/db_config");



async function updateReferralPoints(referralId, referralPoints) {
    const updateReferralPoints = `
        UPDATE userpoints
        SET total_points = $2
        WHERE id = $1;
    `;
    await db.none(updateReferralPoints, [referralId, referralPoints])
}
module.exports = updateReferralPoints;