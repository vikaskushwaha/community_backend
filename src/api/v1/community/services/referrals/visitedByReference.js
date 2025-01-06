
const claculateReferralPoints = require("../../../../../utils/calculateReferralPoints");
const { updateReferralPoints, getReferralCount, getTotalPoints, updateReferredCount } = require("../../dal/referralDal");

async function visitedByReference(referralId, newId) {

    const date = new Date().toISOString().slice(0, 10);
    console.log(date);
    await updateReferredCount(referralId, date, newId);
    const referralCount = await getReferralCount(referralId, date);
    let totalPoints = await getTotalPoints(referralId);
    const referralPoints = claculateReferralPoints(referralCount, totalPoints);
    await updateReferralPoints(referralId, referralPoints)

}

module.exports = visitedByReference