const db = require("../../database/db_config");

async function getReferralCount(referralId, date) {
    let total_referal;
    const referalCountQuery = `
        SELECT referredcount->$2 FROM users
        WHERE  id = $1;
    
    `;
    const data = await db.oneOrNone(referalCountQuery, [referralId, date])
    total_referal = data['?column?'];
    total_referal = parseInt(total_referal, 10);
    return total_referal;
}

module.exports = getReferralCount