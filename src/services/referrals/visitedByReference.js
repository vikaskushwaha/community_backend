const db = require("../../database/db_config");
const claculateReferralPoints = require("./calculateReferralPoints");
const getReferralCount = require("./getReferralCount");
const getTotalPoints = require("./totalPoints");
const updateReferralPoints = require("./updateReferralPoints");
const updateReferredCount = require("./updateReferredCount");

async function visitedByReference(referralId) {

    const date = new Date().toISOString().slice(0, 10);
    console.log(date);
    await updateReferredCount(referralId, date);
    const referralCount = await getReferralCount(referralId, date);
    let totalPoints = await getTotalPoints(referralId);
    const referralPoints = claculateReferralPoints(referralCount, totalPoints);
    await updateReferralPoints(referralId, referralPoints)

}

module.exports = visitedByReference